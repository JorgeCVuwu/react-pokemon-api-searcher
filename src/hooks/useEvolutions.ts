import { useContext, useEffect, useState } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { searchEvolutionChain } from '../services/evolution_chain.ts'
import { searchPokemon } from '../services/pokemon.ts'
import { searchPokemonSpecies } from '../services/pokemon_species.ts'

import { pokemonProps } from '../services/interfaces/project/pokemon.ts'
import { pokemonSpeciesProps } from '../services/interfaces/project/pokemon_species.ts'
import { jsonChainProps, FormDataProps } from '../services/interfaces/pokeapi/evolution_chain.ts'

import { POKEMON_REGIONAL_FORMS, NOT_CONSIDERED_FORMS } from '../constants/constants.js'

const standarizeStr = (str: string): string => {
  const neutralSuffixes = ['-standard']
  const neutralSuffix = neutralSuffixes.find(suffix => str.endsWith(suffix))
  return neutralSuffix
    ? str.slice(0, -neutralSuffix.length)
    : str
}

interface pokemonPropsIntoEvol extends pokemonProps {
  species: pokemonProps['species'] & { generation: { name: string, url: string } }
}

interface pokemonPropsInEvolution {
  species_name: string,
  forms: pokemonPropsIntoEvol[]
}

interface createFormsProps {
  speciesChain: jsonChainProps | null,
  evolutionForms: pokemonPropsInEvolution[]
}

export function useEvolutions() {

  const [evolutionChains, setEvolutionChains] = useState<FormDataProps[]>()
  const { pokemonData } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonData) {
      const chainUrlPromises = (chain: jsonChainProps, arr: Promise<pokemonSpeciesProps | null>[] = []) => {
        if (chain.species.name !== pokemonData.species_data.name) {
          arr.push(searchPokemonSpecies(chain.species.url))
        } else {
          arr.push(new Promise((resolve) => resolve(pokemonData.species_data)))
        }
        chain.evolves_to.forEach(evol => chainUrlPromises(evol, arr))

        return arr
      }

      const setEvolutionForm = async (species: pokemonSpeciesProps): Promise<pokemonPropsIntoEvol[]> => {
        return species.varieties.reduce<Promise<pokemonPropsIntoEvol[]>>(async (accPromise, form) => {
          const acc = await accPromise

          const name = form.name
          const url = form.url

          if (
            form.is_default ||
            (POKEMON_REGIONAL_FORMS.some(region => standarizeStr(name).endsWith(region.suffix)) &&
              !NOT_CONSIDERED_FORMS.some(suffix => name.includes(suffix)))
          ) {
            const search = await searchPokemon(url)
            if (search) {
              acc.push({
                ...search,
                name: standarizeStr(name),
                species: { ...search.species, generation: species.generation },
              })
            }
          }

          return acc
        }, Promise.resolve([]))
      }

      const createFormsEvolutionChain = ({ speciesChain, evolutionForms }: createFormsProps): FormDataProps[] => {
        const formsChain: FormDataProps[] = []

        interface addEvolutionsProps {
          form: pokemonPropsIntoEvol,
          nextValidForms: pokemonPropsIntoEvol[],
          speciesChain: jsonChainProps | null,
          initialForm: boolean
        }

        const addEvolutions = ({ form, nextValidForms, speciesChain, initialForm }: addEvolutionsProps): FormDataProps | null => {
          if (!speciesChain) return null
          const regFormType = POKEMON_REGIONAL_FORMS.find(region => form.name.endsWith(region.suffix))
          const currentValidForms = evolutionForms
            .find(species => species.species_name === speciesChain.species.name)?.forms
          if (currentValidForms) {

            const currentRegionalForms = currentValidForms.filter(form => POKEMON_REGIONAL_FORMS.some(regForm => form.name.endsWith(regForm.suffix)))
            let evolForms
            if (regFormType) {
              evolForms = nextValidForms.filter(form => form.name.endsWith(regFormType.suffix) || form.species.generation.name === regFormType.generation)
            } else {
              evolForms = nextValidForms.filter(form => currentRegionalForms.length === 0 ||
                ((!POKEMON_REGIONAL_FORMS.some(regForm => form.name.endsWith(regForm.suffix))) &&
                  (!currentRegionalForms.some(regForm => form.species.generation.name === POKEMON_REGIONAL_FORMS.find(region => regForm.name.endsWith(region.suffix))?.generation))))
            }

            const formData: FormDataProps = {
              form_data: form,
              evolution_details: (regFormType
                ? (speciesChain.evolution_details[1] ?? speciesChain.evolution_details[0])
                : speciesChain.evolution_details[0]) ?? [],
              evolves_to: evolForms.map(evol => setFormsChain({
                speciesChain: speciesChain.evolves_to.find(species => species.species.name === evol.species.name) ?? null,
                currentForm: evol,
                initialForm: false
              }))
            }

            if (initialForm) {
              formsChain.push(formData)
            }

            return formData
          }
          return null
        }

        interface setFormsProps {
          speciesChain: jsonChainProps | null,
          currentForm?: pokemonPropsIntoEvol | null,
          initialForm?: boolean
        }
        const setFormsChain = ({ speciesChain, currentForm = null, initialForm = true }: setFormsProps): FormDataProps | null => {
          if (!speciesChain) return null
          const nextValidForms = evolutionForms
            .filter(evolSpec => speciesChain.evolves_to
              .some(species => species.species.name === evolSpec.species_name)
            )
            .flatMap(species => species.forms)

          if (!currentForm) {
            const findValidForms = evolutionForms.find(species => species.species_name === speciesChain.species.name)
            if (findValidForms) {

              const currentValidForms = findValidForms.forms


              const regionalForms = currentValidForms.filter(form => POKEMON_REGIONAL_FORMS.some(regForm => form.name.endsWith(regForm.suffix)))
              if (regionalForms.length > 0) {
                regionalForms.forEach(regForm => addEvolutions({ form: regForm, nextValidForms, speciesChain, initialForm }))
              }

              const defaultForm = currentValidForms.find(form => form.is_default)
              if (defaultForm) {
                addEvolutions({ form: defaultForm, nextValidForms, speciesChain, initialForm })
              }
            }
            return null
          }

          if (currentForm) {
            return addEvolutions({ form: currentForm, nextValidForms, speciesChain, initialForm })
          }

          return null
        }

        setFormsChain({ speciesChain })
        return formsChain
      }

      const setEvolutions = async () => {
        const speciesChainUrl = pokemonData.species_data.evolution_chain.url
        const speciesChain = await searchEvolutionChain(speciesChainUrl)
        const evolutionSpecies = await Promise.all(chainUrlPromises(speciesChain.chain))
        const evolutionForms: (pokemonPropsInEvolution)[] = await Promise.all(evolutionSpecies.map(async species => {
          if (species) {
            const evolutionFormsData = await setEvolutionForm(species)
            return { species_name: species.name, forms: evolutionFormsData }
          }
          return { species_name: '', forms: [] }
        }
        ))
        if (evolutionForms) {
          const formsChain = createFormsEvolutionChain({ speciesChain: speciesChain.chain, evolutionForms })
          setEvolutionChains(formsChain)
        }
      }

      setEvolutions()
    }
  }, [pokemonData])

  return { evolutionChains }
}

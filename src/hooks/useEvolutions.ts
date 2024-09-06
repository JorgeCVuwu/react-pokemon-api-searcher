import { useContext, useEffect, useState } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.tsx'

import { searchEvolutionChain } from '../services/evolution_chain.ts'
import { searchPokemon } from '../services/pokemon.ts'
import { searchPokemonSpecies } from '../services/pokemon_species.ts'

import { POKEMON_REGIONAL_FORMS, NOT_CONSIDERED_FORMS } from '../constants/constants.js'

const standarizeStr = (str: string) => {
  const neutralSuffixes = ['-standard']
  const neutralSuffix = neutralSuffixes.find(suffix => str.endsWith(suffix))
  return neutralSuffix
    ? str.slice(0, -neutralSuffix.length)
    : str
}

export function useEvolutions() {
  const [evolutionChains, setEvolutionChains] = useState('')
  const { pokemonData } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonData) {
      const chainUrlPromises = (chain, arr = []) => {
        chain.species.name !== pokemonData.species_data.name
          ? arr.push(searchPokemonSpecies(chain.species.url))
          : arr.push(pokemonData.species_data)
        chain.evolves_to.forEach(evol => chainUrlPromises(evol, arr))

        return arr
      }

      const setEvolutionForm = (species) => {
        return species.varieties.reduce(async (asyncAcc, form) => {
          const acc = await asyncAcc
          const name = form.name
          const url = form.url
          if (form.is_default ||
            (POKEMON_REGIONAL_FORMS.some(region => standarizeStr(name).endsWith(region.suffix)) &&
              !NOT_CONSIDERED_FORMS.some(suffix => name.includes(suffix)))) {
            const search = await searchPokemon(url)
            acc.push({ ...search, name: standarizeStr(name), species: { ...search.species, generation: species.generation } })
          }
          return acc
        }, [])
      }

      const createFormsEvolutionChain = ({ speciesChain, evolutionForms }) => {
        const formsChain = []

        const addEvolutions = ({ form, nextValidForms, speciesChain, initialForm }) => {
          const regFormType = POKEMON_REGIONAL_FORMS.find(region => form.name.endsWith(region.suffix))
          const currentValidForms = evolutionForms
            .find(species => species.species_name === speciesChain.species.name).forms
          const currentRegionalForms = currentValidForms.filter(form => POKEMON_REGIONAL_FORMS.some(regForm => form.name.endsWith(regForm.suffix)))
          const evolForms = regFormType
            ? nextValidForms.filter(form => form.name.endsWith(regFormType.suffix) || form.species.generation.name === regFormType.generation)
            : nextValidForms.filter(form => currentRegionalForms.length === 0 ||
              ((!POKEMON_REGIONAL_FORMS.some(regForm => form.name.endsWith(regForm.suffix))) &&
                (!currentRegionalForms.some(regForm => form.species.generation.name === POKEMON_REGIONAL_FORMS.find(region => regForm.name.endsWith(region.suffix)).generation))))

          const formData = {
            form_data: form,
            evolution_details: (regFormType
              ? (speciesChain.evolution_details[1] ?? speciesChain.evolution_details[0])
              : speciesChain.evolution_details[0]) ?? [],
            evolves_to: evolForms.map(evol => setFormsChain({
              speciesChain: speciesChain.evolves_to.find(species => species.species.name === evol.species.name),
              currentForm: evol,
              initialForm: false
            }))
          }

          if (initialForm) {
            formsChain.push(formData)
          }

          return formData
        }

        const setFormsChain = ({ speciesChain, currentForm = null, initialForm = true }) => {
          const nextValidForms = evolutionForms
            .filter(evolSpec => speciesChain.evolves_to
              .some(species => species.species.name === evolSpec.species_name)
            )
            .flatMap(species => species.forms)

          if (!currentForm) {
            const currentValidForms = evolutionForms
              .find(species => species.species_name === speciesChain.species.name).forms

            const regionalForms = currentValidForms.filter(form => POKEMON_REGIONAL_FORMS.some(regForm => form.name.endsWith(regForm.suffix)))
            if (regionalForms.length > 0) {
              regionalForms.forEach(regForm => addEvolutions({ form: regForm, nextValidForms, speciesChain, initialForm }))
            }

            const defaultForm = currentValidForms.find(form => form.is_default)
            addEvolutions({ form: defaultForm, nextValidForms, speciesChain, initialForm })
            return
          }

          return addEvolutions({ form: currentForm, nextValidForms, speciesChain, initialForm })
        }

        setFormsChain({ speciesChain })
        return formsChain
      }

      const setEvolutions = async () => {
        const speciesChainUrl = pokemonData.species_data.evolution_chain.url
        const speciesChain = await searchEvolutionChain(speciesChainUrl)
        const evolutionSpecies = await Promise.all(chainUrlPromises(speciesChain.chain))
        const evolutionForms = await Promise.all(evolutionSpecies.map(async species => ({ species_name: species.name, forms: await setEvolutionForm(species) })))

        const formsChain = createFormsEvolutionChain({ speciesChain: speciesChain.chain, evolutionForms })
        setEvolutionChains(formsChain)
      }

      setEvolutions()
    }
  }, [pokemonData])

  return { evolutionChains }
}

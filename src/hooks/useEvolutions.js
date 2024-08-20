import { useContext, useEffect, useState } from 'react'

import { PokemonPageContext } from '../context/pokemonPage.jsx'

import { searchEvolutionChain } from '../services/evolution_chain.js'
import { searchPokemon } from '../services/pokemon.js'
import { searchPokemonSpecies } from '../services/pokemon_species.js'

import { POKEMON_REGIONAL_FORMS, NOT_CONSIDERED_FORMS } from '../constants/constants.js'

export function useEvolutions () {
  const [evolutionChains, setEvolutionChains] = useState('')
  const { pokemonSpeciesData, pokemonDefaultData } = useContext(PokemonPageContext)

  useEffect(() => {
    if (pokemonSpeciesData) {
      const chainUrlPromises = (chain, arr = []) => {
        chain.species.name !== pokemonSpeciesData.name
          ? arr.push(searchPokemonSpecies(chain.species.url))
          : arr.push(pokemonSpeciesData)
        chain.evolves_to.forEach(evol => chainUrlPromises(evol, arr))

        return arr
      }

      const setEvolutionForm = (species) => {
        return species.varieties.reduce(async (asyncAcc, form) => {
          const acc = await asyncAcc
          const name = form.name
          const url = form.url
          if (form.is_default ||
          (POKEMON_REGIONAL_FORMS.some(region => name.endsWith(region.suffix)) &&
          !NOT_CONSIDERED_FORMS.some(suffix => name.includes(suffix)))) {
            const search = await searchPokemon(url)
            acc.push({ ...search, species_name: species.name, species_generation: species.generation })
          }
          return acc
        }, [])
      }
      const createFormsEvolutionChain = ({ speciesChain, evolutionForms }) => {
        const formsChain = []

        const addEvolutions = ({ form, nextValidForms, speciesChain }) => {
          const regFormType = POKEMON_REGIONAL_FORMS.find(region => form.name.endsWith(region.suffix))
          const currentValidForms = evolutionForms
            .find(species => species.species_name === speciesChain.species.name).forms
          const currentRegionalForms = currentValidForms.filter(form => POKEMON_REGIONAL_FORMS.some(regForm => form.name.endsWith(regForm.suffix)))
          const evolForms = regFormType
            ? nextValidForms.filter(form => form.name.endsWith(regFormType.suffix) || form.species_generation.name === regFormType.generation)
            : nextValidForms.filter(form => !POKEMON_REGIONAL_FORMS.some(regForm => form.name.endsWith(regForm.suffix)) &&
            (!currentRegionalForms || !currentRegionalForms.some(regForm => form.species_generation.name === POKEMON_REGIONAL_FORMS.find(region => regForm.name.endsWith(region.suffix)).generation)))

          const formData = {
            form_data: form,
            evolution_details: (regFormType ? speciesChain.evolution_details[1] : speciesChain.evolution_details[0]) ?? [],
            evolves_to: evolForms.map(evol => setFormsChain(speciesChain.evolves_to.find(species => species.species.name === evol.species_name), evol))
          }

          if (speciesChain.evolution_details.length === 0) {
            formsChain.push(formData)
          }

          return formData
        }

        const setFormsChain = (speciesChain, currentForm = null) => {
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
              regionalForms.forEach(regForm => addEvolutions({ form: regForm, nextValidForms, speciesChain }))
            }

            const defaultForm = currentValidForms.find(form => form.is_default)
            addEvolutions({ form: defaultForm, nextValidForms, speciesChain })
            return
          }

          return addEvolutions({ form: currentForm, nextValidForms, speciesChain })
        }

        setFormsChain(speciesChain)
        return formsChain
      }

      const setEvolutions = async () => {
        const speciesChainUrl = pokemonSpeciesData.evolution_chain.url
        const speciesChain = await searchEvolutionChain(speciesChainUrl)
        const evolutionSpecies = await Promise.all(chainUrlPromises(speciesChain.chain))
        const evolutionForms = await Promise.all(evolutionSpecies.map(async species => ({ species_name: species.name, forms: await setEvolutionForm(species) })))

        const formsChain = createFormsEvolutionChain({ speciesChain: speciesChain.chain, evolutionForms })
        setEvolutionChains(formsChain)
      }

      setEvolutions()
    }
  }, [pokemonSpeciesData])

  return { evolutionChains }
}

import { useRef, useContext, useEffect } from 'react'
import { PokemonSearchContext } from '../context/pokemonSearch.jsx'

export function useValidator () {
  const { validated, setValidated, inputs } = useContext(PokemonSearchContext)

  const submitRef = useRef()

  useEffect(() => {
    setValidated(Object.values(inputs).some(input => input.validated === true))
  }, [inputs])

  useEffect(() => {
    submitRef.current.disabled = !validated
  }, [validated])

  return { submitRef }
}

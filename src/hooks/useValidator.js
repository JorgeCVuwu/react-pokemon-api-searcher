import { useRef, useContext, useEffect, useState } from 'react'
import { PokemonSearchContext } from '../context/pokemonSearch.jsx'

export function useValidator () {
  const [validated, setValidated] = useState(false)
  const { inputs } = useContext(PokemonSearchContext)

  const submitRef = useRef()

  // useInput handles input elements using validation parameters (for example, hiding validation error message)
  useEffect(() => {
    setValidated(Object.values(inputs).some(input => input.validated === true))
  }, [inputs])

  useEffect(() => {
    submitRef.current.disabled = !validated
  }, [validated])

  return { submitRef }
}

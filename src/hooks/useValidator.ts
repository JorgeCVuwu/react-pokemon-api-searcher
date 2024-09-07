import { useRef, useContext, useEffect, useState } from 'react'
import { PokemonSearchContext } from '../context/pokemonSearch.tsx'

export function useValidator() {
  const [validated, setValidated] = useState(false)
  const { inputs } = useContext(PokemonSearchContext)

  const submitRef = useRef<HTMLFormElement>(null)

  // useInput handles input elements using validation parameters (for example, hiding validation error message)
  useEffect(() => {
    setValidated(
      Object.values(inputs).some(input => input.value !== '') &&
      Object.values(inputs).every(input => input.validated === true)
    )
  }, [inputs])

  useEffect(() => {
    if (submitRef.current) {
      submitRef.current.disabled = !validated
    }
  }, [validated])

  return { submitRef }
}

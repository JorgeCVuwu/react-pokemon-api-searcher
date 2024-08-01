import { useState, useEffect, useRef } from 'react'

export function useBlockInputs () {
  const [disabledInput, setDisabledInput] = useState(false)
  const formRef = useRef()

  useEffect(() => {
    if (disabledInput) {
      const inputs = formRef.current.querySelectorAll('input:not(#pokemon-name), select')

      inputs.forEach((input) => {
        input.value = ''
      })
    }
  }, [disabledInput])

  const blockOtherInputs = (event) => {
    const name = event.target.value
    setDisabledInput(name !== '')
  }

  return { disabledInput, blockOtherInputs, formRef }
}

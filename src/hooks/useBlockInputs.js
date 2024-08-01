import { useState, useEffect, useRef } from 'react'

export function useBlockInputs () {
  const [disabledInput, setDisabledInput] = useState(false)
  const nameRef = useRef()
  const formRef = useRef()

  useEffect(() => {
    if (disabledInput) {
      const inputs = formRef.current.querySelectorAll('input, select')

      inputs.forEach((input) => {
        if (input !== nameRef.current) {
          input.value = ''
        }
      })
    }
  }, [disabledInput])

  const blockOtherInputs = (event) => {
    const name = event.target.value
    setDisabledInput(name !== '')
  }

  return { disabledInput, blockOtherInputs, nameRef, formRef }
}

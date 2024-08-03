import { useState, useEffect, useRef } from 'react'

export function useBlockInputs (inputRefId) {
  const [disabledInput, setDisabledInput] = useState(false)
  const formRef = useRef()

  useEffect(() => {
    if (disabledInput) {
      const inputs = formRef.current.querySelectorAll('input, select')
      const nameRef = formRef.current.querySelector(`#${inputRefId}`)
      inputs.forEach((input) => {
        if (input !== nameRef) {
          input.value = ''
        }
      })
    }
  }, [disabledInput])

  const blockOtherInputs = (event) => {
    const name = event.target.value
    setDisabledInput(name !== '')
  }

  return { disabledInput, blockOtherInputs, formRef }
}

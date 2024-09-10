import { useState, useEffect, useRef } from 'react'

export function useBlockInputs(inputRefId: string) {
  const [disabledInput, setDisabledInput] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>()

  useEffect(() => {
    if (disabledInput && formRef.current) {
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

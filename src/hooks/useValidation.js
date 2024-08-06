import { useState } from 'react'

export function useValidation () {
  const [validateForm, setValidateForm] = useState(true)

  const validationCallback = (validation) => {
    setValidateForm(current => current && validation)
  }

  return { validateForm, validationCallback }
}

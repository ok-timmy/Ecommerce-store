import React from 'react'
import { Controller } from 'react-hook-form'

function FormInput({name, label}) {
  return (
    
<div className="col-md-6 mb-3">
<label htmlFor={label}>{label}</label>
        <Controller
        fullWidth
        name={name}
        label={label}
        required
        render={({
          field: { onChange, onBlur, ref },
        }) => (
          <input type="text" className="form-control" required="" onChange={onChange}/>
        )}
        /></div>
  )
}

export default FormInput
import React, { PropTypes } from 'react'

export const renderInput = ({ input, label, type, autoFocus, meta: { touched, error } }) =>
  (<div className='input-group' >
    <label htmlFor={input.name} >{label}</label>
    <input autoFocus={autoFocus} {...input} type={type} />
    {touched && ((error && <span className='error' >{error}</span>))}
  </div>)

renderInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  meta: PropTypes.object,
}

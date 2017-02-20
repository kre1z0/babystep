import React, { PropTypes } from 'react'
// ➡ https://github.com/OpenBookPrices/country-data
import { countries } from 'country-data'
import shortid from 'shortid'

export const renderTimeZoneSelect = (props) => {
  const optionsEastOfGreenwich = Array.from({ length: 12 }, (_, i) =>
    <option value={`GMT+${i + 1}`} key={shortid.generate()} >
      {`GMT +${i + 1}`}
    </option>,
  )
  const optionsWestOfGreenwich = Array.from({ length: 12 }, (_, i) =>
    <option value={`GMT-${i + 1}`} key={shortid.generate()} >
      {`GMT -${i + 1}`}
    </option>,
  )
  return (
    <div className='input-group' >
      <select {...props.input}>
        {optionsEastOfGreenwich}
        {optionsWestOfGreenwich}
      </select>
    </div>
  )
}

renderTimeZoneSelect.propTypes = {
  input: PropTypes.object,
}

export const renderCountrySelect = (props) => {
  return (
    <div className='input-group' >
      <select {...props.input}>
        {
          countries.all.map((item) =>
             (<option key={shortid.generate()} value={item.alpha2} >{item.name}</option>),
          )
        }
      </select>
    </div>
  )
}

renderCountrySelect.propTypes = {
  input: PropTypes.object,
}

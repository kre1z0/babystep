import { isEmpty } from '../utils'
import { emailReg } from '../constants/validators'

export const validate = (values) => {
  const errors = {}

  if (isEmpty(values.phone)) {
    errors.phone = 'Введите номер телефона'
  } else if (values.phone.length < 10) {
    errors.email = 'Некорректный номер телефона'
  }

  if (isEmpty(values.email)) {
    errors.email = 'Введите email'
  } else if (!emailReg.test(values.email)) {
    errors.email = 'Некорректный email'
  }

  return errors
}

export const normalizePhone = (value, previousValue) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 3) {
      return `${onlyNums}-`
    }
    if (onlyNums.length === 6) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}-`
    }
  }
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}

export default normalizePhone

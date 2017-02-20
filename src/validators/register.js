import { isEmpty } from '../utils'
import { emailReg } from '../constants/validators'

export const validate = (values) => {
  const errors = {}

  if (isEmpty(values.firstName)) {
    errors.firstName = 'Введите имя'
  }

  if (isEmpty(values.lastName)) {
    errors.lastName = 'Введите фамилию'
  }

  if (isEmpty(values.email)) {
    errors.email = 'Введите email'
  } else if (!emailReg.test(values.email)) {
    errors.email = 'Некорректный email'
  }

  return errors
}

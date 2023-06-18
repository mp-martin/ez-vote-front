import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface RegisterValidation {
  userLogin: string
  userPassword: string
  confirmNewPass: string
}

export const defaultValues = {
  userLogin: '',
  userPassword: '',
  confirmNewPass: ''
}

export const resolver = yupResolver(yup.object().shape({
  userLogin: yup.string().max(32, 'Maximum 32 characters').required(),
  userPassword: yup
    .string()
    .min(6, 'Password needs to be at least 6 characters long')
    .required('Required field')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Password needs to include minimum of 6 characters, one upper-case letter, one lower-case letter, a number and a special character'
    ),
  confirmNewPass: yup
    .string()
    .oneOf([yup.ref('userPassword')], 'Passwords needs to match!')
    .required('Required field')
}))

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface LoginValidation {
  userLogin: string
  userPassword: string
}

export const defaultValues = {
  userLogin: '',
  userPassword: ''
}

export const resolver = yupResolver(yup.object().shape({
  userLogin: yup.string().required(),
  userPassword: yup.string().required()
}))

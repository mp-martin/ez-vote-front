import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface MyQuestionSchema {
  questionType: string
  questionTitle: string
  answers: Array<{ answer: string }>
}

export interface MyPollSchema {
  pollTitle: string
  pollBody: MyQuestionSchema[]
}

export const defaultValues = {
  pollTitle: '',
  pollBody: [
    {
      questionType: 'closed',
      questionTitle: '',
      answers: [{ answer: '' }]
    }
  ]
}

export const resolver = yupResolver(yup.object().shape({
  pollTitle: yup.string().required(),
  pollBody: yup.array(
    yup.object().shape({
      questionType: yup.string().required(),
      questionTitle: yup.string().required(),
      answers: yup.array(yup.object().shape({ answer: yup.string().required() }))
    })
  )
}))

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export interface MyQuestionSchema {
  questionType: string
  question: string
  answers: Array<{ answer: string }>
}

export interface MyPollSchema {
  pollTitle: string
  pollOwner: string | null
  pollBody: MyQuestionSchema[]
}

export const defaultValues = {
  pollTitle: '',
  pollBody: [
    {
      questionType: 'closed',
      question: '',
      answers: [{ answer: '' }]
    }
  ]
}

export const resolver = yupResolver(yup.object().shape({
  pollTitle: yup.string().required(),
  pollBody: yup.array(
    yup.object().shape({
      questionType: yup.string().required(),
      question: yup.string().required('required field'),
      answers: yup.array(yup.object().shape({ answer: yup.string().required() }))
    })
  )
}))

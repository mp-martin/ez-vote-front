import React, { useContext, useState } from 'react'
import './AddPoll.css'
import { AddQuestion } from '../AddQuestion/AddQuestion'
import { MessageContext } from '../../contexts/message.context'
import { Button } from '../common/Button/Button'
import { AddPollSuccess } from './AddPollSuccess'
import { Spinner } from '../common/Spinner/Spinner'
import { apiUrl } from '../../config/api'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const AddPoll = () => {
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const { showMessage, setShowMessage } = useContext(MessageContext)

  interface MyQuestionSchema {
    questionType: string
    questionTitle: string
    answers: string[]
  }

  interface MyPollSchema {
    pollTitle: string
    pollBody: MyQuestionSchema[]
  }

  const defaultValues = {
    pollTitle: 'Your poll\'s awesome title',
    pollBody: [
      {
        questionType: 'closed',
        questionTitle: 'Your question goes here',
        answers: ['Your answer goes here']
      }
    ]
  }

  const myYupSchema = yup.object().shape({
    pollTitle: yup.string(),
    pollBody: yup.array(
      yup.object().shape({
        questionType: yup.string(),
        questionTitle: yup.string(),
        answers: yup.array(yup.string())
      })
    )
  })

  const { ...methods } = useForm({
    resolver: yupResolver(myYupSchema),
    defaultValues
  })

  const savePoll = (data: MyPollSchema) => {
    console.log(data)
    // setLoading(true)
    // try {
    //   const res = await fetch(`${apiUrl}/poll`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       // pollHeader: pollData.pollHeader,
    //       // pollBody: pollData.pollBody
    //     })
    //   })
    //
    //   const data = (await res.json()) as SuccessMsgNewPoll
    //   setId(data.newPollId)
    // } finally {
    //   setLoading(false)
    // }
  }

  if (loading) {
    return <Spinner/>
  }

  if (id !== '') {
    return <AddPollSuccess id={id} title={'weee'}/>
  }

  return (
        <>
            <div className="addPoll__container">
                <h1>Set up your poll</h1>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(savePoll)}>
                        <input
                            type="text"
                            {...methods.register('pollTitle')}
                            placeholder="Poll title"
                            minLength={1}
                        />

                        <AddQuestion />

                        <Button
                            text={'Start the votes!'}
                            roundness={99}
                            disabled={false}
                            size={2}
                            color={'var(--color-title)'}
                            width={100}
                        />
                    </form>
                </FormProvider>
            </div>
        </>
  )
}

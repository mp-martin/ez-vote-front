import React, { useContext, useEffect, useState } from 'react'
import './AddPoll.css'
import { AddQuestion } from '../AddQuestion/AddQuestion'
import { MessageContext } from '../../contexts/message.context'
import { Button } from '../common/Button/Button'
import { AddPollSuccess } from './AddPollSuccess'
import { Spinner } from '../common/Spinner/Spinner'
import { apiUrl } from '../../config/api'
import { useForm, FormProvider } from 'react-hook-form'
import { defaultValues, type MyPollSchema, resolver } from './poll-validation'
import { type SuccessMsgNewPoll } from '../../../../ez-vote-backend/types/poll'

export const AddPoll = (): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const { setShowMessage, setMessageContent } = useContext(MessageContext)

  const { ...methods } = useForm<MyPollSchema>({
    resolver,
    defaultValues
  })
  const missingTitle = methods.formState.errors.pollTitle

  const savePoll = async (data: MyPollSchema): Promise<void> => {
    console.log(data)
    // setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/poll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      // const resJson = (await res.json()) as SuccessMsgNewPoll
      // setId(resJson.newPollId)
    } finally {
      // setLoading(false)
    }
  }

  if (loading) {
    return <Spinner/>
  }

  if (id !== '') {
    return <AddPollSuccess id={id} title={'weee'}/>
  }

  useEffect(() => {
    setMessageContent('Hey! Make sure you fill everything out')
    setShowMessage((methods.formState.errors.pollBody != null) || missingTitle != null)
  }, [methods.formState.errors.pollBody, missingTitle])

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
                            style={missingTitle != null ? { backgroundColor: '#ffd1d1' } : {}}
                            minLength={1}/>
                        <AddQuestion/>

                        <Button
                            text={'Start the votes!'}
                            roundness={99}
                            disabled={false}
                            size={2}
                            color={'var(--color-title)'}
                            width={100}/>
                    </form>
                </FormProvider>
            </div>
        </>
  )
}

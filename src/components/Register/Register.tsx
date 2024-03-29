import React, { useContext, useState } from 'react'
import '../AddPoll/AddPoll.css'
import { useAuth } from '../../hooks/use.auth'
import { Button } from '../common/Button/Button'
import { useForm } from 'react-hook-form'
import { defaultValues, type RegisterValidation, resolver } from './register-validation'
import { apiUrl } from '../../config/api'
import { Spinner } from '../common/Spinner/Spinner'
import { type AuthPositiveResponse } from 'types'
import { BigMessage } from '../common/BigMessage/BigMessage'
import { MessageContext } from '../../contexts/message.context'

export const Register = () => {
  const [loading, setLoading] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const { setShowMessage, setMessageContent, setMessageTimer, setMessageType } = useContext(MessageContext)
  const { saveToken, user } = useAuth()

  const { getValues, ...methods } = useForm<RegisterValidation>({
    resolver,
    defaultValues
  })

  const register = async (data: RegisterValidation) => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        setLoading(false)
        setMessageContent(`Name ${getValues('userLogin')} is already taken`)
        setShowMessage(true)
        setMessageTimer(4)
        setMessageType('error')
      }
      const resJson = (await res.json()) as AuthPositiveResponse
      saveToken(resJson)
      setRegisterSuccess(true)
    } catch (e) {
      throw new Error(e as any)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return <Spinner/>
  }

  if (registerSuccess) {
    return <BigMessage title={'Hooray!'} body={`${user?.userLogin} registered successfully!`}/>
  }
  return (
        <div className='addPoll__container'><h1>Sign up</h1>

            <form onSubmit={methods.handleSubmit(register)}>
                <input
                    type="text"
                    {...methods.register('userLogin')}
                    placeholder="Create your login name (can be e-mail)"
                    style={methods.formState.errors.userLogin != null
                      ? {
                          backgroundColor: '#ffd1d1',
                          marginBottom: 0
                        }
                      : {}}
                    minLength={1}/>
                {methods.formState.errors.userLogin != null &&
                    <span className="addPoll__errorMsg">{methods.formState.errors.userLogin?.message}</span>}
                <input
                    type="text"
                    {...methods.register('userPassword')}
                    placeholder="Type your password"
                    style={methods.formState.errors.userPassword != null
                      ? {
                          backgroundColor: '#ffd1d1',
                          marginBottom: 0
                        }
                      : {}}
                    minLength={1}/>
                {methods.formState.errors.userPassword != null &&
                    <span className="addPoll__errorMsg">{methods.formState.errors.userPassword?.message}</span>}
                <input
                    type="text"
                    {...methods.register('confirmNewPass')}
                    placeholder="Confirm the new password"
                    style={methods.formState.errors.confirmNewPass != null
                      ? {
                          backgroundColor: '#ffd1d1',
                          marginBottom: 0
                        }
                      : {}}
                    minLength={1}/>
                {methods.formState.errors.confirmNewPass != null &&
                    <span className="addPoll__errorMsg">{methods.formState.errors.confirmNewPass?.message}</span>}

                <Button
                    text={'Register'}
                    roundness={99}
                    disabled={false}
                    size={2}
                    color={'var(--color-title)'}
                    width={100}/>
            </form>

        </div>
  )
}

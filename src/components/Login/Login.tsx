import React, { useContext, useState } from 'react'
import '../AddPoll/AddPoll.css'
import './Login.css'
import { useAuth } from '../../hooks/use.auth'
import { Button } from '../common/Button/Button'
import { useForm } from 'react-hook-form'
import { defaultValues, type LoginValidation, resolver } from './login-validation'
import { apiUrl } from '../../config/api'
import { Spinner } from '../common/Spinner/Spinner'
import { type AuthPositiveResponse } from 'types'
import { MessageContext } from '../../contexts/message.context'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  const [loading, setLoading] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const { setShowMessage, setMessageContent, setMessageTimer, setMessageType } = useContext(MessageContext)
  const { saveToken, user } = useAuth()
  const navigate = useNavigate()

  const { ...methods } = useForm<LoginValidation>({
    resolver,
    defaultValues
  })

  const logIn = async (data: LoginValidation) => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!res.ok) {
        setLoading(false)
        setMessageContent('Bad username or password')
        setShowMessage(true)
        setMessageTimer(2)
        setMessageType('error')
      }
      const resJson = (await res.json()) as AuthPositiveResponse
      saveToken(resJson)
      setLoginSuccess(true)
    } catch (e) {
      throw new Error(e as any)
    } finally {
      setLoading(false)
    }
  }
  if (loading) {
    return <Spinner/>
  }

  if (loginSuccess) {
    setMessageContent(`Logged in as ${user.userLogin}`)
    setShowMessage(true)
    setMessageTimer(2)
    setMessageType('success')
    navigate('/', { replace: true })
  }
  return (
        <div className='addPoll__container'><h1>Log in</h1>

            <form onSubmit={methods.handleSubmit(logIn)}>
                <input
                    type="text"
                    {...methods.register('userLogin')}
                    placeholder="Login"
                    style={methods.formState.errors.userLogin != null ? { backgroundColor: '#ffd1d1' } : {}}
                    minLength={1}/>
                <input
                    type="text"
                    {...methods.register('userPassword')}
                    placeholder="password"
                    style={methods.formState.errors.userPassword != null ? { backgroundColor: '#ffd1d1' } : {}}
                    minLength={1}/>

                <Button
                    text={'Log in'}
                    roundness={99}
                    disabled={false}
                    size={2}
                    color={'var(--color-title)'}
                    width={100}/>
            </form>
            <div className="login__text" style={{ flexDirection: 'row' }}><p>{'Don\'t have an account?'}</p><Link
                to="/register">Sign
                up</Link></div>
        </div>
  )
}

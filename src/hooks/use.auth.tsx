import { useContext, useState } from 'react'
import { type AuthPositiveResponse } from 'types'
import { UserContext } from '../contexts/user.context'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const saveToken = (positiveResponse: AuthPositiveResponse) => {
    const { userId, userLogin } = positiveResponse.user
    const expires = moment().add(positiveResponse.expires)
    localStorage.setItem('userId', positiveResponse.user.userId)
    localStorage.setItem('userLogin', positiveResponse.user.userLogin)
    localStorage.setItem('token', positiveResponse.token)
    localStorage.setItem('expires', JSON.stringify(expires.valueOf()))
    setUser({ userId, userLogin })
  }

  const getExpiration = () => {
    const expiration = localStorage.getItem('expires')
    if (expiration != null) {
      const expiresAt = JSON.parse(expiration)
      return moment(expiresAt)
    } else {
      return 'No token'
    }
  }

  const isLoggedIn = () => {
    const expiration = getExpiration()
    const userId = localStorage.getItem('userId')
    const userLogin = localStorage.getItem('userLogin')
    if (expiration !== 'No token' && userId != null && userLogin != null && moment().isBefore(getExpiration())) {
      setUser({ userId, userLogin })
      return { loggedIn: true, user }
    } else return false
  }

  // const isLoggedOut = () => {
  //   return !isLoggedIn()
  // }

  const logout = () => {
    localStorage.removeItem('userLogin')
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('expires')
    setUser({ userId: '', userLogin: '' })
    navigate('/', { replace: true })
  }

  return { user, saveToken, logout, isLoggedIn }
}

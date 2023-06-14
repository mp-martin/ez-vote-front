import { useContext, useState } from 'react'
import { UserContext } from '../contexts/user.context'

export const useUser = () => {
  const { user, setUser } = useContext(UserContext)
}

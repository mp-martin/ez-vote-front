import React, { type PropsWithChildren, useEffect } from 'react'
import { useAuth } from '../../hooks/use.auth'

export const Dashboard = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useAuth()
  useEffect(() => {
    isLoggedIn()
  }, [])
  return <>{ children }</>
}

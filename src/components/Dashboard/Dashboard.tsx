import React, { type PropsWithChildren, useContext, useEffect } from 'react'
import { useAuth } from '../../hooks/use.auth'
import { Message } from '../common/Message/Message'
import { MessageContext } from '../../contexts/message.context'

export const Dashboard = ({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useAuth()
  const { showMessage, messageContent, messageType, messageTimer, setShowMessage } = useContext(MessageContext)
  useEffect(() => {
    isLoggedIn()
  }, [])
  return <>
        {children}
        {showMessage && <Message content={messageContent} type={messageType} timer={messageTimer} onClose={() => {
          setShowMessage(false)
        }}/>}
    </>
}

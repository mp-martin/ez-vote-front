import React, { createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useState } from 'react'

export const MessageContext = createContext<{
  showMessage: boolean
  messageTimer: number
  messageType: string
  messageContent: string
  setShowMessage: Dispatch<SetStateAction<boolean>>
  setMessageContent: Dispatch<SetStateAction<string>>
  setMessageTimer: Dispatch<SetStateAction<number>>
  setMessageType: Dispatch<SetStateAction<string>>
}>(
  {
    messageContent: '',
    messageTimer: 0,
    messageType: '',
    showMessage: false,
    setShowMessage: () => {
    },
    setMessageContent: () => {
    },
    setMessageTimer: () => {
    },
    setMessageType: () => {
    }
  })

export const MessageContextProvider = (props: PropsWithChildren) => {
  const [showMessage, setShowMessage] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  const [messageTimer, setMessageTimer] = useState(0)
  const [messageType, setMessageType] = useState('')
  return (
        <MessageContext.Provider
            value={{
              showMessage,
              messageType,
              messageTimer,
              messageContent,
              setShowMessage,
              setMessageContent,
              setMessageTimer,
              setMessageType
            }}>
            {props.children}
        </MessageContext.Provider>)
}

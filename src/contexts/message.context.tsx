import { createContext, type Dispatch, type SetStateAction } from 'react'

export const MessageContext = createContext<{
  showMessage: boolean
  setShowMessage: Dispatch<SetStateAction<boolean>>
  setMessageContent: Dispatch<SetStateAction<string>>
  setMessageTimer: Dispatch<SetStateAction<number>>
  setMessageType: Dispatch<SetStateAction<string>>
}>(
  {
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

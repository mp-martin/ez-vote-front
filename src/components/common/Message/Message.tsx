import React, { type SyntheticEvent, useContext, useEffect } from 'react'
import './Message.css'
import { MessageContext } from '../../../contexts/message.context'

interface Props {
  content: string
  onClose: (e: SyntheticEvent) => void
  type: string
  timer?: number
}

export const Message = (props: Props) => {
  const { setShowMessage } = useContext(MessageContext)

  useEffect(() => {
    if (props.timer != null && props.timer !== 0) {
      const modalTimer = setTimeout(() => {
        setShowMessage(false)
      }, 1000 * props.timer)
      return () => {
        clearTimeout(modalTimer)
      }
    }
  }, [props.timer, props.onClose])

  return (
        <div className='Message__container'>
            <div className='Message__content' onClick={props.onClose}>
                {props.type === 'success' && '✅'}
                {props.type === 'error' && '⛔'} {props.content} <span style={{ fontSize: 'x-small', opacity: '0.5' }}>Click to close</span>
            </div>
        </div>)
}

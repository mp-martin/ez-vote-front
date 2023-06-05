import React, { type SyntheticEvent } from 'react'
import './Message.css'

interface Props {
  content: string
  onClose: (e: SyntheticEvent) => void
}

export const Message = (props: Props): JSX.Element => (<>
    <div className='Message__container'>
        <div className='Message__content' onClick={props.onClose}>
            ⛔ {props.content} <span style={{ fontSize: 'x-small', opacity: '0.5' }}>Click to close</span>
        </div>
    </div>
</>)

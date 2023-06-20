import React from 'react'
import './BigMessage.css'
import { Button } from '../Button/Button'

interface Props {
  title: string
  body: string
}

export const BigMessage = ({ title, body }: Props) => {
  return (
        <div className='BigMessage__wrapper'>
            <div className='BigMessage__pageHeader'>
                <h1>{title}</h1>
                <p>{body}</p>
                <Button text={'Main page'} roundness={99} disabled={false} size={1} color={'var(--color-ezgreen)'}
                        to={'/'}/>
            </div>
        </div>
  )
}

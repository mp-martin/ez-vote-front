import React from 'react'
import './ErrorPage.css'

interface Props {
  title: string
  body: string
}

export const ErrorPage = ({ title, body }: Props) => {
  return (
        <div className='ErrorPage__wrapper'>
            <div className='ErrorPage__pageHeader'>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </div>
  )
}

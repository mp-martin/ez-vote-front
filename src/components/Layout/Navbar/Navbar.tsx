import React from 'react'
import './Navbar.css'
import { useAuth } from '../../../hooks/use.auth'

export const Navbar = () => {
  const { user } = useAuth()

  return (
        <>
            {(user != null) ? `ohaio yusaaa ${user.userLogin}` : 'mistaaa ju not loginnn'}
            <div className='Navbar'>
                <a href='/login'>Login</a>
                <a href='#' style={{ color: 'white', fontWeight: 700, textDecoration: 'line-through', opacity: 0.4 }}>Sign
                    up</a>
                <a href='#about'>About</a>
            </div>
        </>
  )
}

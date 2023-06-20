import React, { useContext } from 'react'
import './Navbar.css'
import userAvatar from '../../../assets/user.png'
import { useAuth } from '../../../hooks/use.auth'
import { HashLink as Link } from 'react-router-hash-link'
import { MessageContext } from '../../../contexts/message.context'

export const Navbar = () => {
  const { setShowMessage, setMessageContent, setMessageTimer, setMessageType } = useContext(MessageContext)
  const { user, logout } = useAuth()

  return (
        <>
            {(user.userLogin !== '') &&
                <div className="navbar__userWidget">
                    <img className="navbar__userWidget_avatar" alt="user avatar" src={userAvatar}/>
                    <p>{user.userLogin}</p>
                </div>}
            <div className='Navbar'>
                {(user.userLogin !== '') && <Link to='/mypolls'>My polls</Link>}
                {(user.userLogin === '') && <Link to='/login'>Log in / sign up</Link>}
                {(user.userLogin !== '') && <a href='#' onClick={() => {
                  logout()
                  setShowMessage(true)
                  setMessageContent('Logged out')
                  setMessageTimer(2)
                  setMessageType('success')
                }
                }>Log out</a>}
                <Link to='/#about'>About</Link>
            </div>
        </>
  )
}

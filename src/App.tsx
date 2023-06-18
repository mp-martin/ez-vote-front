import React, { useState } from 'react'
import { AddPoll } from './components/AddPoll/AddPoll'
import { PollToFill } from './components/PollToFill/PollToFill'
import { PollResults } from './components/PollResults/PollResults'
import { Header } from './components/Layout/Header/Header'
import { Footer } from './components/Layout/Footer/Footer'
import { Main } from './components/Layout/Main/Main'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Message } from './components/common/Message/Message'
import { MessageContext } from './contexts/message.context'
import { UserContextProvider } from './contexts/user.context'
import { Login } from './components/Login/Login'
import { Dashboard } from './components/Dashboard/Dashboard'
import { Register } from './components/Register/Register'

const App = (): JSX.Element => {
  const [showMessage, setShowMessage] = useState(false)
  const [messageContent, setMessageContent] = useState('')
  const [messageTimer, setMessageTimer] = useState(0)
  const [messageType, setMessageType] = useState('')

  return (
        <div className='App'>
            <UserContextProvider>
                <MessageContext.Provider value={{ showMessage, setShowMessage, setMessageContent, setMessageTimer, setMessageType }}>
                    <Dashboard><Header/>
                        <Routes>
                            <Route path='/' element={<Main/>}/>
                            <Route path='/addpoll' element={<AddPoll/>}/>
                            <Route path='/poll/:id' element={<PollToFill/>}/>
                            <Route path='/poll/:id/results' element={<PollResults/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/:whatever' element={<Main/>}/>
                        </Routes>
                        <Footer/>
                        {showMessage && <Message content={messageContent} type={messageType} timer={messageTimer} onClose={() => {
                          setShowMessage(false)
                        }}/>}</Dashboard>
                </MessageContext.Provider>
            </UserContextProvider>
        </div>
  )
}

export default App

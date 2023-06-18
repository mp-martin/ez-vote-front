import React, { useState } from 'react'
import { AddPoll } from './components/AddPoll/AddPoll'
import { PollToFill } from './components/PollToFill/PollToFill'
import { PollResults } from './components/PollResults/PollResults'
import { Header } from './components/Layout/Header/Header'
import { Footer } from './components/Layout/Footer/Footer'
import { Main } from './components/Layout/Main/Main'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MessageContextProvider } from './contexts/message.context'
import { UserContextProvider } from './contexts/user.context'
import { Login } from './components/Login/Login'
import { Dashboard } from './components/Dashboard/Dashboard'
import { Register } from './components/Register/Register'

const App = (): JSX.Element => {
  return (
        <div className='App'>
            <UserContextProvider>
                <MessageContextProvider>
                    <Dashboard>
                        <Header/>
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
                    </Dashboard>
                </MessageContextProvider>
            </UserContextProvider>
        </div>
  )
}

export default App

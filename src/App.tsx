import React from 'react';
import {AddPoll} from './components/AddPoll/AddPoll';
import {PollToFill} from './components/PollToFill/PollToFill';
import {PollResults} from './components/PollResults/PollResults';
import {Header} from './components/Layout/Header/Header';
import {Footer} from './components/Layout/Footer/Footer';
import {Main} from './components/Layout/Main/Main';
import './App.css';
import coolDude from './assets/cartoon.svg';
import {Route, Routes} from 'react-router-dom';

const App = () => (
	<div className='App'>

		<Header/>
		<Routes>
			<Route path='/' element={<Main/>}/>
			<Route path='/addpoll' element={<AddPoll/>}/>
			<Route path='/poll/:id' element={<PollToFill/>}/>
			<Route path='/poll/:id/results' element={<PollResults/>}/>
		</Routes>
		<Footer/>

	</div>
);

export default App;

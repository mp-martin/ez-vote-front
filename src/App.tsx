import React from 'react';
import {AddPoll} from './components/AddPoll/AddPoll';
import {PollToFill} from './components/PollToFill/PollToFill';
import {PollResults} from './components/PollResults/PollResults';
import {Header} from './components/Layout/Header/Header';
import {Footer} from './components/Layout/Footer/Footer';
import {Main} from './components/Layout/Main/Main';
import './App.css';

const App = () => (
	<div className='App'>
		<Header/>
		<Main/>
		<Footer/>
	</div>
);

export default App;

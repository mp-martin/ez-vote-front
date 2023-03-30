import React from 'react';
import {AddPoll} from './components/AddPoll/AddPoll';
import {PollToFill} from './components/PollToFill/PollToFill';
import {PollResults} from './components/PollResults/PollResults';
import {Header} from './components/Layout/Header/Header';
import {Footer} from './components/Layout/Footer/Footer';
import {Main} from './components/Layout/Main/Main';
import './App.css';
import coolDude from './assets/cartoon.svg';

const App = () => (
	<div className='App'>
		<div className='cool-dude-1'><img src={coolDude} /></div>
		<Header/>
		<Main/>
		<Footer/>
		<div className='cool-dude-2'><img src={coolDude} /></div>
	</div>
);

export default App;

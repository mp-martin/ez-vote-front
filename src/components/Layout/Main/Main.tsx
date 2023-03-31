import React from 'react';
import './Main.css';
import heroLogo from '../../../assets/logo_big.svg';
import {Button} from '../../common/Button/Button';
import coolDude from '../../../assets/cartoon.svg';
import {Link} from 'react-router-dom';

export const Main = () =>
// C
	(<div className='Main'>
		<div className='cool-dude-1'><img src={coolDude}/></div>

		<div className='Main__wrapper'>

			<div className='Main__hero'>
				<img className='BigLogo' src={heroLogo} alt='EZ Vote, Simple polls for lazy people. Or smart.'/>
				<Button
					text={'Create a poll'}
					roundness={99}
					disabled={false}
					size={2}
					color={'ezgreen'}
					width={100}
					to={'/addPoll'}
				/>
			</div>

			<div className='Main__content'>

				<div className='Main__paragraph'>
					<div className='Main__paragraph_wrapper'>
						<h2 className='Main__paragraph_title'>How does this work?<br/>
                            It’s pretty simple</h2>
						<p className='Main__paragraph_text'>Create a poll.<br/>
                            Share the poll link.<br/>
                            Let the voting begin!<br/>
							Check out results.<br/>
						</p></div>
				</div>

				<div className='Main__paragraph__no-bg'>
					<div className='Main__paragraph_wrapper'><h2 className='Main__paragraph_title'>What about something
                        more? </h2>
					<p className='Main__paragraph_text'>Sign up to EZ Vote and get access to all of your polls and
                            results! </p>
					<Button
						text={'Register account'}
						roundness={99}
						disabled={false}
						size={2}
						color={'ezpink'}
					/></div>
				</div>

				<div className='Main__paragraph'>
					<div className='Main__paragraph_wrapper'><h2 className='Main__paragraph_title'>About the
                        project</h2>
					<p className='Main__paragraph_text'>Hi, my name is Marcin and I made this app as part of my
                            JavaScript
                            training!
                            Check out my <a href='https://github.com/mp-martin/'>github page</a> to see the source code.
					</p></div>
				</div>

			</div>

		</div>
		<div className='cool-dude-2'><img src={coolDude}/></div>
	</div>);

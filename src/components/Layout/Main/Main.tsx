import React from 'react';
import './Main.css';
import heroLogo from '../../../assets/logo_big.svg';
import {Button} from '../../common/Button/Button';

export const Main = () =>
// C
	(<div className='Main'>

		<div className='Main_wrapper'>

			<div className='Main_hero'>
				<img className='BigLogo' src={heroLogo} alt='EZ Vote, Simple polls for lazy people. Or smart.'/>
				<Button
					text={'Create a poll'}
					roundness={99}
					disabled={false}
					size={2}
					color={'ezgreen'}
					width={100}
				/>
			</div>

			<div className='Main_content'>

				<div className='Main_paragraph'>
					<h2 className='Main_paragraph__title'>How does this work?<br/>
                        It’s pretty simple.</h2>
					<p className='Main_paragraph__text'>Create a poll.<br/>
                        Share the poll link.<br/>
                        Keep or share the result link.<br/>
                        Let the voting begin!</p>
				</div>

				<div className='Main_paragraph'>
					<h2 className='Main_paragraph__title'>What about something more? </h2>
					<p className='Main_paragraph__text'>Sign up to EZ Vote and get access to all of your polls and
                        results! </p>
					<Button
						text={'Register account'}
						roundness={99}
						disabled={false}
						size={2}
						color={'ezpink'}
						width={100}
					/>
				</div>

				<div className='Main_paragraph'>
					<h2 className='Main_paragraph__title'>About the project</h2>
					<p className='Main_paragraph__text'>Hi, my name is Marcin and I made this as a part of my JavaScript
                        training!
                        Check out my <a href='https://github.com/mp-martin/'>github page</a> to see the source code.</p>
				</div>

			</div>

		</div>

	</div>);

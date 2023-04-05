import React, {type FormEvent} from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

type Props = {
	text: string;
	roundness: number;
	disabled: boolean;
	size: number;
	width?: number;
	color: string;
	onClick?: (e: FormEvent) => void;
	to?: string;

};

export const Button = (props: Props) => (
	props.to ? <Link
		to={props.to}
		className='Button'
		style={{
			borderRadius: `${props.roundness}rem`,
			backgroundColor: props.color,
			fontSize: `${props.size}rem`,
			textAlign: 'center',
			width: props.width && `${props.width}%`,
		}}>

		{props.text}

	</Link>
		: <button
			className='Button'
			style={{
				borderRadius: `${props.roundness}rem`,
				backgroundColor: props.color,
				fontSize: `${props.size}rem`,
				width: props.width && `${props.width}%`,
			}}>

			{props.text}

		</button>
);

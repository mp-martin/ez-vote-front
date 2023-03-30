import React, {type FormEvent} from 'react';
import './Button.css';

type Props = {
	text: string;
	roundness: number;
	disabled: boolean;
	size: number;
	width?: number;
	color: string;
	onClick?: (e: FormEvent) => void;

};

export const Button = (props: Props) => {
	const ezgreen = 'var(--color-ezgreen)';
	const ezpink = 'var(--color-ezpink)';
	return (
		<button
			className='Button'
			style={{
				borderRadius: `${props.roundness}rem`,
				backgroundColor: props.color === 'ezgreen' ? ezgreen : ezpink,
				fontSize: `${props.size}rem`,
				width: props.width && `${props.width}%`,
			}}>

			{props.text}

		</button>
	);
};

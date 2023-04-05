import React, {type SyntheticEvent} from 'react';
import './Message.css';

type Props = {
	content: string;
	onClose: (e: SyntheticEvent) => void;
};
export const Message = (props: Props) => (<>
	<div className='Message__container' onClick={props.onClose}>
		<div className='Message__content'>
            ⛔ {props.content} <span style={{fontSize: 'x-small', opacity: '0.5'}}>Click to close</span>
		</div>
	</div>
</>);

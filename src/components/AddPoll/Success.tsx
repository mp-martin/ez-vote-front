import React from 'react';
import {FaCopy} from 'react-icons/fa';
import {useCopyToClipboard} from '../../hooks/use.copy.to.clipboard';

type Props = {
	id: string;
	title: string;
};

export const Success = (props: Props) => {
	const [value, copy] = useCopyToClipboard();

	return (
		<div className='addPoll__container'><h1>Poll &apos;<span
			style={{color: 'var(--color-ezpink)'}}>{props.title}</span>&apos; has
            been successfully uploaded!
		</h1>

		<div className='addPoll__final-link'><p>Share this link with others to start voting:</p>
			<div className='addPoll__final-link_address'>
				<a href={`http://localhost:3000/poll/${props.id}`}>Link to your poll</a>
				<div className='addPoll__copy-to-clipboard'><p>Copy to clipboard:</p> <FaCopy size={'2em'}
					className='addPoll__copy-button'
					onClick={async () => copy(`http://localhost:3000/poll/${props.id}`)}></FaCopy>
				</div>
			</div>
		</div>

		<div className='addPoll__final-link'><p>To see the results, go to this link:</p>
			<div className='addPoll__final-link_address'>
				<a href={`http://localhost:3000/poll/${props.id}/results`}>Link to the results</a>
				<div className='addPoll__copy-to-clipboard'><p>Copy to clipboard:</p> <FaCopy size={'2em'}
					className='addPoll__copy-button'
					onClick={async () => copy(`http://localhost:3000/poll/${props.id}/results`)}></FaCopy>
				</div>
			</div>
		</div>
		</div>
	);
};

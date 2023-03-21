import React, {type FormEvent, useState} from 'react';

type Props = {
	questionNumber: number;
	onClick: (answer: string) => void;
};

export const AddAnswer = (props: Props) => {
	const [answer, setAnswer] = useState<string>('');

	const sendAnswer = (e: FormEvent) => {
		e.preventDefault();
		props.onClick(answer);
	};

	return (
		<>
			{props.questionNumber} <input defaultValue='Answer goes here I guess...' onChange={e => {
				setAnswer(e.target.value);
			}}/>
			<button onClick={sendAnswer}>Add</button>
		</>

	);
};

import React, {type FormEvent, useEffect, useState} from 'react';
import {type AnswerEntityRequest} from 'types';

type Props = {
	questionNumber: number;
	updateFunc: (answer: AnswerEntityRequest, index: number) => void;
	newAnswerFunc: (e: FormEvent) => void;
	removeAnswerFunc: (e: FormEvent) => void;
};

export const AddAnswer = (props: Props) => {
	const [answer, setAnswer] = useState<AnswerEntityRequest>({
		answerBody: '',
	});

	const [wasClickedAdd, setWasClickedAdd] = useState(false);
	const [wasClickedRemove, setWasClickedRemove] = useState(false);

	const removeAnswer = (e: FormEvent) => {
		props.removeAnswerFunc(e);
		setWasClickedRemove(true);
	};

	useEffect(() => {
		props.updateFunc(answer, props.questionNumber);
	}, [answer]);

	const handleUpdateAnswer = (answerBody: string) => {
		setAnswer({answerBody /* answerId: props.questionNumber */});
	};

	return (
		<>
			<input defaultValue='Answer goes here I guess...' onChange={e => {
				handleUpdateAnswer(e.target.value);
			}}/>
			<button onClick={removeAnswer} disabled={wasClickedRemove}>-</button>
			<button onClick={props.newAnswerFunc}>+</button>

		</>

	);
};

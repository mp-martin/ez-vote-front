import React, {type FormEvent, useEffect, useState} from 'react';

type Props = {
	questionNumber: number;
	updateFunc: (answer: Answer, index: number) => void;
	newAnswerFunc: (e: FormEvent) => void;
	removeAnswerFunc: (e: FormEvent) => void;
};

type Answer = {
	answerBody: string;
	answerId: number;
};

export const AddAnswer = (props: Props) => {
	const [answer, setAnswer] = useState<Answer>({
		answerBody: '',
		answerId: props.questionNumber,
	});

	useEffect(() => {
		props.updateFunc(answer, props.questionNumber);
	}, [answer]);

	const handleUpdateAnswer = (answerBody: string) => {
		setAnswer({answerBody, answerId: props.questionNumber});
	};

	return (
		<>
			<input defaultValue='Answer goes here I guess...' onChange={e => {
				handleUpdateAnswer(e.target.value);
			}}/>
			<button onClick={props.removeAnswerFunc}>-</button>
			<button onClick={props.newAnswerFunc}>+</button>

		</>

	);
};

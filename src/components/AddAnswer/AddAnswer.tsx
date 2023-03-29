import React, {type FormEvent, useEffect, useRef, useState} from 'react';
import {type AnswerEntityRequest} from 'types';
import {Simulate} from 'react-dom/test-utils';
import input = Simulate.input;

type Props = {
	answerNumber: number;
	updateFunc: (answer: AnswerEntityRequest, index: number) => void;
	newAnswerFunc: (e: FormEvent,) => void;
	removeAnswerFunc: (e: FormEvent, position: number) => void;
	answerFields: string[];
	answers: AnswerEntityRequest[];
};

export const AddAnswer = (props: Props) => {
	const [answer, setAnswer] = useState<AnswerEntityRequest>({
		answerBody: '',
	});

	const [inactiveAddAnswer, setInactiveAddAnswer] = useState(false);
	const [inactiveRemoveAnswer, setInactiveRemoveAnswer] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null!);

	useEffect(() => {
		props.updateFunc(answer, props.answerNumber);
	}, [answer]);

	useEffect(() => {
		const currAnsIdx = props.answerNumber;
		const lastAnsIdx = props.answerFields.length - 1;
		const {answers} = props;

		inputRef.current.value = answers[currAnsIdx] ? answers[currAnsIdx].answerBody : 'Answer goes here';

		if (currAnsIdx === 0 && lastAnsIdx === 0) {
			setInactiveRemoveAnswer(true);
			setInactiveAddAnswer(false);
		}

		if (currAnsIdx < lastAnsIdx) {
			setInactiveRemoveAnswer(false);
			setInactiveAddAnswer(true);
		}

		if (currAnsIdx === lastAnsIdx && lastAnsIdx > 0) {
			setInactiveRemoveAnswer(false);
			setInactiveAddAnswer(false);
		}
	}, [props.answerFields]);

	const handleUpdateAnswer = (answerBody: string) => {
		setAnswer({answerBody /* answerId: props.questionNumber */});
	};

	return (
		<>
			<input defaultValue={`Answer ${props.answerNumber + 1}...`} ref={inputRef} onChange={e => {
				handleUpdateAnswer(e.target.value);
			}} minLength={1}/>
			<button onClick={e => {
				props.removeAnswerFunc(e, props.answerNumber);
			}} disabled={inactiveRemoveAnswer}>-
			</button>
			<button onClick={props.newAnswerFunc} disabled={inactiveAddAnswer}>+
			</button>
		</>

	);
};

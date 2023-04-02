import React, {type FormEvent, useEffect, useRef, useState} from 'react';
import {type AnswerEntityRequest} from 'types';
import {Simulate} from 'react-dom/test-utils';
import input = Simulate.input;
import './AddAnswer.css';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import {AiFillMinusCircle} from 'react-icons/ai';

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
		setAnswer({answerBody});
	};

	return (
		<div className='addAnswer__answer-row'>
			<input
				className='addAnswer__answer-field'
				defaultValue={`Answer ${props.answerNumber + 1}...`} ref={inputRef} onChange={e => {
					handleUpdateAnswer(e.target.value);
				}} minLength={1}/>
			<button className='addAnswer__rem-button' onClick={e => {
				props.removeAnswerFunc(e, props.answerNumber);
			}} disabled={inactiveRemoveAnswer}>
				<AiFillMinusCircle color={inactiveRemoveAnswer ? '#EDEDED' : 'var(--color-ezpink)'} size={'2.8em'}/>
			</button>
			<button className='addAnswer__add-button' onClick={props.newAnswerFunc} disabled={inactiveAddAnswer}>
				<BsFillPlusCircleFill color={inactiveAddAnswer ? '#EDEDED' : 'var(--color-ezgreen)'} size={'2.5em'}/>
			</button>
		</div>

	);
};

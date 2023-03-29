import React, {type FormEvent, useEffect, useState} from 'react';
import './AddQuestion.css';
import {type AnswerPoolRequest, type AnswerEntityRequest} from 'types';
import {AddAnswer} from '../AddAnswer/AddAnswer';

type Props = {
	questionEntityNumber: number;
	removeQuestionFunc: (e: FormEvent) => void;
	newQuestionFunc: (e: FormEvent) => void;
	updateFunc: (question: AnswerPoolRequest, index: number) => void;
	questionFields: string[];
};

export const AddQuestion = (props: Props) => {
	const [questionEntity, setQuestionEntity] = useState<AnswerPoolRequest>({
		questionHeader: {
			questionBody: '',
			questionType: 'closed',

		},
		answers: [],
	});

	const [answerFields, setAnswerFields] = useState<string[]>(['Answer field number 1']);
	const [inactiveAddQuestion, setInactiveAddQuestion] = useState(false);
	const [inactiveRemoveQuestion, setInactiveRemoveQuestion] = useState(false);
	const [answers, setAnswers] = useState<AnswerEntityRequest[]>([]);

	useEffect(() => {
		props.updateFunc(questionEntity, props.questionEntityNumber);
	}, [questionEntity]);

	useEffect(() => {
		setQuestionEntity(questionEntity => ({
			...questionEntity,
			answers,
		}
		));
	}, [answers]);

	useEffect(() => {
		const currQuestionIdx = props.questionEntityNumber;
		const lastQuestionIdx = props.questionFields.length - 1;

		if (currQuestionIdx === 0 && lastQuestionIdx === 0) {
			setInactiveRemoveQuestion(true);
			setInactiveAddQuestion(false);
		}

		if (currQuestionIdx < lastQuestionIdx) {
			setInactiveRemoveQuestion(true);
			setInactiveAddQuestion(true);
		}

		if (currQuestionIdx === lastQuestionIdx && lastQuestionIdx > 0) {
			setInactiveRemoveQuestion(false);
			setInactiveAddQuestion(false);
		}
	}, [props.questionFields]);

	const updateQuestionHeader = (key: string, value: string) => {
		setQuestionEntity(questionEntity => ({
			...questionEntity,
			questionHeader: {
				...questionEntity.questionHeader,
				[key]: value,
			},
		}));
	};

	const updateAnswers = (answer: AnswerEntityRequest, index: number) => {
		const updatedAnswers = [...answers];
		updatedAnswers[index] = answer;
		setAnswers(updatedAnswers);
	};

	const newAnswer = (e: FormEvent) => {
		e.preventDefault();
		setAnswerFields([...answerFields, `Answer field number ${answerFields.length + 1}`]);
	};

	const removeAnswer = (e: FormEvent, position: number) => {
		e.preventDefault();
		setAnswerFields(s => s.filter((elm, idx) => idx !== position));
		setAnswers(s => s.filter((elm, idx) => idx !== position));
	};

	return (<div className='addQuestion__questionWrapper'>

		<div className='addQuestion__list-element'>
			<p>Question:</p>
			<label>
				<input
					type='text'
					defaultValue='Type your question here'
					onChange={e => {
						updateQuestionHeader('questionBody', e.target.value);
					}}
					minLength={1}
				/>
			</label>
			<p>Question type:</p>
			<label>
				<select
					defaultValue='closed'
					onChange={e => {
						updateQuestionHeader('questionType', e.target.value);
					}}>
					<option value='open'>Open (multiple choice)</option>
					<option value='closed'>Closed (single choice)</option>
				</select>
			</label>
		</div>

		<div className='addQuestion__list-element'>
			{/* //button */}
			<p>Answers:</p>
			{answerFields.map((field, i) => <label key={i}><AddAnswer
				answerNumber={i}
				answerFields={answerFields}
				updateFunc={updateAnswers}
				newAnswerFunc={newAnswer}
				removeAnswerFunc={removeAnswer}
				answers={answers}
			/></label>)}
		</div>
		<button onClick={props.removeQuestionFunc} disabled={inactiveRemoveQuestion}>Remove question</button>
		<button onClick={props.newQuestionFunc} disabled={inactiveAddQuestion}>Add question</button>
	</div>);
};

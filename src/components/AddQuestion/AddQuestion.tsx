import React, {type FormEvent, useEffect, useState} from 'react';
import './AddQuestion.css';
import {type AnswerPoolRequest, type AnswerEntityRequest} from 'types';
import {AddAnswer} from '../AddAnswer/AddAnswer';

type Props = {
	questionEntityNumber: number;
	removeQuestionFunc: (e: FormEvent) => void;
	newQuestionFunc: (e: FormEvent) => void;
	updateFunc: (question: AnswerPoolRequest, index: number) => void;
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

	const removeAnswer = (e: FormEvent) => {
		e.preventDefault();
		setAnswerFields(s => s.filter((elm, idx) => idx !== s.length - 1));
		setAnswers(s => s.filter((elm, idx) => idx !== s.length - 1));
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
				key={i}
				questionNumber={i}
				updateFunc={updateAnswers}
				newAnswerFunc={newAnswer}
				removeAnswerFunc={removeAnswer}
			/></label>)}
		</div>
		<button onClick={props.removeQuestionFunc}>Remove question</button>
		<button onClick={props.newQuestionFunc}>Add question</button>
	</div>);
};

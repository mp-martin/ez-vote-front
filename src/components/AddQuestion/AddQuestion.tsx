import React, {type FormEvent, useEffect, useState} from 'react';
import './AddQuestion.css';
import {AddAnswer} from '../addAnswer/AddAnswer';

type Answer = {
	answerId?: number;
	answerBody: string;
};

type QuestionHeader = {
	questionBody: string;
	questionType: string;
};

type QuestionEntity = {
	questionHeader: QuestionHeader;
	answers: Answer[];
};

type Props = {
	questionEntityNumber: number;
	removeQuestionFunc: (e: FormEvent) => void;
	newQuestionFunc: (e: FormEvent) => void;
	updateFunc: (question: QuestionEntity, index: number) => void;
};

export const AddQuestion = (props: Props) => {
	const [questionEntity, setQuestionEntity] = useState<QuestionEntity>({
		questionHeader: {
			questionBody: '',
			questionType: 'close',

		},
		answers: [],
	});

	const [answerFields, setAnswerFields] = useState<string[]>(['Answer field number 1']);

	const [answers, setAnswers] = useState<Answer[]>([]);

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

	const updateAnswers = (answer: Answer, index: number) => {
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
					defaultValue='close'
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
		<button onClick={props.removeQuestionFunc}>-</button>
		<button onClick={props.newQuestionFunc}>+</button>
	</div>);
};

import React, {useState} from 'react';
import './AddQuestion.css';
import {AddAnswer} from '../addAnswer/AddAnswer';

type Answer = {
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

type PollHeaderEntity = {
	pollTitle: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	pollOwner: string | null;
};

type PollEntity = {
	pollHeader: PollHeaderEntity;
	pollBody: QuestionEntity[];
};

export const AddQuestion = () => {
	const [questionEntity, setQuestionEntity] = useState<QuestionEntity>({
		questionHeader: {
			questionBody: '',
			questionType: 'close',

		},
		answers: [],
	});

	const updateQuestionHeader = (key: string, value: string) => {
		setQuestionEntity(questionEntity => ({
			...questionEntity,
			questionHeader: {
				...questionEntity.questionHeader,
				[key]: value,
			},
		}));
	};

	const updateAnswers = (answer: string) => {
		setQuestionEntity(questionEntity => {
			questionEntity.answers.push({
				answerBody: answer,
			});
			return {
				...questionEntity,
			};
		});
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
					onChange={e => {
						updateQuestionHeader('questionType', e.target.value);
					}}>
					<option value='open'>Open (multiple choice)</option>
					<option value='close' selected>Close (single choice)</option>
				</select>
			</label>
		</div>

		<div className='addQuestion__list-element'>
			{/* //button */}
			<p>Answers:</p>
			<label><AddAnswer onClick={updateAnswers} questionNumber={1}/></label>
			<label><AddAnswer onClick={updateAnswers} questionNumber={2}/></label>
			<label><AddAnswer onClick={updateAnswers} questionNumber={3}/></label>
		</div>
	</div>);
};

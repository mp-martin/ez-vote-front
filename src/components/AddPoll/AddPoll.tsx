import React, {type FormEvent, useEffect, useState} from 'react';
import './AddPoll.css';
import {AddQuestion} from '../AddQuestion/AddQuestion';

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

export const AddPoll = () => {
	const [pollData, setPollData] = useState<PollEntity>({
		pollHeader: {
			pollTitle: 'New Poll',
			pollOwner: null,
		},
		pollBody: [],
	});

	// Const updatePollHeader= (questions: QuestionEntity) => {
	// 	setPollData();
	// };

	const [questionFields, setQuestionFields] = useState<string[]>(['Question field number 1']);
	const [questions, setQuestions] = useState<QuestionEntity[]>([]);

	useEffect(() => {
		setPollData(pollData => ({
			...pollData,
			pollBody: questions,
		}
		));
	}, [questions]);

	const updateQuestionEntities = (questionEntity: QuestionEntity, index: number) => {
		const updatedQuestions = [...questions];
		updatedQuestions[index] = questionEntity;
		setQuestions(updatedQuestions);
	};

	const newQuestion = (e: FormEvent) => {
		e.preventDefault();
		setQuestionFields([...questionFields, `Question field number ${questionFields.length + 1}`]);
	};

	const removeQuestion = (e: FormEvent) => {
		e.preventDefault();
		setQuestionFields(s => s.filter((elm, idx) => idx !== s.length - 1));
		setQuestions(s => s.filter((elm, idx) => idx !== s.length - 1));
	};

	return (
		<div className='addPoll__container'>
			<h1>{'It\'s time to create a Poll!'}</h1>
			<form>
				<label><h1>Set your title:</h1>
					<input type='text' defaultValue='Title of the poll goes here'/></label>
				<h1>Set your questions:</h1>
				{questionFields.map((field, i) =>
					<AddQuestion
						key={i}
						questionEntityNumber={i}
						updateFunc={updateQuestionEntities}
						removeQuestionFunc={removeQuestion}
						newQuestionFunc={newQuestion}
					/>)}

			</form>

		</div>);
};

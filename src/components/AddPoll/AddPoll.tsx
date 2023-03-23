import React, {type FormEvent, useEffect, useState} from 'react';
import './AddPoll.css';
import {
	type SuccessMsg,
	type AnswerPoolRequest,
	type CompletePollRequest}
	from 'types';
import {AddQuestion} from '../AddQuestion/AddQuestion';

export const AddPoll = () => {
	const [pollData, setPollData] = useState<CompletePollRequest>({
		pollHeader: {
			pollTitle: 'New Poll',
			pollOwner: null,
		},
		pollBody: [],
	});

	const updatePollHeader = (key: string, value: string) => {
		setPollData(pollData => ({
			...pollData,
			pollHeader: {
				...pollData.pollHeader,
				[key]: value,
			},
		}));
	};

	const [questionFields, setQuestionFields] = useState<string[]>(['Question field number 1']);
	const [questions, setQuestions] = useState<AnswerPoolRequest[]>([]);
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState('');

	useEffect(() => {
		setPollData(pollData => ({
			...pollData,
			pollBody: questions,
		}
		));
	}, [questions]);

	const updateQuestionEntities = (questionEntity: AnswerPoolRequest, index: number) => {
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

	const savePoll = async (e: FormEvent) => {
		e.preventDefault();

		setLoading(true);

		try {
			const res = await fetch('http://localhost:3001/poll', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					pollHeader: pollData.pollHeader,
					pollBody: pollData.pollBody,
				}),
			});

			const data = await res.json() as SuccessMsg;
			setId(data.newPollId);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <h2>Sending the poll... </h2>;
	}

	if (id) {
		return <p>Your poll <strong>{pollData.pollHeader.pollTitle}</strong> has been successfully uploaded with
            id <strong>${id}</strong></p>;
	}

	return (
		<div className='addPoll__container'>
			<h1>{'It\'s time to create a Poll!'}</h1>
			<form onSubmit={savePoll}>
				<label><h1>Set your title:</h1>
					<input
						type='text'
						defaultValue='Title of the poll goes here'
						onChange={e => {
							updatePollHeader('pollTitle', e.target.value);
						}}
					/></label>
				<h1>Set your questions:</h1>
				{questionFields.map((field, i) =>
					<AddQuestion
						key={i}
						questionEntityNumber={i}
						updateFunc={updateQuestionEntities}
						removeQuestionFunc={removeQuestion}
						newQuestionFunc={newQuestion}
					/>)}
				<button>Send this shit to backend</button>
			</form>

		</div>);
};

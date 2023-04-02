import React, {type FormEvent, useContext, useEffect, useState} from 'react';
import './AddPoll.css';
import {
	type SuccessMsgNewPoll,
	type AnswerPoolRequest,
	type CompletePollRequest,
}
	from 'types';
import {AddQuestion} from '../AddQuestion/AddQuestion';
import {MessageContext} from '../../assets/contexts/message.context';
import {Button} from '../common/Button/Button';

export const AddPoll = () => {
	const [pollData, setPollData] = useState<CompletePollRequest>({
		pollHeader: {
			pollTitle: '',
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
	const {showMessage, setShowMessage} = useContext(MessageContext);

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

		if (
			!pollData.pollHeader.pollTitle
            || pollData.pollBody.find(o => o.questionHeader.questionBody === '')
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            || pollData.pollBody.find(o => o.answers.find(a => a.answerBody === ''))
		) {
			setShowMessage(true);
			return;
		}

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

			const data = await res.json() as SuccessMsgNewPoll;
			setId(data.newPollId);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <h2>Sending the poll... </h2>;
	}

	if (id) {
		return <><p>Your poll <strong>{pollData.pollHeader.pollTitle}</strong> has been successfully uploaded!
		</p>

		<p>Share this link with others to start voting: <a
			href={`http://localhost:3000/poll/${id}`}>http://localhost:3000/poll/{id}</a>
		</p>

		<p>To see the results, go to this link: <a
			href={`http://localhost:3000/poll/${id}/results`}>http://localhost:3000/poll/{id}/results</a>
		</p>

		</>;
	}

	return (
		<>
			<div className='addPoll__container'>
				<h1>Set up your poll</h1>
				<form onSubmit={savePoll}>
					<input
						type='text'
						defaultValue='Poll title'
						onChange={e => {
							updatePollHeader('pollTitle', e.target.value);
						}}
						minLength={1}
					/>

					{questionFields.map((field, i) =>
						<AddQuestion
							key={i}
							questionEntityNumber={i}
							updateFunc={updateQuestionEntities}
							removeQuestionFunc={removeQuestion}
							newQuestionFunc={newQuestion}
							questionFields={questionFields}
						/>)}
					<Button
						text={'Upload the poll'}
						roundness={99}
						disabled={false}
						size={3}
						color={'var(--color-title)'}
						width={100}
					/>
				</form>
			</div>
		</>
	);
};

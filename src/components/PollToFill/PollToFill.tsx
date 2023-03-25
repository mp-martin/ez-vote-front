import React, {type FormEvent, useEffect, useState} from 'react';
import './PollToFill.css';
import {type CompletePoll, type SuccessMsgVote} from 'types';
import {OpenAnswerList} from './OpenAnswerList';
import {ClosedAnswerList} from './ClosedAnswerList';

export const PollToFill = () => {
	const [pollData, setPollData] = useState<CompletePoll>({
		pollHeader: {
			pollTitle: '',
			pollId: '',
		},
		pollBody: [],
	});

	const [allAnswers, setAllAnswers] = useState<string[][]>([]);
	const [loading, setLoading] = useState(false);
	const [alreadyVoted, setAlreadyVoted] = useState(false);
	const [id, setId] = useState('');

	useEffect(() => {
		(async () => {
			const res = await fetch('http://localhost:3001/poll/2fb0f6c3-f276-4b41-b10d-96bdf9000ed1');
			const pollData = await res.json() as CompletePoll;
			setPollData(pollData);
		})();
	}, []);

	const updateAllAnswers = (newAnswerPack: string[], index: number) => {
		const updatedAllAnswers = [...allAnswers];
		updatedAllAnswers[index] = newAnswerPack;
		setAllAnswers(updatedAllAnswers);
	};

	const vote = async (e: FormEvent) => {
		e.preventDefault();

		setLoading(true);

		try {
			const res = await fetch('http://localhost:3001/poll', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					pollId: pollData.pollHeader.pollId,
					answers: allAnswers.flat(),
				}),
			});

			const data = await res.json() as SuccessMsgVote;
			if (!data.success) {
				setAlreadyVoted(true);
				return;
			}

			setId(data.pollId);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <h2>Sending poll... </h2>;
	}

	if (alreadyVoted) {
		return <h2>You have already voted in this poll!</h2>;
	}

	if (id) {
		return <>
			<p>Your answers to <strong>{pollData.pollHeader.pollTitle}</strong> have been sent!</p>
			<p>To see the results, go to this link: <a href='#'>https://ezvote/poll/${id}</a></p>
		</>;
	}

	return (
		<>
			<div className='PollToFill__pollHeader'>
				<h1>{pollData.pollHeader.pollTitle}</h1>
				<p>An EZ vote poll</p>
			</div>

			<form onSubmit={vote}>
				{pollData.pollBody.map((answerCluster, index) =>
					<div key={answerCluster.questionHeader.questionId} className='PollToFill__questionAndAnswerBlocksWrapper'>
						<div className='PollToFill__questionAndAnswerBlock'>
							<div className='' key={index}><p>{answerCluster.questionHeader.questionBody}</p></div>
							{answerCluster.questionHeader.questionType === 'closed'
								? <ClosedAnswerList
									questionNumber={index}
									questionId={answerCluster.questionHeader.questionId}
									answers={answerCluster.answers}
									handleUpdateAnswers={updateAllAnswers}
								/>
								: <OpenAnswerList
									questionNumber={index}
									questionId={answerCluster.questionHeader.questionId}
									answers={answerCluster.answers}
									handleUpdateAnswers={updateAllAnswers}
								/>

							}
						</div>
					</div>,
				)}<button>Vote</button></form>
		</>
	);
};

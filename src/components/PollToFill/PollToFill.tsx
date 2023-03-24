import React, {type FormEvent, useEffect, useState} from 'react';
import './PollToFill.css';
import {AnswerPool, type CompletePoll} from 'types';

export const PollToFill = () => {
	const [pollData, setPollData] = useState<CompletePoll>({
		pollHeader: {
			pollTitle: '',
			pollId: '',
		},
		pollBody: [],
	});

	// Const [closedAnswer];

	useEffect(() => {
		(async () => {
			const res = await fetch('http://localhost:3001/poll/b8b73b76-b1c5-4ff5-a8f0-04894235b4c6');
			const pollData = await res.json() as CompletePoll;
			setPollData(pollData);
		})();
	}, []);

	const handleClosedQuestion = (e: FormEvent) => {

	};

	return (
		<>
			<div className='PollToFill__pollHeader'>
				<h1>{pollData.pollHeader.pollTitle}</h1>
				<p>An EZ vote poll</p>
			</div>

			<form>{pollData.pollBody.map((answerCluster, index) =>
				<div key={index} className='PollToFill__questionAndAnswerBlocksWrapper'>
					<div className='PollToFill__questionAndAnswerBlock' key={index}>
						<div className='' key={index}><p>{answerCluster.questionHeader.questionBody}</p></div>

						{answerCluster.answers.map((answer, index) =>
							<label className='PollToFill__singleAnswer' key={answer.answerId}>
								<input
									type={answerCluster.questionHeader.questionType === 'closed' ? 'radio' : 'checkbox'}
									name={answerCluster.questionHeader.questionId}
									onChange={handleClosedQuestion}
								/>
								&nbsp;{answer.answerBody}
							</label>)}
					</div>
				</div>,
			)}</form>

		</>

	);
};

import React, {useEffect, useState} from 'react';
import './PollToFill.css';
import {type CompletePoll} from 'types';
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

	useEffect(() => {
		(async () => {
			const res = await fetch('http://localhost:3001/poll/b8b73b76-b1c5-4ff5-a8f0-04894235b4c6');
			const pollData = await res.json() as CompletePoll;
			setPollData(pollData);
		})();
	}, []);

	const updateAllAnswers = (newAnswerPack: string[], index: number) => {
		const updatedAllAnswers = [...allAnswers];
		updatedAllAnswers[index] = newAnswerPack;
		setAllAnswers(updatedAllAnswers);
	};

	return (
		<>
			<div className='PollToFill__pollHeader'>
				<h1>{pollData.pollHeader.pollTitle}</h1>
				<p>An EZ vote poll</p>
			</div>

			<form>{pollData.pollBody.map((answerCluster, index) =>
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
			)}</form>
		</>
	);
};

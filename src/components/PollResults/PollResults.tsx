import React, {useEffect, useState} from 'react';
import './PollResults.css';
import {type CompletePoll} from 'types';
import {AnswerResultsList} from './AnswerResultsList';
import {useParams} from 'react-router-dom';

type PollParams = {
	id: string;
};
export const PollResults = () => {
	const [pollData, setPollData] = useState<CompletePoll>({
		pollHeader: {
			pollTitle: '',
			pollId: '',
		},
		pollBody: [],
	});

	const [loading, setLoading] = useState(false);
	const {id} = useParams<PollParams>();

	if (!id) {
		throw new Error('Bad poll id');
	}

	useEffect(() => {
		setLoading(true);
		(async () => {
			const res = await fetch(`http://localhost:3001/poll/${id}`);
			const pollData = await res.json() as CompletePoll;
			setPollData(pollData);
		})();

		setLoading(false);
	}, []);

	if (loading) {
		return <h2>Loading poll results... </h2>;
	}

	return (
		<>
			<div className='PollResults__resultsWrapper'>
				<div className='PollToFill__pollHeader'>
					<h1>{pollData.pollHeader.pollTitle}</h1>
					<p>An EZ vote poll results</p>
				</div>
				{pollData.pollBody.map((answerCluster, index) =>
					<div key={answerCluster.questionHeader.questionId}
						className='PollToFill__questionAndAnswerBlocksWrapper'>
						<div className='PollToFill__questionAndAnswerBlock'>
							<div className='PollResults__questionTitle' key={index}>
								<p>{answerCluster.questionHeader.questionBody}</p></div>
							<AnswerResultsList
								questionNumber={index}
								answers={answerCluster.answers}
							/>
						</div>
					</div>,
				)}</div>
		</>
	);
};

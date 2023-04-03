import React, {useEffect, useState} from 'react';
import './PollResults.css';
import {type CompletePoll} from 'types';
import {AnswerResultsList} from './AnswerResultsList';
import {useParams} from 'react-router-dom';
import {Spinner} from '../common/Spinner/Spinner';

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

	const [loading, setLoading] = useState(true);
	const {id} = useParams<PollParams>();

	if (!id) {
		throw new Error('Bad poll id');
	}

	useEffect(() => {
		setLoading(true);
		try {
			(async () => {
				const res = await fetch(`http://localhost:3001/poll/${id}`);
				const pollData = await res.json() as CompletePoll;
				setPollData(pollData);
				setLoading(false);
			})();
		} catch (e) {
			console.log(e);
		}
	}, []);

	if (loading) {
		return <Spinner/>;
	}

	return (

		<div className='PollResults__resultsWrapper'>
			<div className='PollToFill__pollHeader'>
				<h1>{pollData.pollHeader.pollTitle}</h1>
				<p>An EZ vote poll – results</p>
			</div>
			{pollData.pollBody.map((answerCluster, index) =>
				<div key={answerCluster.questionHeader.questionId}
					className='PollResults__questionAndAnswerBlocksWrapper'>
					<div className='PollResults__questionAndAnswerBlock'>
						<div className='PollResults__question-header'>
							<p className='PollResults__question-number'>Question {index + 1}</p>
							<h2 className='PollResults__questionTitle'>{answerCluster.questionHeader.questionBody}</h2>
						</div>
						<div className='PollResults_answer-list'><AnswerResultsList
							questionNumber={index}
							answers={answerCluster.answers}
						/></div>
					</div>
				</div>,
			)}</div>
	);
};

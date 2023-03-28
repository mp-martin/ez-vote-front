import React from 'react';
import {type AnswerEntity} from 'types';

type Props = {
	answers: AnswerEntity[];
	questionNumber: number;
};

export const AnswerResultsList = (props: Props) => {
// Meatcode
	const voteValues: number[] = props.answers.map(el => el.votes);

	const toPercentages = (numbers: number[]): string[] => {
		const largestNumber = Math.max(...numbers);
		return numbers.map(number => `${number / largestNumber * 100}%`);
	};

	const percentages = toPercentages(voteValues);

	return (<>
		{props.answers.map((answer, index: number) =>

			<div key={index} className='PollResults__singleResult'>
				<span className='PollResults__answerLabel'><b>{answer.answerBody}</b>: {answer.votes}</span><div className='PollResults__chart__bar' style={{width: `${percentages[index]}`}}>
				</div>
			</div>,

		)}
	</>);
};

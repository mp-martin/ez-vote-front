import React from 'react';
import {type AnswerEntity} from 'types';
import {FaVoteYea} from 'react-icons/fa';

type Props = {
	answers: AnswerEntity[];
	questionNumber: number;
};

export const AnswerResultsList = (props: Props) => {
	const voteValues: number[] = props.answers.map(el => el.votes);
	const largestNumber = Math.max(...voteValues);
	const percentages = voteValues.map(number => (number / largestNumber * 100).toFixed(2));

	return (<>
		{props.answers.map((answer, index: number) =>

			<div key={index} className='PollResults__singleResult'>
				<p className='PollResults__answerLabel'>{answer.answerBody}</p>
				<div className='PollResults__chart__bar' style={{width: `${percentages[index]}%`}}>
				</div>
				<div style={{display: 'flex', alignItems: 'center'}}><FaVoteYea
					style={{marginLeft: '1em', marginRight: '0.2em', maxWidth: 'unset'}}
					size={'0.7em'}
					color={'var(--color-ezpink)'}/>
				<span style={{
					fontSize: '0.8em',
					fontWeight: 900,
					display: 'inherit',
				}}>{answer.votes}&nbsp;</span>
				<span style={{
					fontSize: '0.7em',
					fontWeight: '700',
					opacity: 0.7,
				}}>({isNaN(Number(percentages[index])) ? 0 : percentages[index]}%)</span></div>
			</div>,
		)}
	</>);
};

import React, {useEffect, useState} from 'react';
import {type AnswerEntity} from 'types';
import './PollToFill.css';

type Props = {
	answers: AnswerEntity[];
	handleUpdateAnswers: (answer: string[], index: number) => void;
	questionId: string;
	questionNumber: number;
};

export const ClosedAnswerList = (props: Props) => {
	const [answer, setAnswer] = useState<string[]>([]);

	const handleSetAnswers = (theAnswer: string) => {
		const newAnswer: string[] = [];
		newAnswer[0] = theAnswer;
		setAnswer(newAnswer);
	};

	useEffect(() => {
		props.handleUpdateAnswers(answer, props.questionNumber);
	}, [answer]);

	return (<>
		{props.answers.map(answer =>
			<label className='PollToFill__single-answer' key={answer.answerId}>
				<input
					value={answer.answerId}
					type='radio'
					name={props.questionId}
					onChange={e => {
						handleSetAnswers(e.target.value);
					}}
				/>
                &nbsp;{answer.answerBody}
			</label>)}
	</>);
};

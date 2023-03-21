import React, {useState} from 'react';
import './AddPoll.css';
import {AddQuestion} from '../AddQuestion/AddQuestion';

type Answer = {
	answerBody: string;
};

type QuestionHeader = {
	questionBody: string;
	questionType: string;
};

type QuestionEntity = {
	questionHeader: QuestionHeader;
	answers: Answer[];
};

type PollHeaderEntity = {
	pollTitle: string;
	// eslint-disable-next-line @typescript-eslint/ban-types
	pollOwner: string | null;
};

type PollEntity = {
	pollHeader: PollHeaderEntity;
	pollBody: QuestionEntity[];
};

export const AddPoll = () => {
	const [pollData, setPollData] = useState<PollEntity>({
		pollHeader: {
			pollTitle: 'New Poll',
			pollOwner: null,
		},
		pollBody: [],
	});

	const updatePoll = (question: QuestionEntity) => {
		setPollData(data => {
			data.pollBody.push(question);
			return {
				...data,
			};
		});
	};

	// Const questionsHandler = () => {
	// };

	return (
		<div className='addPoll__container'>
			<h1>{'It\'s time to create a Poll!'}</h1>
			<form>
				<AddQuestion/>
				<AddQuestion/>
			</form>

		</div>);
};

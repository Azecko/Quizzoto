import * as React from 'react';
import { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import fetchTimeline from '../../lib/fetchTimeline';

export default function QuizzTimeline({ quizzId, questionId, userAnswer, result }) {
	const [questions, setQuestions] = useState();

	useEffect(() => {
		const getData = async () => {
			console.log('fetch');
			const jsonData = await fetchTimeline(quizzId, 'timeline');
			setQuestions(jsonData);
			console.log(jsonData);
		};
		getData();
	}, [quizzId]);

	if (result != undefined) {
		return result ? (
			<Timeline
				sx={{
					[`& .${timelineItemClasses.root}:before`]: {
						flex: 0,
						padding: 0,
					},
				}}>
				{result.results.map((question, index) => (
					<TimelineItem key={index}>
						<TimelineSeparator>
							<TimelineDot color={question.answeredCorrectly ? 'success' : 'error'} />
							{index !== result.results.length - 1 && <TimelineConnector />}
						</TimelineSeparator>
						<TimelineContent>{question.questionTitle}</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		) : (
			<h1>Loading...</h1>
		);
	} else {
	return questions ? (
		<Timeline
			sx={{
				[`& .${timelineItemClasses.root}:before`]: {
					flex: 0,
					padding: 0,
				},
			}}>
			{questions.questions.map((question, index) => (
				<TimelineItem key={index}>
					<TimelineSeparator>
							<TimelineDot color={index === questionId - 1 ? 'secondary' : userAnswer[index + 1] != undefined ? 'success' : 'info'} />
						{index !== questions.questions.length - 1 && <TimelineConnector />}
					</TimelineSeparator>
					<TimelineContent>{question.questionTitle}</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	) : (
		<h1>Loading...</h1>
	);
	}
}

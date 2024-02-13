import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function QuizzTimeline({ quizz }) {
	const { questions } = quizz;
	return (
		<Timeline
			sx={{
				[`& .${timelineItemClasses.root}:before`]: {
					flex: 0,
					padding: 0,
				},
			}}>
			{questions.map((question, index) => (
				<TimelineItem key={index}>
					<TimelineSeparator>
						<TimelineDot />
						{index !== questions.length - 1 && <TimelineConnector />}
					</TimelineSeparator>
					<TimelineContent>{question.questionTitle}</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
}

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Rank from './rank';

const BoxStyle = {
	borderRadius: '30px',
	fontWeight: '400',
	fontSize: '1.2rem',
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
	padding: '2rem',
	height: '75vh',
	width: '94%',
	color: '#696f79',
	paddingTop: '0px',
	paddingLeft: '2.5rem',
};

const ImgStyle = {
	borderRadius: '30px',
	width: 'auto',
	height: '300px',
	boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
};

const TextStyle = {
	fontSize: '1.2rem',
};

const BtnStyle = {
	appearance: 'button',
	backfaceVisibility: 'hidden',
	backgroundColor: '#405cf5',
	borderRadius: '30px',
	borderWidth: '0',
	boxShadow: 'rgba(50, 50, 93, .1) 0 0 0 1px inset,rgba(50, 50, 93, .1) 0 2px 5px 0,rgba(0, 0, 0, .07) 0 1px 1px 0',
	boxSizing: 'border-box',
	color: '#fff',
	cursor: 'pointer',
	fontSize: '105%',
	height: '65px',
	lineHeight: '1.15',
	margin: '110px 0 0',
	outline: 'none',
	overflow: 'hidden',
	padding: '20px 65px',
	position: 'relative',
	textAlign: 'center',
	textTransform: 'none',
	transform: 'translateZ(0)',
	transition: 'all .2s,box-shadow .08s ease-in',
	userSelect: 'none',
	width: '100%',
};

const QuizzInfo = ({ quizzInfo }) => {
	console.log(quizzInfo);
	return (
		<table>
			<tbody>
				{Object.keys(quizzInfo).map((key, index) => (
					<tr key={index}>
						<td style={{ fontWeight: '600', padding: '10px 0px', fontSize: '1.5rem' }}>{key}:</td>
						<td style={{ paddingLeft: '40px' }}>
							{quizzInfo[key]} {quizzInfo[key] == 'Points' ? 'Points' : ''}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default function Welcome({ quizz }) {
	const router = useRouter();

	const handleClick = () => {
		const query = { ...router.query };

		query.q = '1';

		router.push({
			pathname: router.pathname,
			query: query,
		});
	};

	console.log(quizz);
	return (
		<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
			<Box gridColumn="span 2"></Box>
			<Box gridColumn="span 10" style={BoxStyle}>
				{quizz ? (
					<>
						<h1 style={{ marginBottom: '0px' }}>{quizz.quizzTitle}</h1>
						<span style={TextStyle}>Read the following instructions</span>
						<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
							<Box gridColumn="span 8">
								<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} style={{ marginTop: '15px' }}>
									<Box gridColumn="span 6">
										<div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '30px', overflow: 'hidden' }}>
											<img src={quizz.quizzImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
										</div>
									</Box>

									<Box gridColumn="span 6" style={{ marginLeft: '25px' }}>
										<QuizzInfo quizzInfo={quizz.quizzInfo} />
									</Box>
								</Box>
								<h3> Instructions</h3>
								<p>{quizz.quizzDescription}</p>
								<Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '40%' }}>
									<Link href={{ pathname: router.pathname, query: { ...router.query, q: '1' } }} passHref style={{ maxWidth: '50%', alignSelf: 'flex-end' }}>
										<Button type="button" onClick={handleClick} variant="contained" style={BtnStyle}>
											Start
										</Button>
									</Link>
								</Box>
							</Box>
							<Box gridColumn="span 4">
								<Rank quizzId={'def'} />
							</Box>
						</Box>
					</>
				) : (
					<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', verticalAlign: 'center', height: '100%' }}>
						<CircularProgress />
					</Box>
				)}
			</Box>
		</Box>
	);
}

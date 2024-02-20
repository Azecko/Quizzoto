import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fetchResult from '../../../lib/fetchResult';
import Result from '@/components/result';
import QuizzTimeline from '@/components/quizzTimeline';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Quizz() {
	const [result, setResult] = useState();

	const router = useRouter();

	useEffect(() => {
		if (!router.query.id) {
			return;
		}

		const getData = async () => {
			const jsonData = await fetchResult(router.query.id);
			setResult(jsonData);
		};
		getData();
	}, [router.query.id]);

	return (
		<>
			<Head>
				<title>Quizzoto - Quizz</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
				<link rel="stylesheet" href="/result.css" />
			</Head>
			<main>
				{result?.statusCode ? (
					<p>Merci de fournir un id de résultat correct dans l'URL.</p>
				) : result ? (
					<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
						<Box gridColumn="span 12" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
							<Box gridColumn="span 10">
								<h1>{result.quizz.title}</h1>
								<h2>{result.quizz.description}</h2>
							</Box>
							<Box gridColumn="span 2">
								<h2>Score total : {result.score}</h2>
							</Box>
						</Box>
						<Box gridColumn="span 8">
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Question</TableCell>
											<TableCell align="right">Correct</TableCell>
											<TableCell align="right">Points</TableCell>
											<TableCell align="right">Votre réponse</TableCell>
											<TableCell align="right">Réponse correcte</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{result.results.map((e, index) => (
											<TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component="th" scope="row">
													{e.questionTitle}
												</TableCell>
												<TableCell align="right">{e.answeredCorrectly ? '✅' : '❌'}</TableCell>
												<TableCell align="right">{e.points}</TableCell>
												<Result result={e} />
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
						<Box gridColumn="span 4">
							<QuizzTimeline quizzId={router.query.id} result={result} />
						</Box>
					</Box>
				) : (
					<h2>Chargement...</h2>
				)}
			</main>
		</>
	);
}
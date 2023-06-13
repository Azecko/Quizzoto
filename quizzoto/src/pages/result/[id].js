import { FormControl, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetchResult from "../../../lib/fetchResult";

export default function Quizz() {
  const [result, setResult] = useState()

  const router = useRouter()

  useEffect(() => {
    if(!router.query.id)  {
      return;
    }

    const getData = async () => {
      const jsonData = await fetchResult(router.query.id);
      setResult(jsonData)
    }
    getData()
  }, [router.query.id]);
  return (
    <>
      <Head>
        <title>Quizzoto - Quizz</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <main>
        {
          result?.statusCode ? (
            <p>Merci de fournir un id de résultat correct dans l'URL.</p>
          ) : result ? (
            <div>
              <h1>{result.quizz.title}</h1>
              <h2>Score total : {result.score}</h2>
              <h2>Résultats</h2>
              {result.results.map(e => {
                return (
                  <div>
                    <h3>{e.questionTitle} {e.answeredCorrectly ? '✅' : '❌'} {e.points} score</h3>
                    {e.answeredCorrectly ? (
                      <h4>Votre réponse : {typeof(e.userAnswer) == 'string' ? e.userAnswer : (
                        <ul>
                          {e.userAnswer.map(e => <li>{e}</li>)}
                        </ul>
                        )}
                      </h4>
                    ) : (
                      <div>
                        <h4>Votre réponse : {typeof(e.userAnswer) == 'string' ? e.userAnswer : (
                          <ul>
                            {e.userAnswer.map(e => <li>{e}</li>)}
                          </ul>
                          )}
                        </h4>
                        <h4>Réponse correcte : {typeof(e.correctAnswer) == 'string' ? e.correctAnswer : (
                            <ul>
                              {e.correctAnswer.map(e => <li>{e}</li>)}
                            </ul>
                          )}
                        </h4>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <h2>Chargement...</h2>
          )
        }

      </main>
    </>
  );
}

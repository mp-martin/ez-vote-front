import React, { useEffect, useState } from 'react'
import './PollResults.css'
import { type CompletePoll } from 'types'
import { AnswerResultsList } from './AnswerResultsList'
import { useParams } from 'react-router-dom'
import { Spinner } from '../common/Spinner/Spinner'
import { apiUrl } from '../../config/api'
import { ErrorPage } from '../common/ErrorPage/ErrorPage'

export const PollResults = () => {
  const [fetchFailed, setFetchFailed] = useState(false)
  const [pollData, setPollData] = useState<CompletePoll>({
    pollHeader: {
      pollTitle: '',
      pollId: '',
      pollOwner: null
    },
    pollBody: []
  })

  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  if (id == null) {
    throw new Error('Bad poll id')
  }

  useEffect(() => {
    void (async () => {
      setLoading(true)
      try {
        const res = await fetch(`${apiUrl}/poll/${id}`)
        if (!res.ok) {
          setLoading(false)
          setFetchFailed(true)
        }
        const pollData = await res.json() as CompletePoll
        setPollData(pollData)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])

  if (loading) {
    return <Spinner/>
  }

  if (fetchFailed) {
    return <ErrorPage title='Welp, welp' body={'Can\'t find that resource'}/>
  }

  return (

        <div className='PollResults__resultsWrapper'>
            <div className='PollToFill__pollHeader'>
                <h1>{pollData.pollHeader.pollTitle}</h1>
                <p>An EZ Vote poll – results</p>
            </div>
            {pollData.pollBody.map((answerCluster, index) =>
                <div key={answerCluster.questionHeader.questionId}
                     className='PollResults__questionAndAnswerBlocksWrapper'>
                    <div className='PollResults__questionAndAnswerBlock'>
                        <div className='PollResults__question-header'>
                            <p className='PollResults__question-number'>Question {index + 1}</p>
                            <h2 className='PollResults__questionTitle'>{answerCluster.questionHeader.question}</h2>
                        </div>
                        <div className='PollResults_answer-list'><AnswerResultsList
                            questionNumber={index}
                            answers={answerCluster.answers}
                        /></div>
                    </div>
                </div>
            )}</div>
  )
}

import React, { type FormEvent, useContext, useEffect, useState } from 'react'
import './PollToFill.css'
import { type CompletePoll, type SuccessMsgVote } from 'types'
import { OpenAnswerList } from './OpenAnswerList'
import { ClosedAnswerList } from './ClosedAnswerList'
import { useParams } from 'react-router-dom'
import { MessageContext } from '../../contexts/message.context'
import { Button } from '../common/Button/Button'
import { Spinner } from '../common/Spinner/Spinner'
import { PollToFillSuccess } from './PollToFillSuccess'
import { apiUrl } from '../../config/api'
import { ErrorPage } from '../common/ErrorPage/ErrorPage'

export const PollToFill = () => {
  const [pollData, setPollData] = useState<CompletePoll>({
    pollHeader: {
      pollTitle: '',
      pollId: '',
      pollOwner: null
    },
    pollBody: []
  })

  const [allAnswers, setAllAnswers] = useState<string[][]>([[]])
  const [loading, setLoading] = useState(false)
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  const [fetchFailed, setFetchFailed] = useState(false)
  const [id, setId] = useState('')
  const { id: pollId } = useParams()
  const { setShowMessage, setMessageContent, setMessageTimer, setMessageType } = useContext(MessageContext)

  if (pollId == null) {
    throw new Error('Bad poll id')
  }

  useEffect(() => {
    void (async () => {
      setLoading(true)
      try {
        const res = await fetch(`${apiUrl}/poll/${pollId}`)
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

  const updateAllAnswers = (newAnswerPack: string[], index: number): void => {
    const updatedAllAnswers = [...allAnswers]
    updatedAllAnswers[index] = newAnswerPack
    setAllAnswers(updatedAllAnswers)
  }

  const vote = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    console.log(allAnswers)

    if (
      allAnswers.find(item => item[0] === undefined) != null) {
      setMessageTimer(2)
      setMessageType('error')
      setMessageContent('Answer all the questions, please')
      setShowMessage(true)
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${apiUrl}/poll`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          pollId: pollData.pollHeader.pollId,
          answers: allAnswers.flat()
        })
      })

      const data = await res.json() as SuccessMsgVote
      if (!data.success) {
        setAlreadyVoted(true)
        return
      }

      setId(data.pollId)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Spinner/>
  }

  if (fetchFailed) {
    return <ErrorPage title='Welp, welp' body={'Can\'t find that resource'}/>
  }

  if (alreadyVoted) {
    return <h2>You have already voted in this poll!</h2>
  }

  if (id !== '') {
    return <PollToFillSuccess id={id} title={pollData.pollHeader.pollTitle}/>
  }

  return (
        <div className='PollToFill__wrapper'>
            <div className='PollToFill__pollHeader'>
                <h1>{pollData.pollHeader.pollTitle}</h1>
                <p>An EZ Vote poll</p>
            </div>

            <form onSubmit={vote}>
                {pollData.pollBody.map((answerCluster, index) =>
                    <div key={answerCluster.questionHeader.questionId}
                         className='PollToFill__questionAndAnswerBlocksWrapper'>
                        <div className='PollToFill__questionAndAnswerBlock'>
                            <div className='PollToFill__question-header'><p
                                className='PollToFill__question-number'>Question {index + 1}</p>
                                <h2 className='PollToFill__question-title'
                                    key={index}>{answerCluster.questionHeader.question}</h2></div>
                            <div
                                className='PollToFill__answer-list'>{answerCluster.questionHeader.questionType === 'closed'
                                  ? <ClosedAnswerList
                                    questionNumber={index}
                                    questionId={answerCluster.questionHeader.questionId}
                                    answers={answerCluster.answers}
                                    handleUpdateAnswers={updateAllAnswers}
                                />
                                  : <OpenAnswerList
                                    questionNumber={index}
                                    questionId={answerCluster.questionHeader.questionId}
                                    answers={answerCluster.answers}
                                    handleUpdateAnswers={updateAllAnswers}
                                />
                            }</div>
                        </div>
                    </div>
                )}
                <Button
                    text={'Cast my vote!'}
                    roundness={99}
                    disabled={false}
                    size={2}
                    color={'var(--color-title)'}
                    width={100}
                />
            </form>
        </div>
  )
}

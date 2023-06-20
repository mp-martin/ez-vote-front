import React, { useEffect, useState } from 'react'
import { type AnswerEntity } from 'types'
import './PollToFill.css'

interface Props {
  answers: AnswerEntity[]
  handleUpdateAnswers: (answers: string[], index: number) => void
  questionId: string
  questionNumber: number
}

export const OpenAnswerList = (props: Props) => {
  const [answers, setAnswers] = useState<string[]>([])

  const [checkedState, setCheckedState] = useState<boolean[]>(new Array(props.answers.length).fill(false))

  const handleOnChange = (position: number): void => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState)
    const trueIndexes = updatedCheckedState.map((item, index) => item ? index : null).filter(number => number !== null) as number[]
    const answersBasedOnIndexes = trueIndexes.map(number => props.answers[number].answerId) as string[]

    setAnswers(answersBasedOnIndexes)
  }

  useEffect(() => {
    props.handleUpdateAnswers(answers, props.questionNumber)
  }, [answers])

  return (<>
        {props.answers.map((answer, index) =>
            <label className='PollToFill__single-answer' key={answer.answerId}>
                <input
                    value={answer.answer}
                    type='checkbox'
                    checked={checkedState[index]}
                    name={props.questionId}
                    onChange={() => {
                      handleOnChange(index)
                    }}
                />
                &nbsp;{answer.answer}
            </label>)}
    </>)
}

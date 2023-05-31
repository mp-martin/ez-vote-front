import React from 'react'
import './AddQuestion.css'
import { TiArrowSortedDown } from 'react-icons/ti'
import { useFieldArray, useFormContext } from 'react-hook-form'

export const AddQuestion = () => {
  const { register, getValues } = useFormContext()
  const { fields, insert, remove } = useFieldArray({
    name: 'pollBody'
  })

  return (
      <>
      {fields.map((item, index) => {
        return (
                  <div key={item.id} className='addQuestion__questionWrapper'>
                      <div className='addQuestion__topbar'><p
                          className='addQuestion__topbar_q-number'>Question nr { index + 1 }</p>
                          <div className='addQuestion__topbar_q-type'><label>
                              <select
                                  defaultValue='closed'
                                  {...register(`pollBody.${index}.questionType` as const)}
                              >
                                  <option value='open'>Open (multiple choice)</option>
                                  <option value='closed'>Closed (single choice)</option>
                              </select><TiArrowSortedDown size={'1.3em'} className='addQuestion__topbar_q-type_arrow'/>
                          </label></div>
                      </div>
                      <div className='addQuestion__questionBox'>
                          <div className='addQuestion__questionInput'>

                              <label>
                                  <input
                                      {...register(`pollBody.${index}.questionTitle` as const)}
                                      placeholder='Type your question here'
                                      minLength={1}
                                  />
                              </label>

                          </div>

                          <p>Answers</p>
                          {/* {answerFields.map((field, i) => <label key={i}><AddAnswer */}
                          {/*    answerNumber={i} */}
                          {/*    answerFields={answerFields} */}
                          {/*    updateFunc={updateAnswers} */}
                          {/*    newAnswerFunc={newAnswer} */}
                          {/*    removeAnswerFunc={removeAnswer} */}
                          {/*    answers={answers} */}
                          {/* /></label>)} */}

                      </div>
                      <div className='addQuestion__bottom-bar'>
                          <button type="button"
                                  className='addQuestion__rem-q_button'
                                  onClick={() => { remove(index) }}
                                  disabled={getValues('pollBody').length === 1}>Remove
                          </button>
                          <button type="button" className='addQuestion__add-q_button'
                                  onClick={() => {
                                    insert(index + 1, {
                                      questionType: 'closed',
                                      questionTitle: 'Your question goes here',
                                      answers: ['Your first answer goes here']
                                    }, { focusName: `pollBody.${index + 1}.questionTitle` })
                                  }}>Add
                          </button>
                      </div>
                  </div>
        )
      })}
      </>
  )
}

import React from 'react'
import './AddQuestion.css'
import { TiArrowSortedDown } from 'react-icons/ti'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { AddAnswer } from '../AddAnswer/AddAnswer'

export const AddQuestion = () => {
  const { register, getValues, formState: { errors } } = useFormContext()
  const { fields, insert, remove } = useFieldArray({
    name: 'pollBody'
  })

  return (
        <>
            {fields.map((item, index) => {
              return (
                    <div key={item.id} className='addQuestion__questionWrapper'>
                        <div className='addQuestion__topbar'><p
                            className='addQuestion__topbar_q-number'>Question nr {index + 1}</p>
                            <div className='addQuestion__topbar_q-type'><label>
                                <select
                                    defaultValue='closed'
                                    {...register(`pollBody.${index}.questionType` as const)}>
                                    <option value='open'>Open (multiple choice)</option>
                                    <option value='closed'>Closed (single choice)</option>
                                </select><TiArrowSortedDown size={'1.3em'}
                                                            className='addQuestion__topbar_q-type_arrow'/>
                            </label></div>
                        </div>
                        <div className='addQuestion__questionBox'>
                            <div className='addQuestion__questionInput'>
                                <label>
                                    <input
                                        {...register(`pollBody.${index}.question` as const)}
                                        placeholder='Type your question here'
                                        minLength={1}
                                        style={((errors as any).pollBody?.[index]?.question) != null ? { backgroundColor: '#ffd1d1' } : {}}/>
                                </label>
                            </div>

                            <p>Answers</p>
                            <AddAnswer nestIndex={index}/>

                        </div>
                        <div className='addQuestion__bottom-bar'>
                            <button type="button"
                                    className='addQuestion__rem-q_button'
                                    onClick={() => {
                                      remove(index)
                                    }}
                                    disabled={getValues('pollBody').length === 1}>Remove
                            </button>
                            <button type="button" className='addQuestion__add-q_button'
                                    onClick={() => {
                                      insert(index + 1, {
                                        questionType: 'closed',
                                        question: '',
                                        answers: [
                                          { answer: '' }
                                        ]
                                      }, { focusName: `pollBody.${index + 1}.question` })
                                    }}>
                                Add
                            </button>
                        </div>
                    </div>
              )
            })}
        </>
  )
}

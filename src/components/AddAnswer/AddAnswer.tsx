import React from 'react'
import './AddAnswer.css'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { AiFillMinusCircle } from 'react-icons/ai'
import { useFieldArray, useFormContext } from 'react-hook-form'

interface Props {
  nestIndex: number
}

export const AddAnswer = ({ nestIndex }: Props) => {
  const { register, getValues, formState: { errors } } = useFormContext()
  const { fields, insert, remove } = useFieldArray({
    name: `pollBody[${nestIndex}].answers` as 'pollBody.0.answers'
  })

  return (<>
        {fields.map((item, k) => {
          const isThereOnlyOneAnswer = getValues(`pollBody.${nestIndex}.answers`).length === 1
          return (
                <div key={item.id} className='addAnswer__answer-row'>
                    <input
                        className='addAnswer__answer-field'
                        placeholder='An answer'
                        {...register(`pollBody.${nestIndex}.answers.${k}.answer` as const)}
                        style={((errors as any).pollBody?.[nestIndex]?.answers?.[k].answer) != null ? { backgroundColor: '#ffd1d1' } : {}}
                        minLength={1}/>
                    <button type="button"
                            className='addAnswer__rem-button'
                            onClick={() => {
                              remove(k)
                            }}
                            disabled={isThereOnlyOneAnswer}>
                        <AiFillMinusCircle color={isThereOnlyOneAnswer ? '#EDEDED' : 'var(--color-ezpink)'}
                                           size={'2.8em'}/>
                    </button>
                    <button
                        type="button"
                        className='addAnswer__add-button'
                        onClick={() => {
                          insert(k + 1, { answer: '' }, { focusName: `pollBody.${nestIndex}.answers.${k + 1}.answer` })
                        }}
                        disabled={false}>
                        <BsFillPlusCircleFill color={'var(--color-ezgreen)'} size={'2.5em'}/>
                    </button>
                </div>
          )
        })}
    </>)
}

import React from 'react'
import { FaCopy } from 'react-icons/fa'
import { useCopyToClipboard } from '../../hooks/use.copy.to.clipboard'
import { apiUrl } from '../../config/api'

interface Props {
  id: string
  title: string
}

export const AddPollSuccess = (props: Props) => {
  const [value, copy] = useCopyToClipboard()
  const location = window.location.hostname

  return (
        <div className='addPoll__container'><h1>Poll &apos;<span
            style={{ color: 'var(--color-ezpink)' }}>{props.title}</span>&apos; has
            been successfully uploaded!
        </h1>

            <div className='addPoll__final-link'><p>Share this link with others so they can start voting:</p>
                <div className='addPoll__final-link_address'>
                    <a href={`${apiUrl}/poll/${props.id}`}>{`${apiUrl}/poll/${props.id}`}</a>
                    <div className='addPoll__copy-to-clipboard'><p>Copy to clipboard:</p>
                        <FaCopy
                            size={'2em'}
                            className='addPoll__copy-button'
                            onClick={async () => await copy(`${apiUrl}/poll/${props.id}`)}/>
                    </div>
                </div>
            </div>

            <div className='addPoll__final-link'><p>To see the results, go to this link:</p>
                <div className='addPoll__final-link_address'>
                    <a href={`${apiUrl}/poll/${props.id}/results`}>{`${apiUrl}/poll/${props.id}/results`}</a>
                    <div className='addPoll__copy-to-clipboard'><p>Copy to clipboard:</p>
                        <FaCopy size={'2em'}
                                className='addPoll__copy-button'
                                onClick={async () => await copy(`${apiUrl}/poll/${props.id}/results`)}/>
                    </div>
                </div>
            </div>
        </div>
  )
}

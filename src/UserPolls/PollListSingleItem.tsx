import { FaCopy } from 'react-icons/fa'
import React, { useContext } from 'react'
import { useCopyToClipboard } from '../hooks/use.copy.to.clipboard'
import { MessageContext } from '../contexts/message.context'

interface Props {
  pollId: string
  pollTitle: string
  createdAt: string
  pollIndex: number
}

export const PollListSingleItem = ({ pollId, pollTitle, createdAt, pollIndex }: Props) => {
  const location = window.location.hostname
  const [value, copy] = useCopyToClipboard()
  const { setShowMessage, setMessageContent, setMessageTimer, setMessageType } = useContext(MessageContext)

  const showCopiedMessage = async () => {
    setTimeout(() => {
      setMessageTimer(2)
      setMessageType('success')
      setMessageContent('Link copied')
      setShowMessage(true)
    }, 0)
  }
  return (
        <>
            <input type="checkbox" name="collapse" id={`handle${pollIndex}`} defaultChecked={false}/>
            <label htmlFor={`handle${pollIndex}`} className="userPolls__singlePollLabel"><h2>{pollTitle}</h2>
                <span
                    className="userPolls__singlePollLabel_date">{new Intl.DateTimeFormat().format(new Date(createdAt))}</span></label>
            <div className="userPolls__singlePollContent">
                <div className="userPolls__singlePoll_links">
                    <div className="userPolls__singlePoll_singleLink">
                        <div className="userPolls__singlePoll_singleLink_text"><p>Link to poll: </p>
                            <a href={`https://${location}/poll/${pollId}`}>{`https://${location}/poll/${pollId}`}</a>
                        </div>
                        <div className='userPolls__copy-to-clipboard'><p>Copy: </p>
                            <FaCopy size={'2em'}
                                    className='userPolls__copy-button'
                                    onClick={async () => {
                                      await copy(`https://${location}/poll/${pollId}`)
                                      setShowMessage(false)
                                      await showCopiedMessage()
                                    }}/>
                        </div>
                    </div>
                    <div className="userPolls__singlePoll_singleLink">
                        <div className="userPolls__singlePoll_singleLink_text"><p>Link to results: </p> <a
                            href={`https://${location}/poll/${pollId}/results`}>{`https://${location}/poll/${pollId}/results`}</a>
                        </div>
                        <div className='userPolls__copy-to-clipboard'><p>Copy: </p>
                            <FaCopy size={'2em'}
                                    className='userPolls__copy-button'
                                    onClick={async () => {
                                      await copy(`https://${location}/poll/${pollId}/results`)
                                      setShowMessage(false)
                                      await showCopiedMessage()
                                    }}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

import React, { useEffect, useState } from 'react'
import './UserPolls.css'
import { useAuth } from '../hooks/use.auth'
import { BigMessage } from '../components/common/BigMessage/BigMessage'
import { apiUrl } from '../config/api'
import { type PollEntity, type UserPollsSuccessResponse } from 'types'
import { Spinner } from '../components/common/Spinner/Spinner'
import { PollListSingleItem } from './PollListSingleItem'

export const UserPolls = () => {
  const [loading, setLoading] = useState(false)
  const [fetchFailed, setFetchFailed] = useState(false)
  const [allowAccess, setAllowAccess] = useState(false)
  const [fetchedPolls, setFetchedPolls] = useState<PollEntity[] | null>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user.userLogin === '') {
      setAllowAccess(false)
    } else {
      setAllowAccess(true)
      void (async () => {
        setLoading(true)
        try {
          const res = await fetch(`${apiUrl}/user/mypolls`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              Authorization: localStorage.getItem('token') ?? ''
            }
          })
          if (!res.ok) {
            setLoading(false)
            setFetchFailed(true)
          }
          const fetchedPolls = await res.json() as UserPollsSuccessResponse
          setFetchedPolls(fetchedPolls.polls)
          setLoading(false)
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }, [])

  if (loading) {
    return <Spinner/>
  }

  if (!allowAccess) {
    return <BigMessage title={'Oopsies'} body={'You have to be logged in to view your polls'}/>
  }

  if (fetchFailed) {
    return <BigMessage title={'Dang it!'} body={'Something went wrong when getting your polls'}/>
  }

  return (

        <div className="userPolls__Wrapper">
            <h1>{`${user.userLogin}'s polls`}</h1>
            {fetchedPolls
              ? fetchedPolls.map((poll, index) => {
                if (poll.pollId && poll.createdAt) {
                  return <PollListSingleItem key={poll.pollId}
                                                   pollId={poll.pollId}
                                                   pollTitle={poll.pollTitle}
                                                   createdAt={poll.createdAt}
                                                   pollIndex={index}
                        />
                } else return null
              })
              : <p>No polls to show yet</p>
            }

        </div>)
}

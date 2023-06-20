import React, {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useState
} from 'react'

interface User {
  userId: string
  userLogin: string
}

interface ManageUser {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext<ManageUser>({
  user: {
    userId: '',
    userLogin: ''
  },
  setUser: () => {
  }

})

export const UserContextProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User>({ userId: '', userLogin: '' })
  return (
        <UserContext.Provider
            value={{ user, setUser }}
        >
            {props.children}
        </UserContext.Provider>
  )
}

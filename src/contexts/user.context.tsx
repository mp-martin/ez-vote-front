import React, {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useState
} from 'react'

interface User {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export const UserContext = createContext<User>({
  isLoggedIn: false,
  setIsLoggedIn: () => {
  }
})

export const UserContextProvider = (props: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
        <UserContext.Provider
            value={{ isLoggedIn, setIsLoggedIn }}
        >
            {props.children}
        </UserContext.Provider>
  )
}

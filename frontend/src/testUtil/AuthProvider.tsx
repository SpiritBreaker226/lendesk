import { FC, ReactNode } from 'react'
import { AuthContext } from '../context'

import { Action, InitialState } from '../Types'

export const initialState: InitialState = {
  user: null,
}

export interface AuthProviderProps {
  state: InitialState
  children: ReactNode
  dispatch?: (action: Action) => void
}

export const AuthProvider: FC<AuthProviderProps> = ({
  state,
  dispatch,
  children,
}) => (
  <AuthContext.Provider
    value={{
      state: {
        ...initialState,
        ...state,
      },
      dispatch: dispatch || (() => null),
    }}
  >
    {children}
  </AuthContext.Provider>
)

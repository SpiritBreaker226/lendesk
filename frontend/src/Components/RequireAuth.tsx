import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../context'

export type RequireAuthProps = {
  children: ReactNode
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const {
    state: { user },
  } = useAuth()

  if (!user) {
    return <Navigate to="/" replace={true} />
  }

  return <>{children}</>
}

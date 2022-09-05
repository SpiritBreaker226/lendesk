import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { isAuth } from '../helpers'

export type RequireAuthProps = {
  children: ReactNode
}

export const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  if (!isAuth()) {
    return <Navigate to="/" replace={true} />
  }

  return <>{children}</>
}

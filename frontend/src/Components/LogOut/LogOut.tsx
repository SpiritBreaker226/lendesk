import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../../context'

import { logout } from '../../helpers'
import { Types } from '../../Types'
import { Button } from '../Button'
import { ErrorMessage } from '../ErrorMessage'
import { removeTokenFromServer } from './helpers'

const LogOutContianer = styled.div`
  text-align: right;
`

const LogOutButton = styled(Button)`
  background: none;
  border: 0;
  color: ${(props) => props.theme.text};
  font-weight: 600;
  font-size: 16px;
  padding: 8px 0;
}
`

const ErrorMessageContianer = styled(ErrorMessage)`
  margin: 8px 0;
`

export const LogOut: FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    state: { user },
    dispatch,
  } = useAuth()

  const onSuccess = () => {
    setIsLoading(false)

    // update local storage and state mantament
    logout()
    dispatch({ type: Types.RemoveUser, payloard: {} })

    navigate('/', { replace: true })
  }
  const onError = (messageFromServer: string) => {
    setIsLoading(false)

    setError(messageFromServer)
  }

  const handleClick = () => {
    setIsLoading(true)

    removeTokenFromServer(onSuccess, onError)
  }

  return (
    <LogOutContianer>
      <LogOutButton onClick={handleClick} isLoading={isLoading}>
        Logout {user?.firstName} {user?.lastName}
      </LogOutButton>
      {<ErrorMessageContianer error={error} />}
    </LogOutContianer>
  )
}

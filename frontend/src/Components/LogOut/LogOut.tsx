import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { logout } from '../../helpers'
import { Button } from '../Button'
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
  cursor: pointer;
  padding: 8px 0;
}
`

const ErrorMessageContianer = styled.div`
  margin: 8px 0;
  color: ${(props) => props.theme.error};
`

export const LogOut: FC = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSuccess = () => {
    setIsLoading(false)

    // update local storage
    logout()

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
        Logout
      </LogOutButton>
      {error && <ErrorMessageContianer>{error}</ErrorMessageContianer>}
    </LogOutContianer>
  )
}

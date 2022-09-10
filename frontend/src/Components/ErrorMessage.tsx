import { FC } from 'react'
import styled from 'styled-components'
import { ServerError } from '../Types'

const ErrorMessageContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
  color: ${(props) => props.theme.error};
`

export type ErrorMessageProps = {
  error?: ServerError | string
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  if (!error) {
    return null
  }

  if (typeof error === 'string') {
    return <ErrorMessageContianer>{error}</ErrorMessageContianer>
  }

  return (
    <ErrorMessageContianer>
      {error.field ? (
        <>
          {error.field}: {error.errorMessage}
        </>
      ) : (
        error.errorMessage
      )}
    </ErrorMessageContianer>
  )
}

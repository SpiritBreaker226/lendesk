import { FC } from 'react'
import styled from 'styled-components'
import { ServerError } from '../Types'

const FormErrorMessageContianer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`

export type FormErrorMessageProps = {
  error?: ServerError
}

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ error }) => {
  if (!error) {
    return null
  }

  return (
    <FormErrorMessageContianer>
      {error.field ? (
        <>
          {error.field}: {error.errorMessage}
        </>
      ) : (
        error.errorMessage
      )}
    </FormErrorMessageContianer>
  )
}

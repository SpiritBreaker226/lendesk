import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const PageNotFoundContainer = styled.div`
  min-height: 20vh;
  min-width: 30vh;
  text-align: center;
`

const PageNotFoundContent = styled.p`
  margin: 80px 0;
`

export const PageNotFound: FC = () => {
  return (
    <PageNotFoundContainer>
      <PageNotFoundContent>Page not found</PageNotFoundContent>
      <Link to="/">Click here</Link> to login
    </PageNotFoundContainer>
  )
}

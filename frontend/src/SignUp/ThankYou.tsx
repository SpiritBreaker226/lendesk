import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ThankYouContainer = styled.section`
  text-align: center;
  min-height: 25vh;
  min-width: 25vh;
`

const ThankYouHeader = styled.h2`
  margin: 0 0 16px;
`

const ThankYouContent = styled.p`
  margin: 80px 0;
`

export const ThankYou: FC = () => (
  <ThankYouContainer>
    <ThankYouHeader>Thank You For Signing Up</ThankYouHeader>
    <ThankYouContent>
      Your details have been save to the database
    </ThankYouContent>
    <Link to="/">Click here</Link> to Profile page
  </ThankYouContainer>
)

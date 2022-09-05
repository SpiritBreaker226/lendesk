import { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { getUser } from '../helpers'

const ProfileContainer = styled.div`
  min-height: 20vh;
  min-width: 30vh;
`

const ProfileHeader = styled.h2`
  margin: 0 0 16px;
  text-align: center;
  border-bottom: 1px solid ${(props) => props.theme.border};
`

const ProfileContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px 0;
`

const UserNotFoundContainer = styled(ProfileContainer)`
  text-align: center;
`

const UserNotFoundContent = styled.p`
  margin: 80px 0;
`

export const Profile: FC = () => {
  const user = getUser()

  if (!user) {
    return (
      <UserNotFoundContainer>
        <UserNotFoundContent>User not found</UserNotFoundContent>
        <Link to="/">Click here</Link> to login
      </UserNotFoundContainer>
    )
  }

  const { email, firstName, lastName } = user

  return (
    <ProfileContainer>
      <ProfileHeader>Profile</ProfileHeader>

      <ProfileContent>
        <strong>Email:</strong>
        <span>{email}</span>
      </ProfileContent>

      <ProfileContent>
        <strong>Name:</strong>
        <span>
          {firstName} {lastName}
        </span>
      </ProfileContent>
    </ProfileContainer>
  )
}

import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import {
  FormErrorMessage,
  LendeskLogo,
  SubmitButton,
  Textbox,
} from '../Components'
import { useAuth } from '../context'
import { login } from '../helpers'
import postSubmit from '../helpers/postSubmit'
import {
  ApiPath,
  ServerError,
  NonAuthUser,
  AuthResponse,
  ApiNamespace,
  Types,
} from '../Types'
import { LoginSchema } from './LoginSchema'

const LoginContainer = styled.section`
  min-height: 25vh;
  min-width: 40vh;
`

const LoginHeaderContainer = styled.header`
  margin: 0 0 16px;
  text-align: center;
`

const LoginHeader = styled.h2`
  margin: 16px 0 0;
  text-align: left;
`

const CreateUserOrLogin = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

type FormikValueType = Pick<NonAuthUser, 'email' | 'password'>

export const Login: FC = () => {
  const [serverError, setServerError] = useState<ServerError>()
  const navigate = useNavigate()
  const {
    state: { user },
    dispatch,
  } = useAuth()

  if (user) {
    return <Navigate to="/profile" replace={true} />
  }

  return (
    <LoginContainer>
      <LoginHeaderContainer>
        <LendeskLogo />
        <LoginHeader>Login</LoginHeader>
      </LoginHeaderContainer>

      <FormErrorMessage error={serverError} />

      <Formik<FormikValueType>
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) =>
          postSubmit<FormikValueType, AuthResponse>(
            ApiPath.login,
            ApiNamespace.users,
            values,
            (data) => {
              dispatch({ type: Types.UpdateUser, payload: { user: data.user } })

              login(data)

              navigate('/profile')
            },
            (error) => setServerError(error)
          )
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <Textbox
              name="email"
              label="Email"
              inputProps={{
                placeholder: 'john.smith@somedomain.com',
                type: 'email',
                disabled: isSubmitting,
              }}
            />

            <Textbox
              name="password"
              label="Password"
              inputProps={{
                placeholder: 'password',
                type: 'password',
                disabled: isSubmitting,
              }}
            />

            <CreateUserOrLogin>
              <Link to="/sign-up">Create account</Link>
              <SubmitButton isLoading={isSubmitting}>Login</SubmitButton>
            </CreateUserOrLogin>
          </Form>
        )}
      </Formik>
    </LoginContainer>
  )
}

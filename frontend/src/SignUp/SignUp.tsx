import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import {
  Button,
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
  ApiNamespace,
  AuthResponse,
  Types,
} from '../Types'
import { SignupSchema } from './SignupSchema'

const SignUpContainer = styled.section`
  min-height: 50vh;
  min-width: 50vh;
`

const SignUpHeaderContainer = styled.header`
  margin: 0 0 16px;
  text-align: center;
`

const SignUpHeader = styled.h2`
  margin: 16px 0 0;
  text-align: left;
`

const FormGroup = styled.fieldset`
  padding-top: 16px;
  margin-bottom: 16px;
`

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

const ButtonCancel = styled(Button)`
  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.background};

  &:hover {
    color: ${(props) => props.theme.secondary};
  }
`

type FormikValues = NonAuthUser & { confirmPassword: string }

export const SignUp: FC = () => {
  const [serverError, setServerError] = useState<ServerError>()
  const navigate = useNavigate()
  const { dispatch } = useAuth()

  const handleCancel = () => navigate('/')

  return (
    <SignUpContainer>
      <SignUpHeaderContainer>
        <LendeskLogo />
        <SignUpHeader>Create Account</SignUpHeader>
      </SignUpHeaderContainer>

      <FormErrorMessage error={serverError} />

      <Formik<FormikValues>
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) =>
          postSubmit<FormikValues, AuthResponse>(
            ApiPath.signup,
            ApiNamespace.users,
            values,
            (data) => {
              dispatch({ type: Types.UpdateUser, payload: { user: data.user } })

              login(data)

              navigate('thank-you')
            },
            (error) => setServerError(error)
          )
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <FormGroup>
              <legend>Your Details:</legend>

              <Textbox
                name="firstName"
                label="First Name"
                inputProps={{ placeholder: 'John', disabled: isSubmitting }}
              />

              <Textbox
                name="lastName"
                label="Last Name"
                inputProps={{ placeholder: 'Smith', disabled: isSubmitting }}
              />
            </FormGroup>

            <FormGroup>
              <legend>Login Details:</legend>

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

              <Textbox
                name="confirmPassword"
                label="Confirm Password"
                inputProps={{
                  placeholder: 'confirm password',
                  type: 'password',
                  disabled: isSubmitting,
                }}
              />
            </FormGroup>

            <ButtonContainer>
              <ButtonCancel onClick={handleCancel}>Cancel</ButtonCancel>
              <SubmitButton isLoading={isSubmitting}>Sign Up</SubmitButton>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </SignUpContainer>
  )
}

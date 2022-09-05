import axios from 'axios'
import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FormErrorMessage, SubmitButton, Textbox } from '../Components'
import { ServerError, User } from '../Types'
import { SignupSchema } from './SignupSchema'

const SignUpContainer = styled.section`
  min-height: 50vh;
  min-width: 50vh;
`

const SignUpHeaderContainer = styled.header`
  margin: 0 0 16px;
  text-align: center;

  img {
    width: 200px;
  }
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
  text-align: right;
  margin-top: 8px;
`

export const SignUp: FC = () => {
  const [serverError, setServerError] = useState<ServerError>()
  const navigate = useNavigate()

  return (
    <SignUpContainer>
      <SignUpHeaderContainer>
        <img src="/image/lendesk_logo.svg" alt="Lendesk" />
        <SignUpHeader>Create Account</SignUpHeader>
      </SignUpHeaderContainer>

      <FormErrorMessage error={serverError} />

      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/signup`,
              values
            )

            navigate('thank-you')
          } catch (error) {
            if (error instanceof Error) {
              const errorParts = error.message.split(': ')

              if (errorParts.length === 2) {
                setServerError({
                  field: errorParts[0] as keyof User,
                  errorMessage: errorParts[1],
                })

                return
              }

              setServerError({ field: undefined, errorMessage: errorParts[0] })
            }
          }
        }}
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
            </FormGroup>

            <ButtonContainer>
              <SubmitButton isLoading={isSubmitting}>Sign Up</SubmitButton>
            </ButtonContainer>
          </Form>
        )}
      </Formik>
    </SignUpContainer>
  )
}

import { Form, Formik } from 'formik'
import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FormErrorMessage, SubmitButton, Textbox } from '../Components'
import postSubmit from '../helpers/postSubmit'
import { ApiPath, ServerError, User } from '../Types'
import { LoginSchema } from './LoginSchema'

const LoginContainer = styled.section`
  min-height: 25vh;
  min-width: 40vh;
`

const LoginHeaderContainer = styled.header`
  margin: 0 0 16px;
  text-align: center;

  img {
    width: 200px;
  }
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

type FormikValueType = Pick<User, 'email' | 'password'>

export const Login: FC = () => {
  const [serverError, setServerError] = useState<ServerError>()
  const navigate = useNavigate()

  return (
    <LoginContainer>
      <LoginHeaderContainer>
        <img src="/image/lendesk_logo.svg" alt="Lendesk" />
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
          postSubmit<FormikValueType>(
            ApiPath.login,
            values,
            () => navigate('/profile'),
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

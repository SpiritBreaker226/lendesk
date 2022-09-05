import * as Yup from 'yup'

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First Name is too short')
    .max(50, 'First Name is too long')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Last Name is too Short!')
    .max(50, 'Last Name is too Long!')
    .required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password is too short')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Password must contain 8 characters that is 1 uppercase, 1 lowercase, 1 number and 1 special case character (i.e. !@#_#$-%)'
    )
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
})

import axios, { AxiosError } from 'axios'

import {
  ApiPath,
  ServerError,
  NonAuthUser,
  ApiNamespace,
  AuthResponse,
} from '../Types'

async function postSubmit<T = NonAuthUser>(
  type: ApiPath,
  namespace: ApiNamespace,
  values: T,
  onSuccess: (values: AuthResponse) => void,
  onError: (error: ServerError) => void
) {
  try {
    const resposne = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/${namespace}/${type}`,
      values
    )

    onSuccess(resposne.data)
  } catch (error) {
    const currentError = error as AxiosError | Error
    const errorMessage = axios.isAxiosError(currentError)
      ? (currentError.response?.data as string)
      : currentError.message

    const errorParts = errorMessage.split(': ')

    if (errorParts.length === 2) {
      onError({
        field: errorParts[0] as keyof NonAuthUser,
        errorMessage: errorParts[1],
      })

      return
    }

    onError({ field: undefined, errorMessage: errorParts[0] })
  }
}

export default postSubmit

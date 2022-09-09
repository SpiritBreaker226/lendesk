import axios, { AxiosError } from 'axios'

import { getToken } from '../../../helpers'
import { ApiNamespace, ApiPath } from '../../../Types'

export const removeTokenFromServer = async (
  onSuccess: () => void,
  onError: (messageFromServer: string) => void
) => {
  try {
    const token = getToken()

    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/${ApiNamespace.users}/${ApiPath.logout}`,
      {},
      { headers: { authorization: `Bearer ${token}` } }
    )

    onSuccess()
  } catch (error) {
    const currentError = error as AxiosError | Error
    const errorMessage = axios.isAxiosError(currentError)
      ? (currentError.response?.data as string)
      : currentError.message

    onError(errorMessage)
  }
}

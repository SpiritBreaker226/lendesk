import axios from 'axios'

import { ApiNamespace, ApiPath } from '../../../Types'

export const removeTokenFromServer = async (
  onSuccess: () => void,
  onError: (messageFromServer: string) => void
) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/${ApiNamespace.users}/${ApiPath.logout}`
    )

    onSuccess()
  } catch (error) {
    if (error instanceof Error) {
      onError(error.message)
    }
  }
}

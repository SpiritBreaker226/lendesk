import axios from 'axios'

import { ApiPath, ServerError, User } from '../Types'

async function postSubmit<T = User>(
  type: ApiPath,
  values: T,
  onSuccess: (values: unknown) => void,
  onError: (error: ServerError) => void
) {
  try {
    const resposne = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/${type}`,
      values
    )

    onSuccess(resposne.data)
  } catch (error) {
    if (error instanceof Error) {
      const errorParts = error.message.split(': ')

      if (errorParts.length === 2) {
        onError({
          field: errorParts[0] as keyof User,
          errorMessage: errorParts[1],
        })

        return
      }

      onError({ field: undefined, errorMessage: errorParts[0] })
    }
  }
}

export default postSubmit

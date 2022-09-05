import axios from 'axios'

import { ApiPath, ServerError, NonAuthUser } from '../Types'

async function postSubmit<T = NonAuthUser, R = unknown>(
  type: ApiPath,
  values: T,
  onSuccess: (values: R) => void,
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
          field: errorParts[0] as keyof NonAuthUser,
          errorMessage: errorParts[1],
        })

        return
      }

      onError({ field: undefined, errorMessage: errorParts[0] })
    }
  }
}

export default postSubmit

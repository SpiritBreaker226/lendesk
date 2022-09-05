import { AuthResponse, User } from '../Types'

export const getUser = (): User | null => {
  const localStorageUser = localStorage.getItem('user')

  if (!localStorageUser) {
    return null
  }

  return JSON.parse(localStorageUser)
}

export const login = (data: AuthResponse) => {
  const user = { ...data.user }

  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(user))
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const isAuth = (): boolean =>
  !!localStorage.getItem('user') || !!localStorage.getItem('token')

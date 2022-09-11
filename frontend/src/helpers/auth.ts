import { AuthResponse } from '../Types'

export const getToken = (): string => {
  const localStorageTotken = localStorage.getItem('token')

  if (!localStorageTotken) {
    throw new Error('token not avaiable')
  }

  return localStorageTotken
}

export const login = (data: AuthResponse) => {
  localStorage.setItem('token', data.token)
}

export const logout = () => {
  localStorage.removeItem('token')
}

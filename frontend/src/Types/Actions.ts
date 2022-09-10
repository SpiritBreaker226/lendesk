import { User } from './User'

export interface InitialState {
  user: User | null
}

export enum Types {
  UpdateUser = 'UPDATE_USER',
  RemoveUser = 'REMOVE_USER',
}

type UserPayload = {
  [Types.UpdateUser]: {
    user: User
  }
  [Types.RemoveUser]: {}
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>]

export type Action = UserActions

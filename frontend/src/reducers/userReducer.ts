import { Action, InitialState, Types } from '../Types'

export const userReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdateUser:
      return {
        ...state,
        user: action.payload.user,
      }
    case Types.RemoveUser:
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

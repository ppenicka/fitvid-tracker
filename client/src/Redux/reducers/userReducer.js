import * as actions from '../actions/userActions';

export const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
    case actions.SET_USER:
      return action.payload
  }
}

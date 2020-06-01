import * as actions from '../actions/scheduleActions';

export const initialState = null;

export default function scheduleReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
    case actions.SET_SCHEDULE:
      return action.payload
  }
}

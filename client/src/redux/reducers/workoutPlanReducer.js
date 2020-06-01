import * as actions from '../actions/workoutPlanAction';

const initialState = {
  workoutPlan: [null, null, null, null, null, null, null],
  title: '',
};

export default function workoutPlanReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_WORKOUTPLAN:
      return {
        ...state,
        workoutPlan: action.payload,
      };
    case actions.UPDATE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    default:
      return state;
  }
}

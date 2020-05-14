export const SET_WORKOUTPLAN = 'SET_WORKOUTPLAN';
export const UPDATE_TITLE = 'UPDATE_TITLE';

export const setWorkoutPlan = (newPlan) => ({
  type: SET_WORKOUTPLAN,
  payload: newPlan
});

export const updateTitlePlan = (title) => {
  return { type: UPDATE_TITLE, payload: title};
}
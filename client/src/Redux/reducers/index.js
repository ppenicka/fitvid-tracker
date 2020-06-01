import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from './userReducer';
import scheduleReducer from './scheduleReducer';
import newWorkoutPlan from './workoutPlanReducer'

const rootReducer = combineReducers({
  currentUser: userReducer,
  schedule: scheduleReducer, 
  workoutPlanCreation: newWorkoutPlan,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [ 'currentUser', 'schedule' ],
  blacklist: [ ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer

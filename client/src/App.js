import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from './Redux/stores/reduxStore';
import Login from './Pages/Login/Login';
import Workout from './Pages/Workout/Workout';
import SetCredentials from './Pages/SetCredentials/SetCredentials';
import CreateWorkout from './Pages/CreateWorkout/CreateWorkout';
import ListOfWorkouts from './Pages/ListOfWorkouts/ListOfWorkouts';
import HomePage from './Pages/HomePage/HomePage';
import ListOfWorkoutPlans from './Pages/ListOfWorkoutPlans/ListOfWorkoutPlans';
import WorkoutPlan from './Pages/WorkoutPlan/WorkoutPlan';
import CreateWorkoutPlan from './Pages/CreateWorkoutPlan/CreateWorkoutPlan'
import NavBar from './Components/Navigation/navBar';
import './App.css';

function App () {

  return (
    <div>
      <Provider store={reduxStore.store}>
        <PersistGate loading={null} persistor={reduxStore.persistor}>
          <Router>
            <Route exact path="/"
              component={Login} />
            <Route exact path="/setCredentials"
              component={SetCredentials} />
            <Route exact path="/HomePage"
              component={HomePage} />
            <Route exact path="/createWorkout"
              component={CreateWorkout} />
            <Route exact path="/workout/:id"
              component={Workout} />
            <Route exact path="/ListOfWorkouts"
              component={ListOfWorkouts} />
            <Route exact path="/ListOfWorkoutPlans"
              component={ListOfWorkoutPlans} />
            <Route exact path="/WorkoutPlan/:id"
              component={WorkoutPlan} />
            <Route exact path="/CreateWorkoutPlan"
              component={CreateWorkoutPlan} />
            <Route path="/CreateWorkoutPlan/:id"
              component={CreateWorkoutPlan} />
            <Route path="/navbar"
              component={NavBar} />
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}
export default App;

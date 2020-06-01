import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import reduxStore from './redux/stores/reduxStore';
import Login from './pages/Login/Login';
import Workout from './pages/Workout/Workout';
import SetCredentials from './pages/SetCredentials/SetCredentials';
import CreateWorkout from './pages/CreateWorkout/CreateWorkout';
import ListOfWorkouts from './pages/ListOfWorkouts/ListOfWorkouts';
import HomePage from './pages/HomePage/HomePage';
import MyListOfWorkouts from './pages/ListOfWorkouts/myListOfWorkouts';
import ListOfWorkoutPlans from './pages/ListOfWorkoutPlans/ListOfWorkoutPlans';
import myListOfWorkoutPlans from './pages/ListOfWorkoutPlans/MyListOfWorkoutPlans'
import WorkoutPlan from './pages/WorkoutPlan/WorkoutPlan';
import CreateWorkoutPlan from './pages/CreateWorkoutPlan/CreateWorkoutPlan'
import NavBar from './components/Navigation/navBar';
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
            <Route exact path="/myListOfWorkouts"
              component={MyListOfWorkouts} />
            <Route exact path="/ListOfWorkoutPlans"
              component={ListOfWorkoutPlans} />
            <Route exact path="/myListOfWorkoutPlans"
              component={myListOfWorkoutPlans} />
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

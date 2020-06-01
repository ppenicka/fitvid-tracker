import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';

import ScheduledForToday from '../../components/ScheduledForToday/ScheduledForToday';
import NavBar from './../../components/Navigation/navBar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

function HomePage() {

  const user = useSelector(state => state.currentUser);
  const classes = useStyles();

  return (

    (!user) ? <Redirect to="/" /> :

      <div>
        <NavBar />
        <div className={classes.root} style={{padding: "2% 8%"}}>
          <Typography align="center" variant="h6">Welcome {user.firstName}, ready for a workout?</Typography>
          <div>
            <ScheduledForToday />
          </div>
          <Box style={{paddingTop: "3%"}}>
          <div>
            <Link to="/ListOfWorkouts">
              <FitnessCenterIcon />
            Browse Workouts
            </Link>
            <Link to="/ListOfWorkoutPlans">
              <FitnessCenterIcon />
            Browse Workout Plans
            </Link>
          </div>
          <div>
            <Link to="/createWorkout">
                <AddIcon />
              Create New Workout
            </Link>
            <Link to="/CreateWorkoutPlan">
              <AddIcon />
            Create New Workout Plan
          </Link>
          </div>
          </Box>
        </div>
      </div>
  )
}

export default HomePage;

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import MomentUtils from '@date-io/moment';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import ApiClient from '../../Services/ApiClient';
import { setSchedule } from '../../redux/actions/scheduleActions';
import './WorkoutBox.css';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },
}));

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121"
    },
  },
});

const WorkoutBox = ({ workout, passedIndex }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const schedule = useSelector(state => state.schedule);
  const dispatch = useDispatch();
  const history = useHistory();

  function addToSchedule (startDate) {
    const newScheduleItem = {
          day: moment(startDate).format('YYYY-MM-DD'),
          workout: workout._id
        }

    const newSchedule = { userId: schedule.userId, map: [...schedule.map, newScheduleItem] };
    ApiClient.updateSchedule(newSchedule).then((response) => {
      dispatch(setSchedule(response));
    });
  }

  const classes = useStyles();

  function changeDate (date) {
    addToSchedule(date)
    setPickerOpen(false);
  }

  function closePicker () { setPickerOpen(false) };
  function openPicker () { setPickerOpen(true) };

  function redirectToWorkout () {
    const workoutPath = `/workout/${workout._id}`;
    history.push(workoutPath);
  }

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div className="single-workout-box" style={{height: "220px"}}>
          <div className="description-and-middle-box">
            <div className="description-box" onClick={redirectToWorkout}>
              <h2>{workout.name}</h2>
              <p>{workout.description}</p>
              {Object.values(workout.difficulties).includes(true) && <p >
              <u>difficulty:</u><span> </span>
              {workout.difficulties.easy ? 'easy ' : null}
              {workout.difficulties.medium ? 'medium ' : null}
              {workout.difficulties.hard ? 'hard' : null}
              </p>  }
            </div>
            <div className="option-buttons">
            <Button className={classes.button} onClick={openPicker}>Add to schedule</Button>
            <DatePicker open={pickerOpen} id="datePicker" format='YYYY-MM-DD' onChange={changeDate} onClose={closePicker} style={{ display: 'none' }}></DatePicker>
              {workout.trainingDays ? (
                <Link
                  style={{ textDecoration: 'none'}}
                  to={{ pathname: '/WorkoutPlan', state: { workout: workout } }}
                >
                  <Button className={classes.button}>View Workout Plan</Button>
                </Link>
              ) : (
                  <Link style={{ textDecoration: 'none'}} to={{ pathname: '/CreateWorkoutPlan', state: { workout: workout, passedIndex: passedIndex } }}>
                    <Button className={classes.button}>Add to Workout Plan</Button>
                  </Link>
                )}
            </div>
          </div>

          <div className="video-box">
            <iframe
              src={`https://www.youtube.com/embed/${workout.youtubeId}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default WorkoutBox;

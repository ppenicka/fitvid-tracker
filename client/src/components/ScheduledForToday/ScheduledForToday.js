import React from 'react';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import MomentUtils from '@date-io/moment';

import WorkoutOnHome from '../../components/WorkoutOnHome/WorkoutOnHome';
import ApiClient from '../../Services/ApiClient';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#212121"
    },
  },
});

const useStyles = makeStyles((theme) => ({
  divSelected: {
    padding: "3% 0"
  },
  workoutHome: {
    paddingTop: "3%"
  },
  divSelectDate: {
    padding: "3% 0"
  }
}));

function ScheduledForToday () {

  const schedule = useSelector(state => state.schedule);
  const classes = useStyles();
  const today = moment().format('YYYY-MM-DD');

  const [selectedDate, setSelectedDate] = useState(today);
  const [todaysWorkoutIds, setTodaysWorkoutIds] = useState([]);
  const [workoutsOfSelectedDay, setWorkoutsOfSelectedDay] = useState([]);

  useEffect(() => {
    getWorkoutsOfSelectedDay(today);
  }, [schedule]);

  function changeDate (date) {
    const dateFormatted = moment(date).format('YYYY-MM-DD');
    setSelectedDate(dateFormatted);
    getWorkoutsOfSelectedDay(dateFormatted);
  }

  function getScheduledFor () {
    return moment(selectedDate).calendar(null, {
      lastDay: '[yesterday]',
      sameDay: '[today]',
      nextDay: '[tomorrow]',
      lastWeek: '[last] dddd',
      nextWeek: '[next] dddd',
      sameElse: 'L'
    }).split(' at ')[0];
  }

  function getWorkoutsOfSelectedDay (dateFormatted) {
    if (schedule) {
      const todaysIds = schedule.map.filter(day => (moment(day.day).format('YYYY-MM-DD') == dateFormatted));
      setTodaysWorkoutIds(todaysIds);

      if (todaysIds.length > 0) {
        const promiseArr = [];
        for (let i = 0; i < todaysIds.length; i++) {
          promiseArr[i] = ApiClient.getWorkout(todaysIds[i].workout)
        }
        Promise.all(promiseArr).then(resolved => { setWorkoutsOfSelectedDay(resolved) });
      }
    } else { setWorkoutsOfSelectedDay([]); }
  }

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className={classes.divSelected}>
            <Typography variant="body1" style={{fontWeight: 'bold'}}>Scheduled for {getScheduledFor()}:</Typography>
            <div className={classes.workoutHome}>
              {todaysWorkoutIds.length < 1 ? 'nothing scheduled' :
                workoutsOfSelectedDay.map(workout => (
                  <WorkoutOnHome workout={workout} />
                ))
              }
            </div>
            <div className={classes.divSelectDate}>
              <Typography variant="body1" style={{fontWeight: 'bold'}}>Select another day:</Typography>
              <DatePicker id="datePicker" format='YYYY-MM-DD' value={selectedDate} onChange={changeDate} style={{paddingTop: '2%'}}/>
            </div>
        </div>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

export default ScheduledForToday;

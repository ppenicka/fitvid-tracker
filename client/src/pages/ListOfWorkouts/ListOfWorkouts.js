import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import WorkoutList from '../../components/WorkoutList/WorkoutList';
import FilterWorkouts from './../../components/WorkoutList/FilterWorkouts';
import './ListofWorkouts.css';
import ApiClient from '../../Services/ApiClient';
import Navigation from './../../components/Navigation/navBar';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Workout from '../Workout/Workout';

function ListOfWorkouts(props) {
  const { handle } = props.match.params;
  const { state } = props.location;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.currentUser);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setfilteredWorkouts(myWorkouts);
    } else {
      setfilteredWorkouts(AllWorkouts);
    }
  };

  const [searchValue, setSearchValue] = useState('');
  const [myWorkouts, setmyWorkouts] = useState([]);
  const [AllWorkouts, setAllWorkouts] = useState([]);
  const [filteredWorkouts, setfilteredWorkouts] = useState([]);
  const [checkBoxStatus, setcheckBoxStatus] = useState({
    easy: false,
    medium: false,
    hard: false,
  });

  useEffect(() => {
    ApiClient.getAllWorkouts().then((workouts) => setAllWorkouts(workouts));
    ApiClient.getAllWorkouts().then((workouts) =>
      setfilteredWorkouts(workouts)
    );
    ApiClient.getMyWorkouts().then((workouts) => setmyWorkouts(workouts));
  }, []);

  const handleInputChange = (enteredInput) => {
    setSearchValue(enteredInput);
    filterWorkoutsDifficultyAndSearch(checkBoxStatus, enteredInput);
  };

  const handleCheckBoxChange = (toggleKey) => {
    let messengerObjectForBoxStatus = Object.assign(checkBoxStatus);
    if (toggleKey === 'easy') {
      if (checkBoxStatus.easy === false) {
        setcheckBoxStatus({ ...checkBoxStatus, easy: true });
        messengerObjectForBoxStatus.easy = true;
      } else {
        setcheckBoxStatus({ ...checkBoxStatus, easy: false });
        messengerObjectForBoxStatus.easy = false;
      }
    }
    if (toggleKey === 'medium') {
      if (checkBoxStatus.medium === false) {
        setcheckBoxStatus({ ...checkBoxStatus, medium: true });
        messengerObjectForBoxStatus.medium = true;
      } else {
        setcheckBoxStatus({ ...checkBoxStatus, medium: false });
        messengerObjectForBoxStatus.medium = false;
      }
    }
    if (toggleKey === 'hard') {
      if (checkBoxStatus.hard === false) {
        setcheckBoxStatus({ ...checkBoxStatus, hard: true });
        messengerObjectForBoxStatus.hard = true;
      } else {
        setcheckBoxStatus({ ...checkBoxStatus, hard: false });
        messengerObjectForBoxStatus.hard = false;
      }
    }

    value === 1
      ? filterWorkoutsDifficultyAndSearch(
          messengerObjectForBoxStatus,
          searchValue,
          myWorkouts
        )
      : filterWorkoutsDifficultyAndSearch(
          messengerObjectForBoxStatus,
          searchValue,
          AllWorkouts
        );
  };

  const filterWorkoutsDifficultyAndSearch = (
    checkBoxStatus,
    enteredInput = searchValue,
    selectedListAll = AllWorkouts
  ) => {
    let filteredArray = [];

    if (checkBoxStatus.easy === true) {
      filteredArray = selectedListAll.filter((Workout) => {
        return Workout.difficulties.easy;
      });
    }
    if (checkBoxStatus.medium === true) {
      filteredArray = filteredArray.concat(
        selectedListAll.filter((Workout) => Workout.difficulties.medium)
      );
    }
    if (checkBoxStatus.hard === true) {
      filteredArray = filteredArray.concat(
        selectedListAll.filter((Workout) => Workout.difficulties.hard)
      );
    }

    if (
      (checkBoxStatus.easy) ||
      checkBoxStatus.medium ||
      checkBoxStatus.hard
    ) {
      filteredArray = filteredArray.filter((Workout) => {
        return Workout.name.toLowerCase().includes(enteredInput.toLowerCase());
      });
      setfilteredWorkouts(filteredArray);
    } else {
      let searchFilteredArray = selectedListAll.filter((Workout) => {
        return Workout.name.toLowerCase().includes(enteredInput.toLowerCase());
      });
      setfilteredWorkouts(searchFilteredArray);
    }
  };

  return !user ? (
    <Redirect to="/" />
  ) : (
    <div>
      <Navigation />
      <div className="header-search-view">
        <ThemeProvider theme={defaultMaterialTheme}>
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                label="Browse Workouts"
                indicatorColor="primary"
                textColor="primary"
                centered
              />
              <Tab label="My saved Workouts" />
            </Tabs>
          </Paper>
        </ThemeProvider>
      </div>
      <div className="list-filter-container">
        <WorkoutList
          workouts={filteredWorkouts}
          passedIndex={
            state && state.passedIndex >= 0 ? state.passedIndex : 'nothing'
          }
        ></WorkoutList>
        <FilterWorkouts
          handleCheckBoxChange={handleCheckBoxChange}
          handleInputChange={handleInputChange}
        ></FilterWorkouts>
      </div>
    </div>
  );
}

export default ListOfWorkouts;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

// prot Object Workout

/* [{
  createdBy: "5ebbaece0ee0fc2200784344",
  description: "home round",
  difficulties: {easy: false, medium: true, hard: false},
  isPublic: true,
  length: 4,
  name: "homezz",
  tags: ["home"],
  type: "strenght",
  youtubeId: "vc1E5CfRfos",
  __v: 0,
  _id: "5ebbaf090ee0fc2200784345",
}] */

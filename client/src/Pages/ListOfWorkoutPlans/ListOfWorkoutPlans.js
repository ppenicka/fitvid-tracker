import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import WorkoutPlanList from '../../Components/WorkoutPlanList/WorkoutPlanList';
import FilterWorkouts from '../../Components/WorkoutList/FilterWorkouts';
import NavBar from './../../Components/Navigation/navBar';
import ApiClient from '../../Services/ApiClient';

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

const WorkoutPlans = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.currentUser);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setFilteredWorkoutPlans(myWorkoutPlans);
    } else {
      setFilteredWorkoutPlans(AllWorkoutPlans);
    }
  };

  const [searchValue, setSearchValue] = useState('');
  const [myWorkoutPlans, setmyWorkoutPlans] = useState([]);
  const [AllWorkoutPlans, setAllWorkoutPlans] = useState([]);
  const [filteredWorkoutPlans, setFilteredWorkoutPlans] = useState([]);
  const [checkBoxStatus, setcheckBoxStatus] = useState({
    easy: false,
    medium: false,
    hard: false,
  });

  useEffect(() => {
    ApiClient.getAllWorkoutPlans().then((plans) =>
      setFilteredWorkoutPlans(plans)
    );
    ApiClient.getAllWorkoutPlans().then((plans) => setAllWorkoutPlans(plans));
    ApiClient.getMyWorkoutPlans().then((plans) => setmyWorkoutPlans(plans));
  }, []);

  const handleInputChange = (enteredInput) => {
    setSearchValue(enteredInput);
    filterWorkoutsDifficultyAndSearch(checkBoxStatus, enteredInput);
  };

  const filterWorkoutsDifficultyAndSearch = (
    checkBoxStatus,
    enteredInput = searchValue,
    selectedListAll = AllWorkoutPlans
  ) => {
    let filteredArray = [];

    if (checkBoxStatus.easy === true) {
      filteredArray = selectedListAll.filter(
        (Workout) => Workout.difficulties.easy
      );
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

    if (checkBoxStatus.easy || checkBoxStatus.medium || checkBoxStatus.hard) {
      filteredArray = filteredArray.filter((Workout) =>
        Workout.name.toLowerCase().includes(enteredInput.toLowerCase())
      );
      setFilteredWorkoutPlans(filteredArray);
    } else {
      let searchFilteredArray = selectedListAll.filter((Workout) =>
        Workout.name.toLowerCase().includes(enteredInput.toLowerCase())
      );
      setFilteredWorkoutPlans(searchFilteredArray);
    }
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
        myWorkoutPlans
      )
      : filterWorkoutsDifficultyAndSearch(
        messengerObjectForBoxStatus,
        searchValue,
        AllWorkoutPlans
      );
  };

  return !user ? (
    <Redirect to="/" />
  ) : (
      <div>
        <NavBar />

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
                  label="Browse Workout Plans"
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                />
                <Tab label="My saved Workout Plans" />
              </Tabs>
            </Paper>
          </ThemeProvider>
        </div>
        <div className="list-filter-container">
          <WorkoutPlanList plans={filteredWorkoutPlans}></WorkoutPlanList>
          <FilterWorkouts
            handleCheckBoxChange={handleCheckBoxChange}
            handleInputChange={handleInputChange}
          ></FilterWorkouts>
        </div>
      </div>
    );
};

export default WorkoutPlans;

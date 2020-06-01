import React, { useState, useEffect } from 'react';
import WorkoutList from '../../components/WorkoutList/WorkoutList';
import FilterWorkouts from '../../components/WorkoutList/FilterWorkouts';
import { Link } from 'react-router-dom';
import ApiClient from '../../Services/ApiClient';
import NavBar from './../../components/Navigation/navBar';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const MyWorkoutPlans = ({}) => {

  const user = useSelector(state => state.currentUser);

  const fakeWorkouts = [
    {
      id: 'P001',
      name: 'Chest, Abs & Legs Plan ',
      description:
        'This Plan has 3x Trainigs per week and each session focuses on different body parts',
      difficulty: 'medium',
      type: ['strength'],
      youtubeID: 'BkS1-El_WlE',
      tags: ['chest', 'HIT'],
      trainingDays: [1, 3, 5],
      created_by: 654684,
    },
  ];

  const [filteredWorkoutPlans, setFilteredWorkoutPlans] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [checkBoxStatus, setcheckBoxStatus] = useState({
    easy: false,
    medium: false,
    hard: false,
  });

  useEffect (() => {
    ApiClient.getAllWorkoutPlans()
      .then(plans => setFilteredWorkoutPlans(plans));
  }, []);

  const handleInputChange = (enteredInput) => {
    setSearchValue(enteredInput);
    filterWorkoutsDifficultyAndSearch(checkBoxStatus, enteredInput);
  };

  const filterWorkoutsDifficultyAndSearch = (
    checkBoxStatus,
    enteredInput = searchValue
  ) => {
    let filteredArray = [];

    if (checkBoxStatus.easy === true) {
      filteredArray = fakeWorkouts.filter(
        (Workout) => Workout.difficulty === 'easy'
      );
    }
    if (checkBoxStatus.medium === true) {
      filteredArray = filteredArray.concat(
        fakeWorkouts.filter((Workout) => Workout.difficulty === 'medium')
      );
    }
    if (checkBoxStatus.hard === true) {
      filteredArray = filteredArray.concat(
        fakeWorkouts.filter((Workout) => Workout.difficulty === 'hard')
      );
    } else {
    }

    if (filteredArray.length > 0) {
      filteredArray = filteredArray.filter((Workout) =>
        Workout.name.toLowerCase().includes(enteredInput.toLowerCase())
      );
      setFilteredWorkoutPlans(filteredArray);
    } else {
      let searchFilteredArray = fakeWorkouts.filter((Workout) =>
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
    filterWorkoutsDifficultyAndSearch(messengerObjectForBoxStatus);
  };

  return (

    (!user) ? <Redirect to="/" /> :

    <div>

      <NavBar/>
      <div className="header-search-view">
        <div>
          <Link to="/ListOfWorkoutPlans">
            <button>
              <h1>Browse Workout Plans</h1>
            </button>
          </Link>
          <Link to="/myListOfWorkoutPlans">
            <button>
              <h1>My saved Workout Plans</h1>
            </button>
          </Link>
        </div>
        <div className="search-workouts">
          <input
            type="text"
            className="search-input"
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="    Search .."
            title="Type in a name"
          ></input>
        </div>
      </div>
      <div className="list-filter-container">
        <WorkoutList workouts={filteredWorkoutPlans}></WorkoutList>
        <FilterWorkouts
          handleCheckBoxChange={handleCheckBoxChange}
        ></FilterWorkouts>
      </div>
    </div>
  );
};

export default MyWorkoutPlans;

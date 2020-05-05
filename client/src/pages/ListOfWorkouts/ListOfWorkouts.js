import React, { useState, useEffect } from 'react';
import WorkoutList from '../../components/WorkoutList/WorkoutList';
import FilterWorkouts from './../../components/WorkoutList/FilterWorkouts';
import './ListofWorkouts.css';

function ListOfWorkouts() {
  const fakeWorkouts = [
    {
      id: '001',
      name: 'Chest Workout',
      description: '10 minutes intense bodyweight chest workout',
      difficulty: 'medium',
      type: 'strength',
      youtubeID: 'BkS1-El_WlE',
      tags: ['chest', 'HIT'],
      length: 10,
      created_by: 654684,
    },
    {
      id: '002',
      name: 'Full Body Workout',
      description: '30 minutes intense bodyweight workout',
      difficulty: 'hard',
      type: 'strength',
      youtubeID: 'UBMk30rjy0o',
      tags: ['chest', 'HIT'],
      length: 20,
      created_by: 654684,
    },
    {
      id: '003',
      name: 'Leg Workout',
      description: '10 minutes intense bodyweight chest workout',
      difficulty: 'medium',
      type: 'strength',
      youtubeID: 'aCa8R9II8F0',
      tags: ['chest', 'HIT'],
      length: 20,
      created_by: 654684,
    },
    {
      id: '004',
      name: 'Abs Workout',
      description: '10 minutes intense bodyweight chest workout',
      difficulty: 'easy',
      type: 'strength',
      youtubeID: '8AAmaSOSyIA',
      tags: ['chest', 'HIT'],
      length: 10,
      created_by: 654684,
    },
    {
      id: '005',
      name: 'core Workout',
      description: '10 minutes intense bodyweight chest workout',
      difficulty: 'hard',
      type: 'strength',
      youtubeID: 'dJlFmxiL11s?start=60',
      tags: ['chest', 'HIT'],
      length: 10,
      created_by: 654684,
    },
  ];

  const [searchValue, setSearchValue] = useState('');
  const [filteredWorkouts, setfilteredWorkouts] = useState(fakeWorkouts);
  const [checkBoxStatus, setcheckBoxStatus] = useState({
    easy: false,
    medium: false,
    hard: false,
  });

  const handleInputChange = (enteredInput) => {
    setSearchValue(enteredInput);
    filterWorkoutsDifficultyAndSearch(checkBoxStatus, enteredInput);
  };

  const handleCheckBoxChange = (toggleKey) => {
    let messengerObjectForBoxStatus = Object.assign(checkBoxStatus);
    console.log(
      'this is the messenger before --->',
      messengerObjectForBoxStatus
    );
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
    console.log('hookStatus', checkBoxStatus);
    console.log('messenger after --->', messengerObjectForBoxStatus);
    filterWorkoutsDifficultyAndSearch(messengerObjectForBoxStatus);
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
    }
    if (filteredArray.length > 0) {
      filteredArray = filteredArray.filter((Workout) =>
        Workout.name.toLowerCase().includes(enteredInput.toLowerCase())
      );
      setfilteredWorkouts(filteredArray);
    } else {
      let searchFilteredArray = fakeWorkouts.filter((Workout) =>
        Workout.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setfilteredWorkouts(searchFilteredArray);
    }
  };

  return (
    <div>
      <div className="header-search-view">
        <h1>Workouts</h1>
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
        <WorkoutList workouts={filteredWorkouts}></WorkoutList>
        <FilterWorkouts
          handleCheckBoxChange={handleCheckBoxChange}
        ></FilterWorkouts>
      </div>
    </div>
  );
}

export default ListOfWorkouts;
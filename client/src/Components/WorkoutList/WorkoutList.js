import React from 'react';

import WorkoutBox from '../WorkoutBox/WorkoutBox';
import './WorkoutList.css';

const WorkoutList = ({ workouts, passedIndex }) => {
  return (
    <div className="workout-list-box">
      {workouts.map((workout) =>  <WorkoutBox workout={workout} passedIndex={passedIndex} /> )}
    </div>
  );
};

export default WorkoutList;

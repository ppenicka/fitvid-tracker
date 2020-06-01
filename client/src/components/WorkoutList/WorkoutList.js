import React from 'react';
import './WorkoutList.css';
import WorkoutBox from '../WorkoutBox/WorkoutBox';

const WorkoutList = ({ workouts, passedIndex }) => {
  return (
    <div className="workout-list-box">
      {workouts.map((workout) =>  <WorkoutBox workout={workout} passedIndex={passedIndex} /> )}
    </div>
  );
};

export default WorkoutList;

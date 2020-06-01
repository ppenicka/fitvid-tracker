import React, { useState, useEffect } from 'react';

import WorkoutOnHome from '../WorkoutOnHome/WorkoutOnHome';
import NoWorkout from '../NoWorkout/NoWorkout';
import ApiClient from '../../Services/ApiClient';
import './WorkoutPlanDetail.css';

function WorkoutPlanDetail ({ plan }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const promisedWorkouts = [];
    for (let i = 0; i < plan.workoutList.length; i++) {
      if (plan.workoutList[i]) {
        promisedWorkouts[i] = ApiClient.getWorkout(plan.workoutList[i]);
      } else {
        promisedWorkouts[i] = null;
      }
    }

    Promise.all(promisedWorkouts)
      .then(workouts => setWorkouts(workouts))
      .catch(err => console.log(err))

  }, [])


  return (
    <div >
      {workouts.map((workout, index) => (workout) ?
        <div className='workout-plan-detail-grid'>
          <div className='day-in-workout-plan-detail'>Day {index + 1}</div>
          <WorkoutOnHome workout={workout} />
        </div> :
        <div className='workout-plan-detail-grid'>
          <div className='day-in-workout-plan-detail'>Day {index + 1}</div>
          <NoWorkout />
        </div>
      )}
    </div>
  );
}

export default WorkoutPlanDetail;

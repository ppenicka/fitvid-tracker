import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function NameWorkout ({workoutName, setWorkoutName, editable}) {

  const handlingWorkoutName = (event) => {
    event.preventDefault();
    setWorkoutName(event.target.value);
  }

  return (
    <div>
      {editable &&
        <div>
        <TextField id="standard-basic" label="Name of the Workout" defaultValue={workoutName} onChange={(event)=> handlingWorkoutName(event)} />
        </div>
      }
      {!editable &&
        <div>
          <Typography variant="h6" align="center">{workoutName}</Typography>
        </div>
      }
    </div>
  )
};

export default NameWorkout

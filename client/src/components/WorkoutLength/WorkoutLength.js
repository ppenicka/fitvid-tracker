import React from 'react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function workoutLength ({length, setLength, editable}) {

  return (
  <div>
    <Typography variant='body1' style={{fontWeight: 'bold'}}>Workout length:</Typography>
    {editable &&
    <TextField type="number" label="Minutes" defaultValue={length} onChange={(event) => {setLength(event.target.value) }}></TextField>}
    {!editable &&
    <p>{length}</p>}
  </div>
  )
};

export default workoutLength
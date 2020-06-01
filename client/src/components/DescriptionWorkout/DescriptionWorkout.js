import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

function DescriptionWorkout ({description, setDescription, editable}) {
  return (
  <div>
    {editable &&
    <div>
      <Typography variant='body1' style={{fontWeight: 'bold'}}>Description:</Typography>
      <TextField multiline="true" onChange={(event)=>setDescription(event.target.value)} defaultValue={description} ></TextField>
    </div>}
    {!editable &&
    <div>
      <Typography variant='body1' style={{fontWeight: 'bold'}}>Description:</Typography>
      <p>{description}</p>
    </div>}

  </div>
  )
};

export default DescriptionWorkout
import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function DifficultyWorkout ({difficulties, setDifficulties, editable}) {

  const { easy, medium, hard } = difficulties;

  const handleChange = (event) => {
    setDifficulties({...difficulties, [event.target.name]: event.target.checked})
  }

  return (
    <div>
      {editable &&
        <div>
        <Typography variant='body1' style={{fontWeight: 'bold'}}>Difficulty: </Typography>
        <FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={easy} onChange={handleChange} name="easy" size="small" color="default"/>}
              label="Easy"
            />
            <FormControlLabel
              control={<Checkbox checked={medium} onChange={handleChange} name="medium" size="small" color="default"/>}
              label="Medium"
            />
            <FormControlLabel
              control={<Checkbox checked={hard} onChange={handleChange} name="hard" size="small" color="default"/>}
              label="Hard"
            />
          </FormGroup>
        </FormControl>
        </div>
      }
      {!editable &&
        <div>
          <Typography variant='body1' style={{fontWeight: 'bold'}}>Difficulty: </Typography>
          {Object.keys(difficulties).map (difficulty=> (difficulties[difficulty]) && <Typography variant='body1'>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Typography> )}
        </div>}
    </div>
  )
};

export default DifficultyWorkout

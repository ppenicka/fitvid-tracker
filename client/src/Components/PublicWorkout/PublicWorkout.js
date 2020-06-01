import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function PublicWorkout({ isPublic, setIsPublic, editable }) {

  const handlePublic = () => {
    setIsPublic(!isPublic)
  }

  return (
    <div>
      {editable &&
        <div>
          <Typography variant='body1' style={{ fontWeight: 'bold' }}>Do you want to make your workout available to other users: </Typography>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={isPublic} onChange={handlePublic} name="public" size="small" color="default" />}
                label="Public"
              />
            </FormGroup>
          </FormControl>
        </div>
      }
      {!editable &&
        <div>
          {isPublic && <p style={{fontStyle: "italic"}}>This workout is currently available for other users.</p>}
          {!isPublic && <p style={{fontStyle: "italic"}}>This workout is currently private.</p>}
        </div>}
    </div>
  )
};

export default PublicWorkout
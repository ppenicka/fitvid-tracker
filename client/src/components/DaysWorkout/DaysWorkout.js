import React from 'react';
import { useSelector } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';

function DaysWorkout ({ days, setDays, repeatWeeks, setRepeatWeeks, editable, workoutId }) {

  const handleChange = (index) => {
    const newDays = [...days];
    newDays[index] = !newDays[index];
    setDays(newDays);
  }
  const schedule = useSelector(state => state.schedule);

  const cutDownToFive = (arr) => {
    if (arr.length > 4) {
      const more = arr.length - 4;
      const firstFour = arr.slice(0, 4);
      firstFour.push(`and ${more} more days`);
      return firstFour;
    } else return arr;
  }

  return (
    <div>
      {editable &&
        <div>
          <Typography variant='body1' style={{ fontWeight: 'bold' }}>Repeat every: </Typography>
          <FormControl>
            <FormGroup>
              <FormControlLabel

                control={<Checkbox checked={days[0]} onChange={() => handleChange(0)} name="monday" size="small" color="default" />}
                label="Monday"
              />
              <FormControlLabel
                control={<Checkbox checked={days[1]} onChange={() => handleChange(1)} name="tuesday" size="small" color="default" />}
                label="Tuesday"
              />
              <FormControlLabel
                control={<Checkbox checked={days[2]} onChange={() => handleChange(2)} name="wednesday" size="small" color="default" />}
                label="Wednesday"
              />
              <FormControlLabel
                control={<Checkbox checked={days[3]} onChange={() => handleChange(3)} name="thursday" size="small" color="default" />}
                label="Thursday"
              />
              <FormControlLabel
                control={<Checkbox checked={days[4]} onChange={() => handleChange(4)} name="friday" size="small" color="default" />}
                label="Friday"
              />
              <FormControlLabel
                control={<Checkbox checked={days[5]} onChange={() => handleChange(5)} name="saturday" size="small" color="default" />}
                label="Saturday"
              />
              <FormControlLabel
                control={<Checkbox checked={days[6]} onChange={() => handleChange(6)} name="sunday" size="small" color="default" />}
                label="Sunday"
              />
            </FormGroup>
          </FormControl>
          <br />
          <p>
            <span>For the next</span>
            <TextField id="numberOfDays" defaultValue={repeatWeeks} inputProps={{ style: { textAlign: 'right', width: "40px", marginRight: "5px" } }} size="small" onChange={(event) => setRepeatWeeks(parseInt(event.target.value))}></TextField>
            <span> weeks</span>
          </p>
        </div>
      }

      {!editable &&
        <div>
          <h4>Scheduled for: </h4>
          <ul>
            {cutDownToFive(schedule.map.filter((scheduleItem) => scheduleItem.workout === workoutId)
              .sort((a, b) => a.day < b.day)
              .map((scheduleItem) => (moment(scheduleItem.day).calendar(null, {
                lastDay: '[yesterday]',
                sameDay: '[today]',
                nextDay: '[tomorrow]',
                lastWeek: '[last] dddd',
                nextWeek: '[next] dddd',
                sameElse: 'Do of MMMM'
              }).split(' at ')[0])))
              .map((scheduleItem) => <li>{scheduleItem}</li>)
            }
          </ul>
        </div>}
    </div>

  )
};

export default DaysWorkout
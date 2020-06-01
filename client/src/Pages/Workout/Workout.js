import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import NameWorkout from '../../Components/NameWorkout/NameWorkout';
import TableW from '../../Components/TableW/TableW';
import YoutubePlayer from '../../Components/YoutubePLayer/YoutubePlayer'
import DescriptionWorkout from '../../Components/DescriptionWorkout/DescriptionWorkout';
import DifficultyWorkout from '../../Components/DifficultyWorkout/DifficultyWorkout';
import DaysWorkout from '../../Components/DaysWorkout/DaysWorkout';
import PublicWorkout from '../../Components/PublicWorkout/PublicWorkout';
import Countdown from '../../Components/Countdown/Countdown';
import Stopwatch from '../../Components/Stopwatch/Stopwatch';
import Navigation from './../../Components/Navigation/navBar';
import Tags from '../../Components/Tags/Tags';
import WorkoutLength from '../../Components/WorkoutLength/WorkoutLength';
import ApiClient from '../../Services/ApiClient';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2% 8%"
  },
  button: {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },
}));

function Workout (props) {

  const [exercises, setExercises] = useState(null);
  const [_id, setId] = useState(null);
  const [workoutName, setWorkoutName] = useState();
  const [description, setDescription] = useState('');
  const [difficulties, setDifficulties] = useState({ easy: false, medium: false, hard: false });
  const [days, setDays] = useState({ monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false });
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState([]);

  const [timeVideo, setTimeVideo] = useState();
  const [clickTimestamp, setClickTimestamp] = useState(false);
  const [editable, setEditable] = useState(false);
  const [workoutLength, setworkoutLength] = useState(0);
  const [youtubeId, setYoutubeId] = useState();
  const [createdBy, setCreatedBy] = useState();

  const user = useSelector(state => state.currentUser);
  const classes = useStyles();


  useEffect(() => {
    ApiClient.getWorkout(props.match.params.id)
      .then((workout) => {
        setId(workout._id);
        setExercises(workout.exercises);
        setDescription(workout.description);
        setDifficulties(workout.difficulties);
        setWorkoutName(workout.name);
        setIsPublic(workout.isPublic);
        setTags(workout.tags);
        setYoutubeId(workout.youtubeId);
        setworkoutLength(workout.length);
        setCreatedBy(workout.createdBy);

      })
  }, [])

  function switchEditable () {
    if (editable) {
      const updatedWorkout = {
        _id: _id,
        name: workoutName,
        description: description,
        difficulties: difficulties,
        type: "strenght",
        youtubeId: youtubeId,
        tags: tags,
        length: workoutLength,
        createdBy: createdBy,
        exercises: exercises,
        isPublic: isPublic
      };
      ApiClient.updateWorkout(updatedWorkout)
        .then(() => { setEditable(!editable) })
        .catch((err) => { console.log('Error updating workout:', err); });
    } else {
      setEditable(!editable);
    }
  }

  return (

    (!user) ? <Redirect to="/" /> :

      <div>
        <Navigation />
        <div className={classes.root}>
          <Paper elevation={3} style={{ margin: "3% 0%" }}>
            <Grid container direction="column" justify="center" alignItem="center" spacing={4} style={{ padding: "2% 5%" }}>
              <Grid item xs={12} align="center">
                <NameWorkout workoutName={workoutName} setWorkoutName={setWorkoutName} editable={editable} />
              </Grid>
              <Grid item xs={12} align="center">
                <YoutubePlayer url={`https://www.youtube.com/watch?v=${youtubeId}`} timeVideo={timeVideo} clickTimestamp={clickTimestamp} />
              </Grid>
              {!editable &&
                <Grid container spacing={4}>
                  <Grid item xs={3} minWidth="110px" style={{ marginLeft: "16px" }}>
                    <Countdown />
                  </Grid>
                  <Grid item xs={3} style={{ marginLeft: "16px" }}>
                    <Stopwatch />
                  </Grid>
                </Grid>
              }
              {exercises &&
                <Grid item xs={12} >
                  <TableW exercises={exercises} setExercises={setExercises} editable={editable} setTimeVideo={setTimeVideo} setClickTimestamp={setClickTimestamp} clickTimestamp={clickTimestamp} />
                </Grid>}
              <Grid item xs={12} >
                <DescriptionWorkout description={description} setDescription={setDescription} editable={editable} />
              </Grid>
              <Grid item xs={12} >
                <WorkoutLength length={workoutLength} setLength={setworkoutLength} editable={editable} />
              </Grid>
              <Grid item xs={12} >
                <DifficultyWorkout difficulties={difficulties} setDifficulties={setDifficulties} editable={editable} />
              </Grid>
              <Grid item xs={12} >
                <DaysWorkout days={days} setDays={setDays} editable={editable} workoutId={_id} />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "0px" }}>
                <Tags tags={tags} setTags={setTags} editable={editable} />
              </Grid>
              <Grid item xs={12} >
                <PublicWorkout isPublic={isPublic} setIsPublic={setIsPublic} editable={editable} />
              </Grid>
              <Grid item align="right" xs={12}>
                {
                  (user._id === createdBy) ?
                    <Button variant="contained" className={classes.button} onClick={switchEditable}>{editable ? "Done" : "Edit"}</Button>
                    : null
                }
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
  )
}

export default Workout;

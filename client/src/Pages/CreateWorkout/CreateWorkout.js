import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import nextDay from 'next-day';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import NameWorkout from '../../Components/NameWorkout/NameWorkout';
import TableW from '../../Components/TableW/TableW';
import DescriptionWorkout from '../../Components/DescriptionWorkout/DescriptionWorkout';
import DifficultyWorkout from '../../Components/DifficultyWorkout/DifficultyWorkout';
import DaysWorkout from '../../Components/DaysWorkout/DaysWorkout';
import YouTubePlayer from '../../Components/YouTubePlayer/YouTubePlayer';
import PublicWorkout from '../../Components/PublicWorkout/PublicWorkout';
import Tags from '../../Components/Tags/Tags';
import NavBar from './../../Components/Navigation/navBar'
import WorkoutLength from '../../Components/WorkoutLength/WorkoutLength';
import { setSchedule } from '../../Redux/actions/scheduleActions';
import ApiClient from '../../Services/ApiClient';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2% 8%"
  },
  button: {
    backgroundColor: 'white',
    color: "black",
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },
}));

function getIdVideoYoutube (url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

function CreateWorkout () {

  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser);
  const schedule = useSelector(state => state.schedule);

  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [workoutName, setWorkoutName] = useState();
  const [youtubeId, setYoutubeId] = useState();
  const [exercises, setExercises] = useState([{ name: "", sets: 0, reps: 0, timestamp: "" }]);
  const [description, setDescription] = useState('');
  const [difficulties, setDifficulties] = useState({ easy: false, medium: false, hard: false });
  const [days, setDays] = useState([false, false, false, false, false, false, false]);
  const [repeatWeeks, setRepeatWeeks] = useState(1);
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState([]);
  const [workoutLength, setworkoutLength] = useState(0);

  const handlingYoutubeUrl = (event) => {
    event.preventDefault();
    setYoutubeUrl(event.target.value);
  }

  const generateYoutubeId = () => {
    const youtubeId = getIdVideoYoutube(youtubeUrl);
    getworkoutLength(youtubeId);
    setYoutubeId(youtubeId);
  }

  const getworkoutLength = (youtubeId) => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=contentDetails&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setworkoutLength(Math.floor(moment.duration(data.items[0].contentDetails.duration).asMinutes()))
      })
  }

  const getSchedule = (workoutId) => {
    const arr = [];
    const today = new Date();
    today.setDate(today.getDate() - 1);

    for (let i = 0; i < repeatWeeks; i++) {
      for (let j = 0; j < 7; j++) {
        if (days[j]) {
          const day = nextDay(today, j + 1).date;
          arr.push({ day: moment(day).add(7 * i, 'days').format('YYYY-MM-DD'), workout: workoutId });
        }
      }
    }

    return arr;
  }

  async function createWorkout () {

    if (!youtubeId) {
      alert("Video required. \n Please import one.");
      return;
    } else {
      const workout = {
        name: workoutName,
        description: description,
        difficulties: difficulties,
        type: "strenght",
        youtubeId: youtubeId,
        tags: tags,
        length: workoutLength,
        createdBy: user._id,
        exercises: exercises,
        isPublic: isPublic
      };

      ApiClient.createWorkout(workout)
        .then((response) => {
          const workoutId = response;
          const scheduleArr = getSchedule(workoutId);
          const newMap = [...schedule.map, ...scheduleArr]
          const newSchedule = { userId: schedule.userId, map: newMap };
          ApiClient.updateSchedule(newSchedule).then((response) => {
            dispatch(setSchedule(response));
          });
        });

      return null;
    }
  };

  const classes = useStyles();

  return (

    (!user) ? <Redirect to="/" /> :

      <div>
        <NavBar />
        <div className={classes.root}>
          <Paper elevation={3} style={{ margin: "3% 0%" }}>
            <Grid container direction="column" justify="center" alignItem="center" spacing={4} style={{ padding: "2% 5%" }}>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">Create your daily workout</Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <NameWorkout workoutName={workoutName} setWorkoutName={setWorkoutName} editable={true} />
              </Grid>
              {!youtubeId &&
                <Grid item xs={12} align="center">
                  <Typography variant='body1' style={{ fontWeight: 'bold' }}>Import your Youtube video here: </Typography>
                  <TextField id='youtubeUrl' required={true} label="Required" style={{ width: '75%', marginRight: "5%" }} onChange={(event) => handlingYoutubeUrl(event)} />
                  <Button
                    variant="contained"
                    className={classes.button}
                    size="small"
                    onClick={generateYoutubeId}
                  >Import</Button>
                </Grid>}
              {youtubeId &&
                <div>
                  <Grid item xs={12} align="center">
                    <YouTubePlayer url={`https://www.youtube.com/watch?v=${youtubeId}`} />
                  </Grid>
                  <Grid item xs={12} align="right">
                    <Button
                      variant="contained"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      size="small"
                      onClick={() => setYoutubeId()}
                    >Change Video</Button>
                  </Grid>
                </div>
              }
              <Grid item xs={12} >
                <TableW exercises={exercises} setExercises={setExercises} editable={true} />
              </Grid>
              <Grid item xs={12} >
                <DescriptionWorkout description={description} setDescription={setDescription} editable={true} />
              </Grid>
              <Grid item xs={12} >
                <WorkoutLength length={workoutLength} setLength={setworkoutLength} editable={true} />
              </Grid>
              <Grid item xs={12}>
                <DifficultyWorkout difficulties={difficulties} setDifficulties={setDifficulties} editable={true} />
              </Grid>
              <Grid item xs={12}>
                <DaysWorkout days={days} setDays={setDays} repeatWeeks={repeatWeeks} setRepeatWeeks={setRepeatWeeks} editable={true} />
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "0px" }}>
                <Tags tags={tags} setTags={setTags} editable={true} />
              </Grid>
              <Grid item xs={12}>
                <PublicWorkout isPublic={isPublic} setIsPublic={setIsPublic} editable={true} />
              </Grid>
              <Grid item xs={12} align="right">
                <Button
                  variant="contained"
                  className={classes.button}
                  endIcon={<Icon>send</Icon>}
                  size="small"
                  onClick={createWorkout}
                >
                  {youtubeId && <Link to={`/HomePage`} className={classes.button} style={{ textDecoration: 'none' }} >
                    Create
                  </Link>}
                  {!youtubeId && "Create"
                  }
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
  )
}

export default CreateWorkout;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';

import { setWorkoutPlan, updateTitlePlan } from './../../Redux/actions/workoutPlanAction';
import NavBar from './../../Components/Navigation/navBar';
import ApiClient from '../../Services/ApiClient';
import PublicWorkout from '../../Components/PublicWorkout/PublicWorkout';
import DifficultyWorkout from '../../Components/DifficultyWorkout/DifficultyWorkout';
import './CreateWorkoutPlan.css';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  deletebutton: {
    position: 'relative',
    bottom: '60px',
  },
  BoxBelowDelete: {
    paddingBottom: '2%',
    paddingTop: '2%',
    paddingRight: '2%',
    position: 'relative',
  },
  description: {
    paddingLeft: '8%',
  },
  deletebox: {
    backgroundColor: 'green',
  },
  deleteGrid: {
    position: 'absolute',
    top: 0,
  },
  button: {
    backgroundColor: 'white',

    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  },
  button2: {
    backgroundColor: 'white',
    border: 'solid',

    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  },
}));

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

function CreateWorkoutPlan (props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  const { state } = props.location;

  const WorkoutPlanRedux = useSelector(
    (state) => state.workoutPlanCreation.workoutPlan
  );
  const [isPublic, setIsPublic] = useState(false);
  const [difficulties, setDifficulties] = useState({
    easy: false,
    medium: false,
    hard: false,
  });
  const WorkoutPlanTitleRedux = useSelector(
    (state) => state.workoutPlanCreation.title
  );
  const [updated, setupdated] = useState(false);

  if (state && state.passedIndex >= 0 && state.passedIndex !== null) {
    let tempArr = WorkoutPlanRedux;
    tempArr.splice(state.passedIndex, 1, state.workout);
    state.passedIndex = null;
    dispatch(setWorkoutPlan(tempArr));
  }

  const handleAddingSelected = (index) => {
    let tempArr = WorkoutPlanRedux;
    tempArr.splice(index, 1, state.workout);
    dispatch(setWorkoutPlan(tempArr));
    setupdated(!updated);
  };

  const handleAddingDay = () => {
    let tempArr = WorkoutPlanRedux;
    tempArr.push(null);
    dispatch(setWorkoutPlan(tempArr));
    setupdated(!updated);
  };
  const handleRemovingDay = () => {
    let tempArr = WorkoutPlanRedux;
    tempArr.splice(tempArr.length - 1, 1);
    dispatch(setWorkoutPlan(tempArr));
    setupdated(!updated);
  };

  const handleDeletingSelected = (index) => {
    let tempArr = WorkoutPlanRedux;
    tempArr.splice(index, 1, null);
    dispatch(setWorkoutPlan(tempArr));
    setupdated(!updated);
  };

  const handleInputChange = (enteredInput) => {
    dispatch(updateTitlePlan(enteredInput));
  };

  const sendWorkoutPlan = () => {
    const newWorkoutPlan = {
      name: WorkoutPlanTitleRedux,
      workoutList: WorkoutPlanRedux,
      isPublic: isPublic,
      difficulties: difficulties,


    };

    ApiClient.createPlan(newWorkoutPlan);
    let tempArr = [null, null, null, null, null, null, null];
    dispatch(setWorkoutPlan(tempArr));
  };

  return !user ? (
    <Redirect to="/" />
  ) : (
      <div>
        <NavBar />
        <div className={classes.root} style={{ padding: '2% 8%' }}>
          <Typography align="center" variant="h4">
            Create your Workout Plan
        </Typography>
          <Grid container direction="row" style={{ marginTop: '40px' }}>
            <Grid item xs={12} align="center">
              <TextField
                type="text"
                value={WorkoutPlanTitleRedux}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="    Workoutplan name..."
                title="Type in a name"
                align="center"
              ></TextField>
            </Grid>
          </Grid>
          {state && state.workout ? (
            <Grid container direction="row" style={{ marginTop: '20px' }}>
              <Grid item xs={12} align="center">
                <div>
                  <div>You selected the: {state.workout.name}</div>
                </div>
              </Grid>
            </Grid>
          ) : (
              ''
            )}
          {WorkoutPlanRedux.map((workout, index) =>
            workout ? (
              <div>
                <div className="current-rest-day">
                  <div className="day-caption-box">
                    <Typography variant="h6">Day {index + 1}</Typography>
                  </div>
                  <Paper style={{ width: '60vw' }}>
                    <Grid
                      container
                      alignItems="center"
                      direction="row"
                      className={classes.BoxBelowDelete}
                    >
                      <Grid item xs={0} className={classes.deleteGrid}>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          onClick={() => handleDeletingSelected(index)}
                        >
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      </Grid>
                      <Grid item xs={7} className={classes.description}>
                        {workout.name && (
                          <Typography variant="h6" align="left">
                            {workout.name}
                          </Typography>
                        )}
                        {workout.description && (
                          <Typography variant="body1">
                            {workout.description}
                          </Typography>
                        )}
                        {workout.difficulties && (
                          <Typography variant="body1">
                            <u>difficulty:</u>
                            <span> </span>
                            {workout.difficulties.easy ? 'easy ' : null}
                            {workout.difficulties.medium ? 'medium ' : null}
                            {workout.difficulties.hard ? 'hard' : null}
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={5}>
                        {workout.youtubeId && (
                          <iframe
                            src={`https://www.youtube.com/embed/${workout.youtubeId}`}
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              </div>
            ) : (
                <div>

                  <div className="current-rest-day">
                    <div className="day-caption-box">
                      <Typography variant="h6">Day {index + 1}</Typography>
                    </div>
                    <Paper style={{ width: '60vw' }}>
                      <Grid
                        container
                        alignItems="center"
                        direction="row"
                        style={{ padding: '2% 5%' }}
                      >
                        <Grid item xs={3}>
                          <Typography variant="h6">Rest day</Typography>{' '}
                        </Grid>
                        <Grid item xs={6}>
                          {state && state.workout ? (
                            <Button
                              className={classes.button}
                              onClick={() => handleAddingSelected(index)}
                            >
                              schedule selected workout here
                            </Button>
                          ) : (
                              ''
                            )}
                        </Grid>
                        <Grid item xs={3}>
                          <Link
                            to={{
                              pathname: '/createWorkout',
                              state: { passedIndex: index },
                            }}
                            style={{ textDecoration: 'none', color: 'white' }}
                          >
                            <Button
                              className={classes.button}
                              startIcon={<AddIcon />}
                            >
                              Create Workout
                        </Button>
                          </Link>
                          <Link
                            to={{
                              pathname: '/ListOfWorkouts',
                              state: { passedIndex: index },
                            }}
                            style={{ textDecoration: 'none', color: 'white' }}
                          >
                            <Button
                              className={classes.button}
                              startIcon={<AddIcon />}
                            >
                              <div>Add workout</div>
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                </div>
              )
          )}
          <Grid container direction="row">
            <Grid item xs={6} align="right" style={{ marginTop: '20px' }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={() => {
                    handleRemovingDay();
                  }}
                >
                  <RemoveIcon />
                </Fab>
              </ThemeProvider>
            </Grid>
            <Grid item xs={1} align="right" style={{ marginTop: '20px' }}>
              <ThemeProvider theme={defaultMaterialTheme}>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  className={classes.margin}
                  onClick={() => handleAddingDay()}
                >
                  <AddIcon />
                </Fab>
              </ThemeProvider>
            </Grid>
            <Grid item xs={5} align="right" style={{ marginTop: '20px' }}></Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={2}></Grid>
            <Grid item xs={10} style={{ marginTop: '60px' }}>
              <DifficultyWorkout
                difficulties={difficulties}
                setDifficulties={setDifficulties}
                editable={true}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: '40px' }}>
            <Grid item xs={2}></Grid>
            <PublicWorkout
              isPublic={isPublic}
              setIsPublic={setIsPublic}
              editable={true}
            />
          </Grid>
          <Grid container direction="row" style={{ marginTop: '40px' }}>
            <Grid item xs={2}></Grid>
            <Grid iterm xs={10}>

              <Button className={classes.button2} onClick={sendWorkoutPlan}>
                <Link to={"/ListOfWorkoutPlans"} style={{ textDecoration: 'none', color: 'black' }}>
                  Save Workout Plan
                </Link>
              </Button>

            </Grid>
          </Grid>
        </div>
      </div>
    );
}

export default CreateWorkoutPlan;


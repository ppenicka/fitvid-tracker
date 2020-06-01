import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import logo1 from '../../Asset/meghan-holmes-buWcS7G1_28-unsplash.jpg';
import './login.css';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${logo1})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "black",
    color: "white",
    '&:hover': {
        backgroundColor: 'rgb(80,80,80)',
    }
  },

}));

function Login () {

  const user = useSelector(state => state.currentUser);
  const classes = useStyles();

  return (
    (user) ? <Redirect to="/HomePage" /> :


    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Fitvid Tracker
        </Typography>
        <form className={classes.form} noValidate>
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={(e) => { e.preventDefault(); window.location.href = `${process.env.REACT_APP_SERVER_URL}/login/google` }}
          >
            Log In with Google
          </Button>
          <Box mt={5}>
          <Typography variant="subtitle1">WELCOME TO FITVID TRACKER, THE FIRST WEBSITE/APP TO CREATE YOUR PERSONAL WORKOUT USING YOUTUBE VIDEOS</Typography>
          </Box>
        </form>
      </div>
    </Grid>
  </Grid>
  )
}

export default Login;

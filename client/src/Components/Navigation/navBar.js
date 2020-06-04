import React from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';

import TopBar from '../../Components/TopBar/TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none',
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const user = useSelector(state => state.currentUser);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <AppBar className={classes.root} position="sticky">
      <Toolbar>
        <Grid container position="row" alignItems="center" justify="space-evenly" spacing={3}>

          <Grid item align="center" xs={2} >
            <Link className={classes.title} to='/HomePage'>
              <Typography variant="h6" className={classes.title}>
                Home
              </Typography>
            </Link>
          </Grid>

          <Grid item align="center" xs={2}>
            <Link className={classes.title} to='/createWorkout'>
              <Typography variant="h6" className={classes.title}>
                Create Workout
              </Typography>
            </Link>
          </Grid>

          <Grid item align="center" xs={2}>
            <Link className={classes.title} to='/listOfWorkouts'>
              <Typography variant="h6" className={classes.title}>
                Browse Workouts
              </Typography>
            </Link>
          </Grid>

          <Grid item align="center" xs={2}>
            <Link className={classes.title} to='/CreateWorkoutPlan'>
              <Typography variant="h6" className={classes.title}>
                Create Plan
                </Typography>
            </Link>
          </Grid>

          <Grid item align="center" xs={2}>
            <Link className={classes.title} to='/listOfworkoutplans'>
              <Typography variant="h6" className={classes.title}>
                Browse Plans
                </Typography>
            </Link>
          </Grid>

          <Grid item align="center" xs={2} >
            {user && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem><TopBar></TopBar></MenuItem>
                </Menu>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  );
}

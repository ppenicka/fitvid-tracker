import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { setUser } from '../../Redux/actions/userActions';
import { setSchedule } from '../../Redux/actions/scheduleActions';

const useStyles = makeStyles((theme) => ({
  button: {
    '&:hover': {
      backgroundColor: 'black',
      color: "white"
    }
  }
}));

function TopBar () {

  const classes = useStyles()
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser);
  const history = useHistory();

  const logOut = () => {
    dispatch(setUser(null));
    dispatch(setSchedule(null));
    history.push('/');
  }

  return (
    <div className="TopBar">
      {(user) ? <span>{user.firstName} {user.lastName} ({user.email}) </span> : null}
      <Button className={classes.button} onClick={logOut}>Log out</Button>
    </div>
  )
}

export default TopBar;
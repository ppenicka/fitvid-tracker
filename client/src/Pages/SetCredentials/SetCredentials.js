import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/actions/userActions';
import { setSchedule } from '../../redux/actions/scheduleActions';
import ApiClient from '../../Services/ApiClient';

function SetCredentials () {

  const dispatch = useDispatch();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const _id = params.get('_id');
  const token = params.get('token');

  dispatch(setUser({ _id: _id, token: token }));

  ApiClient.getProfile().then(data => {
    const userObj = {
      _id: _id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      token: token
    }

    dispatch(setUser(userObj));
  });

  const fetchSecheduleUrl = process.env.REACT_APP_SERVER_URL + '/schedule/';

  ApiClient.getSchedule()
    .then(data => { dispatch(setSchedule(data)) });

  return (<Redirect to="/HomePage" />);

}

export default SetCredentials;

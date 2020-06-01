import reduxStore from '../Redux/stores/reduxStore';

const getRequest = (path) => {
  const state = reduxStore.store.getState();
  const token = state.currentUser.token;
  const fetchUrl = `${process.env.REACT_APP_SERVER_URL}${path}`;

  return fetch(fetchUrl, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching ${fetchUrl}`)
    });
};

const postRequest = (path, bodyObj) => {
  const state = reduxStore.store.getState();
  const token = state.currentUser.token;
  const fetchUrl = `${process.env.REACT_APP_SERVER_URL}${path}`;

  return fetch(fetchUrl, {
    method: 'post',
    headers: new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    ),
    body: JSON.stringify(bodyObj)
  })
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching ${fetchUrl}`)
    });
};

export default {
  getSchedule: () => {
    return getRequest(`/schedule`);
  },
  getWorkout: (id) => {
    return getRequest(`/workout/${id}`);
  },
  getAllWorkouts: () => {
    return getRequest(`/workout/all`);
  },
  getMyWorkouts: () => {
    return getRequest(`/workout/my`);
  },
  getProfile: () => {
    return getRequest(`/profile`);
  },
  getWorkoutPlan: (id) => {
    return getRequest(`/plan/${id}`);
  },
  getAllWorkoutPlans: () => {
    return getRequest(`/plan/all`);
  },
  getMyWorkoutPlans: () => {
    return getRequest(`/plan/my`);
  },
  updateSchedule: (schedule) => {
    return postRequest(`/schedule`, schedule);
  },
  updateWorkout: (workout) => {
    return postRequest(`/workout/${workout._id}`, workout);
  },
  createWorkout: (workout) => {
    return postRequest(`/workout`, workout);
  },
  updateProfile: (profile) => {
    return postRequest(`/profile`, profile);
  },
  updatePlan: (plan) => {
    return postRequest(`/plan/${plan._id}`, plan);
  },
  createPlan: (plan) => {
    return postRequest(`/plan`, plan);
  },
};

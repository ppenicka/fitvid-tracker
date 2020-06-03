const Router = require('@koa/router');

const { getWorkout,
  createWorkout,
  updateWorkout,
  getAllWorkouts,
  getMyWorkouts,
  deleteWorkout } = require('../controllers/workout');
const auth = require('../middlewares/auth-middleware');
const jwtMiddleware = require('../middlewares/jwt');

const router = new Router();

router
  .use(jwtMiddleware)
  .use(auth);

router
  .get('/all', getAllWorkouts)
  .get('/my', getMyWorkouts)
  .get('/:id', getWorkout)
  .post('/:id', updateWorkout)
  .post('/', createWorkout)
  .delete('/:id', deleteWorkout);

module.exports = router;

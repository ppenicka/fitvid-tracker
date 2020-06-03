const { Workout } = require('../models/workout');
const { isValidObjectId } = require('../helpers/mongoose-helpers');

const getWorkout = async (ctx) => {
  const id = ctx.params.id;
  let wo;
  if (isValidObjectId(id)) {
    wo = await Workout.findOne({ _id: id });
  }
  if (wo) {
    if (wo.createdBy.equals(ctx.user._id) || wo.isPublic == true) {
      ctx.body = wo;
    } else {
      ctx.status = 403;
    }
  } else {
    ctx.status = 404;
  }
};

const getAllWorkouts = async (ctx) =>  {
  let workouts = await Workout.find().or([{ createdBy: ctx.user._id }, { isPublic: true }]);
  ctx.body = workouts;
};

const getMyWorkouts = async (ctx) =>  {
  let workouts = await Workout.find( { createdBy: ctx.user._id } );
  ctx.body = workouts;
};

const createWorkout = async (ctx) => {
  const newWorkout = await Workout.create({...ctx.request.body, createdBy: ctx.user});
  ctx.body = newWorkout._id;
  ctx.status = 201;
};

const updateWorkout = async (ctx) => {
  const id = ctx.params.id;
  let wo;
  if (isValidObjectId(id)) {
    wo = await Workout.findOne({ _id: id });
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }

  if (wo) {
    if (wo.createdBy.equals(ctx.user._id)) {
      await wo.updateOne(ctx.request.body);
    }
    else {
      ctx.status = 403;
    }
  }
};

const deleteWorkout = async (ctx) => {
  const id = ctx.params.id;
  let wo;
  if (isValidObjectId(id)) {
    wo = await Workout.findOne({ _id: id });
  } else {
    ctx.status = 404;
  }

  if (wo) {
    if (wo.createdBy.equals(ctx.user._id)) {
      await wo.remove(ctx.request.body);
      ctx.status = 204;
    } else {
      ctx.status = 403;
    }
  }
};

module.exports = {
  getWorkout,
  createWorkout,
  updateWorkout,
  getAllWorkouts,
  getMyWorkouts,
  deleteWorkout
};

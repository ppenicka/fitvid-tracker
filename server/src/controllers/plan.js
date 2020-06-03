const { Plan } = require('../models/plan');
const { isValidObjectId } = require('../helpers/mongoose-helpers');

const getPlan = async (ctx) => {
  const id = ctx.params.id;
  let plan;
  if (isValidObjectId(id)) {
    plan = await Plan.findOne({ _id: id }).populate('workoutList.Workout');
  }
  if (plan) {
    if (plan.createdBy.equals(ctx.user._id) || plan.isPublic == true) {
      ctx.body = plan;
    } else {
      ctx.status = 403;
    }
  } else {
    ctx.status = 404;
  }
};

const getAllPlans = async (ctx) => {
  let plans = await Plan.find().or([{ createdBy: ctx.user._id }, { isPublic: true }]);
  ctx.body = plans;
};

const getMyPlans = async (ctx) => {
  let plans = await Plan.find({ createdBy: ctx.user._id });
  ctx.body = plans;
};

const createPlan = async (ctx) => {
  await Plan.create({...ctx.request.body, createdBy: ctx.user._id});
  ctx.status = 201;
};

const updatePlan = async (ctx) => {
  const id = ctx.params.id;
  let plan;
  if (isValidObjectId(id)) {
    plan = Plan.findOne({ _id: id });
  } else {
    ctx.status = 404;
  }

  if (plan) {
    if (plan.createdBy.equals(ctx.user._id)) {
      await plan.updateOne(ctx.request.body);
      ctx.status = 200;
    } else {
      ctx.status = 403;
    }
  }
};

const deletePlan = async (ctx) => {
  const id = ctx.params.id;
  let plan;
  if (isValidObjectId(id)) {
    plan = Plan.findOne({ _id: id });
  } else {
    ctx.status = 404;
  }

  if (plan) {
    if (plan.createdBy.equals(ctx.user._id)) {
      await plan.remove({ _id: id });
      ctx.status = 204;
    } else {
      ctx.status = 403;
    }
  }
};

module.exports = {
  getPlan,
  getAllPlans,
  createPlan,
  updatePlan,
  getMyPlans,
  deletePlan
};

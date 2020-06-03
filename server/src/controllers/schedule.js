const { Schedule } = require('../models/schedule');

const getSchedule = async (ctx) => {

  let schedule = await Schedule.findOne({ userId: ctx.user._id }).populate('map.workouts');
  if (!schedule) {
    schedule = {userId: ctx.user._id, map: []};
  }
  ctx.body = JSON.stringify(schedule);
  ctx.status = 200;
};

const updateSchedule = async (ctx) => {
  const update = ctx.request.body;
  const updatedSchedule = await Schedule.findOneAndUpdate({ userId: ctx.user }, update, {
    new: true,
    upsert: true
  });
  ctx.body = updatedSchedule;
};

module.exports = {
  getSchedule,
  updateSchedule
};

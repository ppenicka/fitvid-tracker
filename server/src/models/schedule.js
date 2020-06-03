const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  map: [{
    day: Date,
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }
  }]
});

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = {
  ScheduleSchema,
  Schedule
};

const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: String,
  workoutList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  isPublic: Boolean,
  difficulties: { easy: Boolean, medium: Boolean, hard: Boolean }
});

const Plan = mongoose.model('Plan', PlanSchema);

module.exports = {
  PlanSchema,
  Plan
};

const mongoose = require('mongoose');

const WorkoutSchema = mongoose.Schema({
  name: String,
  description: String,
  difficulties: { easy: Boolean, medium: Boolean, hard: Boolean },
  type: String,
  youtubeId: String,
  tags: [String],
  length: Number,
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  exercises: [{
    name: String,
    sets: Number,
    reps: Number,
    timestamp: String,
  }],
  isPublic: Boolean
});

WorkoutSchema.pre('remove', async function () {
  await mongoose.model('Plan').update(
    { workoutList: this._id },
    { $set: { 'workoutList.$[objid]': null } },
    {
      multi: true,
      arrayFilters: [ { objid: this._id } ]
    }
  );
  await mongoose.model('Schedule').update(
    { },
    { $pull: { map: { workout: this } } },
    { multi: true }
  );
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = {
  WorkoutSchema,
  Workout
};

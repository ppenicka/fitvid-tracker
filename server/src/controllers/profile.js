const { Profile } = require('../models/profile');

const getProfile = async (ctx) => {
  ctx.body = ctx.user;
};

const updateProfile = async (ctx) => {
  const firstName = ctx.request.body.firstName;
  const lastName = ctx.request.body.lastName;
  const updateObj = {};
  if (firstName) updateObj.firstName = firstName;
  if (lastName) updateObj.lastName = lastName;
  if (updateObj.firstName || updateObj.lastName) {
    await Profile.updateOne(ctx.user, updateObj);
    ctx.status = 200;
  }
};

module.exports = {
  getProfile,
  updateProfile
};

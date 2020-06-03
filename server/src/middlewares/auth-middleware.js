const { Profile } = require('../models/profile');

function authHeaderErr (ctx, message) {
  ctx.set('WWW-Authenticate', 'Bearer');
  ctx.throw(401, message);
}

const authorize = async (ctx, next) => {
  const decodedToken = ctx.state.jwtdata;

  const profileObj = await Profile
    .findOne({googleId: decodedToken.googleId})
    .select('-token -__v -googleId'); // removes unneeded model details from response
  if (profileObj) {
    ctx.user = profileObj;
  } else {
    authHeaderErr(ctx, 'Profile does not exist');
  }

  return await next();
};

module.exports = authorize;

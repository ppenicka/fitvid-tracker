const queryString = require('query-string');
const googleAuth = require('../services/google-auth');
const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const { Profile } = require('../models/profile');


const sendToGoogle = async (ctx) => {
  const url = googleAuth.getAuthUrl();
  ctx.redirect(url);
};

const processGoogleCb = async (ctx) => {
  const googleAuthCode = queryString.parse(ctx.request.querystring).code;
  const tokens = await googleAuth.getGoogleTokens(googleAuthCode);
  const decodedToken = jwtDecode(tokens.id_token);

  const googleId = decodedToken.sub;
  const firstName = decodedToken.given_name;
  const lastName = decodedToken.family_name;
  const email = decodedToken.email;

  const sessionToken = jwt.sign({ googleId: googleId }, process.env.SERVER_JWT_SECRET);

  let foundProfile = await Profile.findOne({ googleId });
  if (foundProfile) {
    await foundProfile.updateOne({ token: sessionToken });
  } else {
    foundProfile = await Profile.create({ googleId, email, firstName, lastName, sessionToken});
  }

  ctx.redirect(`${process.env.CLIENT_URL}/setCredentials?_id=${foundProfile._id}&token=${sessionToken}`);
};

module.exports = {
  sendToGoogle,
  processGoogleCb
};

const queryString = require('query-string');
const googleAuth = require('../services/google-auth');
const jwtDecode = require('jwt-decode');
const jwt = require('jsonwebtoken');

const { Profile } = require('../models/profile');


const sendToGoogle = async (ctx, next) => {
  const url = googleAuth.getAuthUrl();
  ctx.redirect(url);
}

const processGoogleCb = async (ctx, next) => {
  const googleAuthCode = queryString.parse(ctx.request.querystring).code;
  const tokens = await googleAuth.getGoogleTokens(googleAuthCode);
  const token = tokens.id_token;
  const decodedToken = jwtDecode(tokens.id_token);

  const googleId = decodedToken.sub;
  const firstName = decodedToken.given_name;
  const lastName = decodedToken.family_name;
  const email = decodedToken.email;

  const sessionToken = jwt.sign({ googleId: googleId }, process.env.SERVER_JWT_SECRET);

  let foundProfile = await Profile.findOne({ googleId });
  console.log(foundProfile);
  if (foundProfile) {
    const result = await foundProfile.updateOne({ token: sessionToken });
  } else {
    foundProfile = await Profile.create({ googleId, email, firstName, lastName, sessionToken});
  }

  setUserToken(googleId, token);
  ctx.redirect(`${process.env.CLIENT_URL}/setCredentials?_id=${foundProfile._id}&token=${sessionToken}`);
}

const setUserToken = async (id, token) => {
  // add logic to save token in DB
}

module.exports = {
  sendToGoogle,
  processGoogleCb
};

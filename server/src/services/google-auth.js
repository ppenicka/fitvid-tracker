const { google } = require('googleapis');

function createConnection () {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email'
];

const getAuthUrl = () => {
  const conn = createConnection();
  return conn.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: defaultScope
  });
};

async function getGoogleTokens (code) {
  const auth = createConnection();
  const data = await auth.getToken(code);

  return data.tokens;
}

module.exports = { getGoogleTokens, getAuthUrl };

# Fitvid Tracker

Web app that helps users organize personal workout plans based on YouTube videos.

![Home page of the Fitvid Tracker app](docs/fitvid_home.PNG)

## Tech Stack
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node.js](https://nodejs.org/)
* [Koa](https://koajs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Material UI](https://material-ui.com/)

## Installation

1. Register your app and obtain OAuth 2.0 client keys at [Google APIs](https://console.developers.google.com/).

2. Subscribe you app to the YouTube v3 API and obtain an API key for the API.
3. Clone the repository.
```sh
git clone https://github.com/your_username_/Project-Name.git
```
3. Install NPM packages for both client and server by running the following command separately in the *client* and the *server* directory:
```sh
npm install
```
4. Specify the following environment variables either in the server environment, or in a *.env* file inside the *server* directory:

  - GOOGLE_CLIENT_ID - client ID obtained from Google
  - GOOGLE_CLIENT_SECRET - client secret key obtained from Google
  - GOOGLE_REDIRECT_URI - callback URL specified in Google APIs (e.g. *http://localhost:3001/login/google-cb*)
  - CLIENT_URL - URL of the client part of the application, including port number (e.g. *http://localhost:3000*)
  - SERVER_HOST - host name on which the server is running (e.g. *localhost*)
  - SERVER_PORT - port on which the server is running (e.g. *3001*)
  - MONGODB_URI - connection URI for MongoDB (e.g. *mongodb://localhost:27017/devfitvid*)
  - SERVER_JWT_SECRET - secure secret for JWT signing

5. Specify the following environment variables either in the client environment, or in a *.env* file inside the *client* directory:

- REACT_APP_SERVER_URL - URL of the server part of the application, including port number (e.g. *http://localhost:3000*)
- REACT_APP_GOOGLE_API_KEY - API key for YouTube v3 API obtained from [Google APIs](https://console.developers.google.com/)

## Usage




## Contributors
- [Petr Penicka](https://github.com/ppenicka)
- [Pier Andrea Delise](https://github.com/pierandread)
- [Raphael Sutter](https://github.com/raphael39)
- [Ishi Agozino](https://github.com/Slug-Man)

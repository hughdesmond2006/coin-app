# Hugh's Pluto Screener

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To run in dev mode (using coinmarketcap test api):

### `npm run serve-dev`
### `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

To run in prod mode (using the real coinmarketcap api) please first replace the following in config.js with your coinmarketcap api key:

const prod = {
  app: {
    COINMARKET_API_URL: "https://pro-api.coinmarketcap.com",
    COINMARKET_API_KEY: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  },
};

Then run:

### `npm run serve-prod`
### `npm run start`

To runs tests

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

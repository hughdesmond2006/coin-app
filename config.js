const env = process.env.NODE_ENV;

const dev = {
  app: {
    COINMARKET_API_URL: "https://sandbox-api.coinmarketcap.com",
    COINMARKET_API_KEY: "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
  },
};

const prod = {
  app: {
    COINMARKET_API_URL: "https://pro-api.coinmarketcap.com",
    COINMARKET_API_KEY: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  },
};

const config = {
  dev,
  prod,
};

module.exports = config[env];

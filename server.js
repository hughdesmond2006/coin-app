const express = require("express");
const axios = require("axios");
const app = express();
const config = require("./config");
const cors = require("cors");

app.use(cors());

if (process.env.NODE_ENV === "dev") {
  // log each axios request for troubleshooting issues
  axios.interceptors.request.use((request) => {
    console.log("Axios Request:", JSON.stringify(request, null, 2));
    return request;
  });
}

const coinAPI = (
  endpoint = "v1/cryptocurrency/listings/latest",
  params = { limit: 5000 }
) => {
  let response;
  return new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(
        `${config.app.COINMARKET_API_URL}/${endpoint}`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": config.app.COINMARKET_API_KEY,
          },
          params,
        }
      );
    } catch (e) {
      // error
      console.log(e);
      reject(e);
    }

    if (response?.data) {
      // success
      const json = response.data;
      console.log(json);
      resolve(json);
    }
  });
};

app.get("/", (req, res) => {
  res.send("Coin App Node Server Is Running Here..");
});

app.get("/coinList", async (req, res, next) => {
  try {
    const data = await coinAPI();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

app.get("/coinInfo", async (req, res, next) => {
  try {
    const data = await coinAPI("v2/cryptocurrency/info", {
      symbol: req.query.symbol,
    });
    res.json(data);
  } catch (e) {
    next(e);
  }
});

app.listen(2020);

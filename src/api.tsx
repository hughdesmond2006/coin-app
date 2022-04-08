import axios from "axios";

export const getCoinList = () =>
  axios.get(`${process.env.REACT_APP_API_URL!}/coinList`);

export const getCoinInfo = (symbol) =>
  axios.get(`${process.env.REACT_APP_API_URL!}/coinInfo`, {
    params: { symbol },
  });

import axios from "axios";
import { infoData, listData } from "./testData";

export const getCoinList = async () => {
  return listData;
  const res = await axios.get(`${process.env.REACT_APP_API_URL!}/coinList`);
  return res.data.data;
};

export const getCoinInfo = async (symbol) => {
  return infoData;
  const res = await axios.get(`${process.env.REACT_APP_API_URL!}/coinInfo`, {
    params: { symbol },
  });
  return res.data.data;
};

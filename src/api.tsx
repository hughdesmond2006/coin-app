import axios from "axios";

export const getCoinList = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL!}/coinList`);
  return res.data.data;
};

export const getCoinInfo = async (symbol) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL!}/coinInfo`, {
    params: { symbol },
  });
  return res.data.data;
};

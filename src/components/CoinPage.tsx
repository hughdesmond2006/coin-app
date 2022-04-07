import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getCoinInfo } from "../api";

interface coinInfo {
  logo: string;
  name: string;
  description: string;
  urls: {
    website: string[];
    technical_doc: string[];
    twitter: string[];
    reddit: string[];
    message_board: string[];
    announcement: string[];
    chat: string[];
    explorer: string[];
    source_code: string[];
  };
}

const CoinPage = () => {
  const [data, setData] = useState<coinInfo>();

  let params = useParams();

  // init load
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    let response;

    try {
      response = await getCoinInfo(params.symbol);

      if (response?.data && params.symbol) {
        console.log(
          "info:",
          response.data[params.symbol.toLocaleUpperCase()][0]
        );
        setData(response.data[params.symbol.toLocaleUpperCase()][0]);
      } else {
        throw new Error(`incorrect response data: ${response}`);
      }
    } catch (e) {
      console.log("Error!", e);
    }
  };

  return (
    <>
      <s.Link to={`/`}>
        <s.back>{"<< Back"}</s.back>
      </s.Link>
      <s.coinPage>
        <s.id>THIS IS COINPAGE: {params.symbol}</s.id>
        <s.imgLogo src={data?.logo}/>
        <s.name>{data?.name}</s.name>
        <s.description>{data?.description}</s.description>
        {data?.urls &&
          data?.urls.website.map((url) => <s.url key={url}>{url}</s.url>)}
      </s.coinPage>
    </>
  );
};

const s = {
  Link: styled(Link)`
    text-decoration: none;
    color: inherit;
  `,
  coinPage: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: grey;
    height: 400px;
    width: 100%;
  `,
  back: styled.div`
    background: green;
    color: white;
    border: 1px solid black;
    text-align: center;
    padding: 0.5rem;
  `,
  id: styled.div`
    font-size: 20px;
  `,
  imgLogo: styled.img``,
  name: styled.div``,
  description: styled.div``,
  url: styled.div`
    color: purple;
  `,
  urlCategory: styled.div`
    background: wheat;
  `,
};

export default CoinPage;

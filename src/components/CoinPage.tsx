import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { getCoinInfo } from "../api";
import { Tag } from "antd";
import {
  GithubFilled,
  TwitterOutlined,
  RedditCircleFilled,
  FacebookFilled,
} from "@ant-design/icons";

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
    facebook: string[];
  };
  tags: string[];
}

const CoinPage = () => {
  const [data, setData] = useState<coinInfo>();

  let params = useParams();

  if (process.env.NODE_ENV === "development") {
    console.log("info", data);
  }

  const g = data?.urls?.source_code;
  const t = data?.urls?.twitter;
  const r = data?.urls?.reddit;
  const f = data?.urls?.facebook;

  const gitURL = g && g.find((x) => x.includes("git"));
  const twitterURL = t && t.length > 0 && t[0];
  const redditURL = r && r.length > 0 && r[0];
  const facebookURL = f && f.length > 0 && f[0];

  // init load
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    let d;

    try {
      d = await getCoinInfo(params.symbol);

      if (d && params.symbol) {
        let temp = d[params.symbol.toLocaleUpperCase()];

        if (Array.isArray(temp)) {
          setData(temp[0])
        } else {
          setData(temp)
        }
      } else {
        throw new Error(`incorrect response data: ${d}`);
      }
    } catch (e) {
      console.log("Error!", e);
    }
  };

  return (
    <div data-testid="info_container">
      <s.Link to={`/`}>
        <s.back>{"<< Back"}</s.back>
      </s.Link>
      <s.coinPage>
        <s.imgLogo src={data?.logo} alt="Coin Logo" />
        <s.symbol>{params.symbol}</s.symbol>
        <s.name>{data?.name}</s.name>
        <s.description>{data?.description}</s.description>
        <s.tagContainer>
          {data?.tags &&
            data?.tags
              .slice(0, 12)
              .map((tag) => <s.Tag key={tag}>{tag}</s.Tag>)}
        </s.tagContainer>
        {data?.urls &&
          data?.urls.website.map((url) => <s.url key={url}>{url}</s.url>)}
        <s.iconContainer>
          {gitURL && (
            <s.iconLink href={gitURL} title="git">
              <GithubFilled style={{ color: "#ffffff" }} />
            </s.iconLink>
          )}
          {twitterURL && (
            <s.iconLink href={twitterURL} title="twitter">
              <TwitterOutlined style={{ color: "#55ACEE" }} />
            </s.iconLink>
          )}
          {redditURL && (
            <s.iconLink href={redditURL} title="reddit">
              <RedditCircleFilled style={{ color: "#F74300" }} />
            </s.iconLink>
          )}
          {facebookURL && (
            <s.iconLink href={facebookURL} title="facebook">
              <FacebookFilled style={{ color: "#3B5998" }} />
            </s.iconLink>
          )}
        </s.iconContainer>
      </s.coinPage>
    </div>
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
    background: var(--bg-light-color);
    width: 100%;
    padding: 1rem;
  `,
  back: styled.div`
    color: white;
    border: 1px solid black;
    text-align: center;
    padding: 0.5rem;
  `,
  symbol: styled.div`
    font-size: 1rem;
    opacity: 0.5;
    margin-top: 0.5rem;
  `,
  imgLogo: styled.img`
    width: 2.5rem;
  `,
  name: styled.h1`
    font-size: 1.5rem;
  `,
  description: styled.p`
    margin-bottom: 1rem;
    max-width: 600px;
  `,
  tagContainer: styled.div`
    display: flex;
    margin-bottom: 1rem;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  `,
  Tag: styled(Tag)`
    display: inline-block;
    margin: 0.2rem;
  `,
  url: styled.a`
    color: var(--link-color);
    :hover {
      color: var(--link-color2);
    }
  `,
  iconLink: styled.a`
    font-size: 1.5rem;
    margin: 0 0.5rem;
    :hover {
      opacity: 0.7;
    }
  `,
  iconContainer: styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
  `,
};

export default CoinPage;

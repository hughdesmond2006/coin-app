import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface props {
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
}

const CoinCard = ({ name, symbol, price, priceChange }: props) => {
  const priceFormatted = `$${price.toFixed(4)}`;
  const priceChangeFormatted = `${
    priceChange > 0 ? "\u2191" : "\u2193"
  } ${Math.abs(priceChange).toFixed(4)}`;

  return (
    <s.Link to={`/currencies/${symbol}`}>
      <s.coinCard>
        <s.name>{name}</s.name>
        <s.symbol>{symbol}</s.symbol>
        <s.price>{priceFormatted}</s.price>
        <s.priceChange>{priceChangeFormatted}</s.priceChange>
      </s.coinCard>
    </s.Link>
  );
};

const s = {
  Link: styled(Link)`
    text-decoration: none;
    color: inherit;
    margin: 1rem;
  `,
  coinCard: styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid grey;
    border-radius: 0.5rem;
    background-color: #ece3ca;
    width: 25rem;
  `,
  name: styled.div`
    font-size: 2rem;
  `,
  symbol: styled.div`
    color: #666666;
  `,
  price: styled.div`
    font-weight: bold;
  `,
  priceChange: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
};

export default CoinCard;

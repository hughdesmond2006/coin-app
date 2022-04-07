import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { ethers } from "ethers";

const WalletConnector = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connect = async () => {
    try {
      //await activate(injected);

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      setConnected(true);

      setAddress(await signer.getAddress());

      console.log("block num:", await provider.getBlockNumber());
      console.log("provider:", provider);

      const balance = await provider.getBalance("ethers.eth");

      const balFormatted = ethers.utils.formatEther(balance);

      const toWei = ethers.utils.parseEther("1.0");

      console.log("balFormatted", balFormatted);
      console.log("toWei", toWei);

      localStorage.setItem("isWalletConnected", "true");
    } catch (e) {
      console.log(e);
    }
  };

  const disconnect = () => {
    try {
      //deactivate();
      localStorage.setItem("isWalletConnected", "false");
    } catch (e) {
      console.log(e);
    }
  };

  // init load
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          //await activate(injected);
          localStorage.setItem("isWalletConnected", "true");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <s.wrapper>
      {connected ? (
        <s.Text>
          Connected with <b>{address}</b>
        </s.Text>
      ) : (
        <s.btnConnect onClick={connect}>Connect to MetaMask</s.btnConnect>
      )}
    </s.wrapper>
  );
};

const s = {
  wrapper: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  btnConnect: styled(Button)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  btnDisconnect: styled(Button)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Text: styled(Typography.Text)`
    padding: 1rem;
  `,
};

export default WalletConnector;

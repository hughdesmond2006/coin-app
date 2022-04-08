import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { ethers } from "ethers";

const WalletConnector = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  const connect = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );

      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      setConnected(true);

      setAddress(await signer.getAddress());

      const balance = await provider.getBalance("ethers.eth");
      const balFormatted = ethers.utils.formatEther(balance);
      const toWei = ethers.utils.parseEther("1.0");

      localStorage.setItem("isWalletConnected", "true");
    } catch (e) {
      console.log(e);
    }
  };

  // init load
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await connect();
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
    margin: 0.4rem;
  `,
  Text: styled(Typography.Text)`
    padding: 1rem;
  `,
};

export default WalletConnector;

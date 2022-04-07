import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "./connectors";
import styled from "styled-components";
import { Button, Typography } from "antd";

const WalletConnector = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", "true");
    } catch (e) {
      console.log(e);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
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
          await activate(injected);
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
      <s.btnConnect onClick={connect}>Connect to MetaMask</s.btnConnect>
      {active ? (
        <s.Text>
          Connected with <b>{account}</b>
        </s.Text>
      ) : (
        <s.Text>Not connected</s.Text>
      )}
      <s.btnDisconnect onClick={disconnect}>Disconnect</s.btnDisconnect>
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
  Text: styled(Typography.Text)``,
};

export default WalletConnector;

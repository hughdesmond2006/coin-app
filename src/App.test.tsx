/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import CoinPage from "./components/CoinPage";
import { listData, infoData } from "./testData";
import { getCoinList, getCoinInfo } from "./api";
import "@testing-library/jest-dom";

jest.mock("./api");

const m_getCoinList = getCoinList as jest.MockedFunction<typeof getCoinList>;
const m_getCoinInfo = getCoinInfo as jest.MockedFunction<typeof getCoinInfo>;

const fullApp = (
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/currencies/:symbol" element={<CoinPage />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </MemoryRouter>
);

describe("test", () => {
  beforeAll(() => {
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  });

  beforeEach(() => {
    m_getCoinList.mockResolvedValue(listData);
    m_getCoinInfo.mockResolvedValue(infoData);
  });

  afterEach(() => {
    cleanup();
  });

  describe("the basics", () => {
    test("app runs", async () => {
      render(fullApp);

      await waitFor(() => expect(m_getCoinList).toHaveBeenCalledTimes(1));

      //verify homepage
      expect(screen.getByText(/Hugh's Coin App/i)).toBeInTheDocument();
      expect(screen.getByText(/price change 24/i)).toBeInTheDocument();
    });

    test("ethereum happy path", async () => {
      render(fullApp);

      await waitFor(() => expect(m_getCoinList).toHaveBeenCalledTimes(1));

      fireEvent.click(screen.getByTestId("search_icon"));

      await screen.findByPlaceholderText(/search symbol/i);
      fireEvent.change(screen.getByPlaceholderText(/search symbol/i), {
        target: { value: "ETH" },
      });
      fireEvent.click(screen.getByText(/search/i));

      await screen.findByText("ETH");
      fireEvent.click(screen.getByText("Ethereum"));

      await waitFor(() => expect(m_getCoinInfo).toHaveBeenCalledTimes(1));

      await screen.findByTestId("info_container");

      expect(
        screen.getByText(
          /Users are able to generate ETH through the process of mining. Ethereum has a current supply of 120,269,998.624./
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText("three-arrows-capital-portfolio")
      ).toBeInTheDocument();

      expect(screen.getByAltText("Coin Logo")).toHaveAttribute(
        "src",
        "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
      );

      expect(screen.getByTitle("twitter").closest("a")).toHaveAttribute(
        "href",
        "https://twitter.com/ethereum"
      );
    });
  });

  describe("table sorting", () => {
    test("sort by name", async () => {
      render(fullApp);

      await waitFor(() => expect(m_getCoinList).toHaveBeenCalledTimes(1));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bitcoin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AVAX");

      fireEvent.click(screen.getByRole("columnheader", { name: /Name/ }));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("0x");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AR");

      fireEvent.click(screen.getByRole("columnheader", { name: /Name/ }));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Zilliqa");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("WIN");

      fireEvent.click(screen.getByRole("columnheader", { name: /Name/ }));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bitcoin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AVAX");
    });

    test("sort by symbol", async () => {
      render(fullApp);

      await waitFor(() => expect(m_getCoinList).toHaveBeenCalledTimes(1));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bitcoin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AVAX");

      fireEvent.click(screen.getByRole("columnheader", { name: /Symbol/ }));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("1INCH");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("$23.853");

      fireEvent.click(screen.getByRole("columnheader", { name: /Symbol/ }));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("ZRX");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("$0.696");

      fireEvent.click(screen.getByRole("columnheader", { name: /Symbol/ }));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bitcoin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AVAX");
    });

    test("sort by price", async () => {
      render(fullApp);

      await waitFor(() => expect(m_getCoinList).toHaveBeenCalledTimes(1));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bitcoin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AVAX");

      const priceCol = screen.getByText(
        (c, e) => c.startsWith("Price") && !c.includes("Change 24")
      );

      fireEvent.click(priceCol);

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Dogelon Mars");
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("$0");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Holo");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("$0.005");

      fireEvent.click(priceCol);

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("renBTC");
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("$39,672.757");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("GNO");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("$332.856");

      fireEvent.click(priceCol);

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bitcoin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AVAX");
    });

    test("sort by price change", async () => {
      render(fullApp);

      await waitFor(() => expect(m_getCoinList).toHaveBeenCalledTimes(1));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bitcoin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AVAX");

      fireEvent.click(screen.getByText(/Price Change 24/));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("ANC");
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("20.13%");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("REN");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("13.65%");

      fireEvent.click(screen.getByText(/Price Change 24/));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("GMT");
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("5.65%");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Tether");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("0%");

      fireEvent.click(screen.getByText(/Price Change 24/));

      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Bitcoin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("AVAX");
    });
  });
});

import { useEffect, useState } from "react";
import "./App.css";
import { getCoinList } from "./api";
import styled from "styled-components";
//import CoinCard from "./components/CoinCard";
import { Button, Input, Typography, Space, Table } from "antd";
import 'antd/dist/antd.dark.css';
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  CaretUpFilled,
  CaretDownFilled,
} from "@ant-design/icons";
import WalletConnector from "./components/WalletConnector";

interface quoteData {
  price: number;
  percent_change_24h: number;
}

interface coinData {
  name: string;
  symbol: string;
  quote: {
    BTC: quoteData;
    USD: quoteData;
  };
}

const App = () => {
  const [data, setData] = useState<coinData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchCol, setSearchCol] = useState("");

  let navigate = useNavigate();

  // init load
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const fetchData = async () => {
    let response;

    try {
      response = await getCoinList();

      if (response?.data) {
        console.log("data:", response.data.data);
        setData(response.data.data);
      } else {
        throw new Error();
      }
    } catch (e) {
      console.log("Error!", e);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={searchText}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : []);
            setSearchText(e.target.value);
          }}
          onPressEnter={() => handleSearch(searchText, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(searchText, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              setSelectedKeys([]);
              handleReset(confirm);
            }}
            size="small"
            style={{ width: 90 }}
          >
            Clear
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchCol === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (searchTerm, confirm, dataIndex) => {
    confirm();
    setSearchText(searchTerm);
    setSearchCol(dataIndex);
  };

  const handleReset = (confirm) => {
    confirm();
    setSearchText("");
    setSearchCol("");
  };

  const columns = [
    {
      title: "Name",
      key: "id",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      ...getColumnSearchProps("symbol"),
    },
    {
      title: "Price",
      align: "right" as "right",
      render: (x) => new Intl.NumberFormat().format(x.quote.USD.price),
      sorter: (a, b) => a.quote.USD.price - b.quote.USD.price,
    },
    {
      title: "Price Change 24h",
      align: "right" as "right",
      render: (x) => {
        const val = x.quote.USD.percent_change_24h.toFixed(2);
        const color = `var(--${val < 0 ? "down" : "up"}-color)`;
        return (
          <div style={{ color }}>
            {val < 0 ? <CaretDownFilled /> : <CaretUpFilled />}
            {Math.abs(val) + "%"}
          </div>
        );
      },
      sorter: (a, b) =>
        a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h,
    },
  ];

  return (
    <s.app className="App">
      <s.Title level={4}>Hugh's Pluto Screener</s.Title>
      <WalletConnector />
      <Table
        style={{ maxWidth: "40rem" }}
        rowClassName="clickableRow"
        size="small"
        showSorterTooltip={false}
        pagination={{ position: ["topRight", "bottomRight"] }}
        columns={columns}
        dataSource={data}
        rowKey="symbol"
        loading={loading}
        tableLayout="fixed"
        onRow={(record) => ({
          onClick: (event) => {
            event.stopPropagation();
            navigate(`currencies/${record.symbol}`, { replace: true });
          },
        })}
      />

      {/* Thought id leave this here to show how development progressed.. A simple div 
      based card list was upgraded to an antd table with sorting/pagination etc.. */}
      {/* {data &&
        data.map((coin) => (
          <CoinCard
            key={coin.symbol}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.quote.USD.price}
            priceChange={coin.quote.USD.percent_change_24h}
          />
        ))} */}
    </s.app>
  );
};

const s = {
  app: styled.div`
    padding: 0.5rem;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Title: styled(Typography.Title)``,
};

export default App;

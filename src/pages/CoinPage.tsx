import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import ChartPage from "./ChartPage";
import PricePage from "./PricePage";

const Container = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 700px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  padding: 100px 0;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const TabMeet = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 15px;
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  state: {
    name: string;
  };
}
// info typescript
interface Info {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
// priceInfo typescript
interface PriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function CoinPage() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<Info>();
  const [priceInfo, setPriceInfo] = useState<PriceInfo>();
  const { coinId } = useParams<string>();

  const { state } = useLocation() as RouteState;

  useEffect(() => {
    axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) => {
      setInfo(res.data);
      // console.log(res.data);
    });

    axios
      .get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      .then((res) => {
        setPriceInfo(res.data);
        console.log(res.data);
      });

    setLoading(false);
  }, [coinId]);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading" : info?.name}
        </Title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <TabMeet>
            <Tab>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <hr />
            <Tab>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </TabMeet>

          {/* nested Route */}
          <Routes>
            <Route path="/price" element={<PricePage />} />

            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default CoinPage;

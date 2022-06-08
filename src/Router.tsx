import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChartPage from "./pages/ChartPage";
import CoinPage from "./pages/CoinPage";
import CoinsPage from "./pages/CoinsPage";
import PricePage from "./pages/PricePage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CoinsPage />} />
        <Route path="/:coinId/*" element={<CoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

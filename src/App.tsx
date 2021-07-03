import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplicationLayout from "./components/ApplicationLayout";
import EthGraph from "./components/Eth/EthGraph";
import HistoryProvider from "./providers/HistoryProvider";
import History from "./components/History";
import LeftDrawerTriage from "./components/LeftDrawerTriage";
import AlgoGraph from "./components/Algo/AlgoGraph";

export default function App() {
  return (
    <BrowserRouter>
      <HistoryProvider>
        <ApplicationLayout
          leftDrawer={<LeftDrawerTriage />}
          rightDrawer={<History />}
        >
          <div style={{ padding: "10px" }}>
            <Routes>
              <Route path="/eth/*" element={<EthGraph />} />
              <Route path="/algo/*" element={<AlgoGraph />} />
            </Routes>
          </div>
        </ApplicationLayout>
      </HistoryProvider>
    </BrowserRouter>
  );
}

import { useNavigate } from "react-router";
import CryptoGraph from "../CryptoGraph";
import AlgoQueryManager from "./AlgoQueryManager";

export default function EthGraph() {
  const navigate = useNavigate();
  const onSelection = (type: "address" | "transaction", id: string) => {
    navigate(`/algo/${type}/${id}`);
  };

  return (
    <CryptoGraph
      onSelection={onSelection}
      blockchainQueryManager={AlgoQueryManager}
    />
  );
}

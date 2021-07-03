import { useNavigate } from "react-router";
import CryptoGraph from "../CryptoGraph";
import EthQueryManager from "./EthQueryManager";

export default function EthGraph() {
  const navigate = useNavigate();
  const onSelection = (type: "address" | "transaction", id: string) => {
    navigate(`/eth/${type}/${id}`);
  };

  return (
    <CryptoGraph
      onSelection={onSelection}
      blockchainQueryManager={EthQueryManager}
    />
  );
}

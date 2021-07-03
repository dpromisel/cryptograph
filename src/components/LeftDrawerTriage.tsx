import { Params, useLocation, useParams } from "react-router";
import AlgoAccount from "./Algo/AlgoAccount";
import AlgoTransaction from "./Algo/AlgoTransaction";
import EthAddress from "./Eth/EthAddress";
import EthTransaction from "./Eth/EthTransaction";

export default function LeftDrawerTriage() {
  const { pathname } = useLocation();
  const tokens = pathname.substring(1).split("/");

  if (tokens[0] === "eth") {
    if (tokens[1] === "transaction") {
      return <EthTransaction txId={tokens[2]} />;
    } else if (tokens[1] === "address") {
      return <EthAddress address={tokens[2]} />;
    }
  } else if (tokens[0] === "algo") {
    if (tokens[1] === "transaction") {
      return <AlgoTransaction txId={tokens[2]} />;
    } else if (tokens[1] === "address") {
      return <AlgoAccount address={tokens[2]} />;
    }
  }

  return <> Nothing to do here. </>;
}

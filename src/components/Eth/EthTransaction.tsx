import { useQuery } from "react-query";
import { getTransaction } from "./EthQueryManager";
import InfoList from "../InfoList";

export default function EthTransaction({ txId }: { txId: string }) {
  const { data }: any = useQuery(["eth", "tx", txId], () => {
    return getTransaction(txId);
  });

  if (data) {
    const { tx } = data;

    const mapping: {
      key: string;
      label: string;
      value: string;
      split: boolean;
      link: string;
    }[] = [
      {
        key: "hash",
        label: "Hash",
        value: tx.hash,
        split: true,
        link: `https://etherscan.io/tx/${tx.hash}`,
      },
      {
        key: "value",
        label: "Value",
        value: `${(Number(tx.value) / Math.pow(10, 19)).toPrecision(8)} Eth`,
        split: false,
        link: ``,
      },
      {
        key: "blockNumber",
        label: "Block",
        value: `${tx.blockNumber}`,
        split: false,
        link: `https://etherscan.io/block/${tx.hash}`,
      },
      {
        key: "from",
        label: "Sender Address",
        value: `${tx.from}`,
        split: true,
        link: `https://etherscan.io/address/${tx.from}`,
      },
      {
        key: "to",
        label: "Reciever Address",
        value: `${tx.to}`,
        split: true,
        link: `https://etherscan.io/address/${tx.to}`,
      },
    ];

    return <InfoList mapping={mapping} header="Transaction" />;
  }

  return null;
}

import { useQuery } from "react-query";
import { getTransaction } from "./AlgoQueryManager";
import InfoList from "../InfoList";

export default function AlgofTransaction({ txId }: { txId: string }) {
  const { data } = useQuery(["algo", "tx", txId], async () => {
    return await getTransaction(txId).then((val) => val?.transaction);
  });

  // "close-rewards": number;
  // "closing-amount": number;
  // "confirmed-round": number;
  // fee: number;
  // "first-valid": number;
  // "genesis-hash": string;
  // id: string;
  // "intra-round-offset": number;
  // "last-valid": number;
  // "payment-transaction": PaymentTransaction;
  // "receiver-rewards": number;
  // "round-time": number;
  // sender: string;
  // "sender-rewards": number;
  // signature: Signature;
  // "tx-type": string;

  if (data) {
    const mapping: {
      key: string;
      label: string;
      value: string;
      link: string;
    }[] = [
      {
        key: "id",
        label: "ID",
        value: data.id,
        link: `https://algoexplorer.io/tx/${data.id}`,
      },
      {
        key: "sender",
        label: "Sender",
        value: `${data.sender}`,
        link: ``,
      },
      {
        key: "reciever",
        label: "Reciever",
        value: `${data["payment-transaction"].receiver}`,
        link: ``,
      },
      {
        key: "amount",
        label: "Value",
        value: `${data["payment-transaction"].amount / Math.pow(10, 6)}`,
        link: ``,
      },
      {
        key: "fee",
        label: "Fee",
        value: `${data.fee / Math.pow(10, 6)}`,
        link: ``,
      },
      {
        key: "confirmed-round",
        label: "Confirmed Round",
        value: `${data["confirmed-round"]}`,
        link: `https://algoexplorer.io/block/${data["confirmed-round"]}`,
      },
      {
        key: "",
        label: "Confirmed Time",
        value: `${new Date(data["round-time"] * 1000).toString()}`,
        link: ``,
      },
    ];

    return <InfoList mapping={mapping} header="Transaction" />;
  }

  return null;
}

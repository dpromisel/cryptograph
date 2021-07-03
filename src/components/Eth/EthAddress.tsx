import { useQuery } from "react-query";
import { getAddress } from "./EthQueryManager";
import InfoList from "../InfoList";

export default function EthAddress({ address }: { address: string }) {
  const { data } = useQuery(["account", address], () => {
    return getAddress(address);
  });

  if (data) {
    const mapping: {
      key: string;
      label: string;
      value: string;
      split: boolean;
      link: string;
    }[] = [
      {
        key: "address",
        label: "Address",
        value: data.address,
        split: true,
        link: `https://etherscan.io/address/${data.address}`,
      },
      {
        key: "balance",
        label: "Balance",
        value: `${(Number(data.balance) / Math.pow(10, 19)).toPrecision(
          8
        )} Eth`,
        split: false,
        link: ``,
      },
      {
        key: "n_tx",
        label: "Total Transactions",
        value: `${data.n_tx}`,
        split: false,
        link: ``,
      },
      {
        key: "total_recieved",
        label: "Total Recieved",
        value: `${(Number(data.total_received) / Math.pow(10, 19)).toPrecision(
          8
        )} Eth`,
        split: false,
        link: ``,
      },
      {
        key: "total_sent",
        label: "Total Sent",
        value: `${(Number(data.total_sent) / Math.pow(10, 19)).toPrecision(
          8
        )} Eth`,
        split: false,
        link: ``,
      },
    ];

    return <InfoList mapping={mapping} header="Account" />;
  }

  return null;
}

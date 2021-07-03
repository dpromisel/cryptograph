import { useQuery } from "react-query";
import { getAccount } from "./AlgoQueryManager";
import InfoList from "../InfoList";

export default function AlgoAccount({ address }: { address: string }) {
  const { data } = useQuery(["algo", "account", address], async () => {
    return await getAccount(address).then((val) => val.account);
  });

  //   address: string;
  //   amount: number;
  //   "amount-without-pending-rewards": number;
  //   assets: Asset[];
  //   "created-at-round": number;
  //   deleted: boolean;
  //   "pending-rewards": number;
  //   "reward-base": number;
  //   rewards: number;
  //   round: number;
  //   "sig-type": string;
  //   status: string;

  if (data) {
    const mapping: {
      key: string;
      label: string;
      value: string;
      link: string;
    }[] = [
      {
        key: "address",
        label: "Address",
        value: data.address,
        link: `https://algoexplorer.io/address/${data.address}`,
      },
      {
        key: "amount",
        label: "Balance",
        value: `${data.amount / Math.pow(10, 6)} Algos`,
        link: ``,
      },
      {
        key: "rewards",
        label: "Rewards",
        value: `${data.rewards / Math.pow(10, 6)} Algos`,
        link: ``,
      },
      {
        key: "pending-rewards",
        label: "Pending Rewards",
        value: `${data["pending-rewards"] / Math.pow(10, 6)} Algos`,
        link: ``,
      },
      {
        key: "assets",
        label: "Assets",
        value: `${data.assets ? data.assets.length : 0}`,
        link: ``,
      },
      {
        key: "sig-type",
        label: "Signature Type",
        value: data["sig-type"],
        link: ``,
      },
      {
        key: "status",
        label: "Status",
        value: data.status,
        link: ``,
      },
    ];

    return <InfoList mapping={mapping} header="Account" />;
  }

  return null;
}

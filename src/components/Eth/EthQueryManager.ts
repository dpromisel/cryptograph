import { Edge } from "@sayari/trellis";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import {
  BlockchainQueryManager,
  BlockchainTransaction,
} from "../BlockchainQueryManager";

const web3 = createAlchemyWeb3(
  "wss://eth-mainnet.ws.alchemyapi.io/ws/o0gHhMHwTKY9IxH0yzvew3jJEidZhlZm"
);

const EthQueryManager: BlockchainQueryManager = {
  getAccount: async (address: string) => {
    const result = await web3.alchemy.getAssetTransfers({
      fromBlock: "0x000000",
      toBlock: "0xC0EA68",
      fromAddress: address,
      maxCount: 10,
    });

    const balance = await web3.eth.getBalance(address);
    const transactions: { [txHash: string]: BlockchainTransaction } = {};

    await result?.transfers.forEach((transfer) => {
      if (!transactions[transfer.hash]) {
        transactions[transfer.hash] = {
          sender: transfer.from,
          recipient: transfer.to,
          amount: transfer.value,
          hash: transfer.hash,
          blockNum: transfer.blockNum,
        };
      }
    });

    return {
      address,
      balance: Number(balance) / Math.pow(10, 19),
      transactions,
    };
  },

  getTransaction: async (tx_hash: string) => {
    const tx = await web3.eth.getTransaction(tx_hash);
    return {
      sender: tx.from,
      recipient: tx.to,
      amount: Number(tx.value),
      hash: tx.hash,
      blockNum: `${tx.blockNumber}`,
    };
  },

  getBlock: async (block_num) => {
    return null;
  },
};

export default EthQueryManager;

// export async function getTransfers(nodeAddress: string) {
//   const result = await web3.alchemy.getAssetTransfers({
//     fromBlock: "0x000000",
//     toBlock: "0xC0EA68",
//     fromAddress: nodeAddress,
//     maxCount: 10,
//   });

//   const newNodes = new Set<string>();
//   const newEdges: {
//     [hash: string]: Edge;
//   } = {};
//   await result?.transfers.forEach((transfer: any) => {
//     newNodes.add(transfer.from).add(transfer.to);
// if (!newEdges[transfer.hash]) {
//   newEdges[transfer.hash] = {
//     source: transfer.from,
//     target: transfer.to,
//     label: transfer.value,
//     id: transfer.hash,
//   };
//     }
//   });

//   return { newNodes, newEdges };
// }

// export const getBalances = async (nodeAddress: string[]) => {
//   const balances: { [addr: string]: number } = {};
//   await Promise.all(
//     nodeAddress.map(async (addr) => {
//       const balance = await web3.eth.getBalance(addr);
//       balances[addr] = Number(balance) / Math.pow(10, 19);
//     })
//   );
//   return balances;
// };

export const getAddress = async (addr: string): Promise<EthAddress> => {
  return await (
    await fetch(
      `https://api.blockcypher.com/v1/eth/main/addrs/${addr}?limit=10`
    )
  ).json();
};

export const getTransaction = async (addr: string) => {
  if (addr) {
    const tx = await web3.eth.getTransaction(addr);
    if (tx) {
      const from = await web3.eth.getBalance(tx.from);
      const to = await web3.eth.getBalance(tx.to);
      const fromBalance = Number(from) / Math.pow(10, 19);
      const toBalance = Number(to) / Math.pow(10, 19);
      return { tx, fromBalance, toBalance };
    }
  }
  return undefined;
};

export interface EthAddress {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
  nonce: number;
  pool_nonce: number;
  txrefs: Txref[];
  hasMore: boolean;
  tx_url: string;
}

export interface Txref {
  tx_hash: string;
  block_height: number;
  tx_input_n: number;
  tx_output_n: number;
  value: number;
  ref_balance: number;
  confirmations: number;
  confirmed: Date;
  double_spend: boolean;
}

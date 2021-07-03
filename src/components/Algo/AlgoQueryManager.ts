import algosdk from "algosdk";
import {
  BlockchainQueryManager,
  BlockchainTransaction,
} from "../BlockchainQueryManager";

const token = {
  "X-API-Key": "CK9jABCcpAa2tzLOwZMQE1iEWR8tvFIwaRGEERo3",
};
const server = "https://mainnet-algorand.api.purestake.io/idx2";
const algodPort = "";
const algodClient = new algosdk.Indexer(token, server, algodPort);

const AlgoQueryManager: BlockchainQueryManager = {
  getAccount: async (accountId: string) => {
    const txs = await algodClient
      .lookupAccountTransactions(accountId)
      .limit(20)
      .do();

    const transactions: { [txHash: string]: BlockchainTransaction } = {};
    await txs?.transactions.forEach((transfer: any) => {
      if (transfer["tx-type"] === "pay") {
        if (!transactions[transfer.id]) {
          transactions[transfer.id] = {
            sender: transfer.sender,
            recipient: transfer["payment-transaction"].receiver,
            amount: transfer["payment-transaction"].amount / Math.pow(10, 6),
            hash: transfer.id,
            blockNum: transfer["confirmed-round"],
          };
        }
      }
    });

    const acc = await algodClient.lookupAccountByID(accountId).do();

    return {
      balance: acc.account.amount,
      transactions,
      address: accountId,
    };
  },
  getTransaction: async (txId: string) => {
    const { transaction: tx } = await algodClient
      .lookupTransactionByID(txId)
      .do();

    console.log(tx);
    if (tx["tx-type"] === "pay") {
      return {
        sender: tx.sender,
        recipient: tx["payment-transaction"].receiver,
        amount: tx["payment-transaction"].amount / Math.pow(10, 6),
        hash: tx.id,
        blockNum: tx["confirmed-round"],
      };
    }

    return null;
  },
  getBlock: async (blockNum: number) => {
    return null;
  },
};

export const getAccount = async (
  addr: string
): Promise<AlgoAccountResponse> => {
  return (await algodClient
    .lookupAccountByID(addr)
    .do()) as AlgoAccountResponse;
};

export const getTransaction = async (
  txId: string
): Promise<AlgoTransactionResponse> => {
  return (await algodClient
    .lookupTransactionByID(txId)
    .do()) as AlgoTransactionResponse;
};

export default AlgoQueryManager;

interface Asset {
  amount: number;
  "asset-id": number;
  creator: string;
  deleted: boolean;
  "is-frozen": boolean;
  "opted-in-at-round": number;
}

interface Account {
  address: string;
  amount: number;
  "amount-without-pending-rewards": number;
  assets: Asset[];
  "created-at-round": number;
  deleted: boolean;
  "pending-rewards": number;
  "reward-base": number;
  rewards: number;
  round: number;
  "sig-type": string;
  status: string;
}

interface AlgoAccountResponse {
  account: Account;
  "current-round": number;
}

export interface PaymentTransaction {
  amount: number;
  "close-amount": number;
  receiver: string;
}

export interface Signature {
  sig: string;
}

export interface Transaction {
  "close-rewards": number;
  "closing-amount": number;
  "confirmed-round": number;
  fee: number;
  "first-valid": number;
  "genesis-hash": string;
  id: string;
  "intra-round-offset": number;
  "last-valid": number;
  "payment-transaction": PaymentTransaction;
  "receiver-rewards": number;
  "round-time": number;
  sender: string;
  "sender-rewards": number;
  signature: Signature;
  "tx-type": string;
}

export interface AlgoTransactionResponse {
  "current-round": number;
  transaction: Transaction;
}

import { Edge } from "@sayari/trellis";

export interface BlockchainTransaction {
  blockNum: string;
  sender: string;
  recipient: string;
  hash: string;
  amount: number;
}

interface BlockchainAccount {
  address: string;
  balance: number;
  transactions: { [txHash: string]: BlockchainTransaction };
}

interface Block {
  transactions: { [txHash: string]: BlockchainTransaction }; // Dictionary of transactions
  previousHash: string; // Hexadecimal hash of a previous Block in the chain
  timestamp: number; // Unix time when Block was mined
}

export interface BlockchainQueryManager {
  getAccount(address: string): Promise<BlockchainAccount>;
  getTransaction(transaction: string): Promise<BlockchainTransaction>;
  getBlock(blockNumber: number): Promise<Block>;
}

import { Edge } from "@sayari/trellis";
import { BlockchainTransaction } from "../BlockchainQueryManager";

export function transactionToEdge(tx: BlockchainTransaction): Edge {
  return {
    source: tx.sender,
    target: tx.recipient,
    label: `${tx.amount}`,
    id: tx.hash,
  };
}

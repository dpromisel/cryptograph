import { Edge } from "@sayari/trellis";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import TrellisGraph from "./Trellis/TrellisGraph";
import { Grid } from "@material-ui/core";
import { useNavigate, useParams } from "react-router";
import { BlockchainQueryManager } from "./BlockchainQueryManager";
import { transactionToEdge } from "./Trellis/TrellisUtil";

interface CryptoGraphProps {
  blockchainQueryManager: BlockchainQueryManager;
  onSelection: (type: "address" | "transaction", id: string) => void;
}

export default function CryptoGraph({
  blockchainQueryManager,
  onSelection,
}: CryptoGraphProps) {
  const p = useParams();
  const navigate = useNavigate();

  const [nodes, setNodes] = useState<Set<string>>(new Set());
  const [edges, setEdges] = useState<{
    [hash: string]: Edge;
  }>({});

  const [selectedTransaction, setSelectedTransaction] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const tokens = p["*"].split("/");
    if (tokens[0] === "transaction") {
      setSelectedAddress("");
      setSelectedTransaction(tokens[1]);
    } else if (tokens[0] === "address") {
      setSelectedTransaction("");
      setSelectedAddress(tokens[1]);
    }
  }, [p, navigate]);

  useQuery(
    selectedAddress,
    async () => {
      return blockchainQueryManager.getAccount(selectedAddress);
    },
    {
      enabled: selectedAddress !== "",
      onSuccess: async (data) => {
        const newNodes = new Set(nodes);
        const newEdges = { ...edges };

        await Object.values(data.transactions).forEach((tx) => {
          newNodes.add(tx.sender).add(tx.recipient);
          if (!newEdges[tx.hash]) {
            newEdges[tx.hash] = transactionToEdge(tx);
          }
        });

        setNodes(newNodes);
        setEdges(newEdges);
      },
    }
  );

  useQuery(
    ["tx", selectedTransaction],
    () => {
      return blockchainQueryManager.getTransaction(selectedTransaction);
    },
    {
      enabled: selectedTransaction !== "",
      onSuccess: (data) => {
        if (data) {
          const newNodes = new Set(nodes);
          newNodes.add(data.recipient).add(data.sender);
          console.log(data);
          console.log(nodes, newNodes, data.recipient, data.sender);
          setNodes(newNodes);
          const newEdges = { ...edges };
          if (!newEdges[data.hash]) {
            newEdges[data.hash] = transactionToEdge(data);
            setEdges(newEdges);
          }
        }
      },
    }
  );

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12}>
          <TrellisGraph
            selectedAddress={selectedAddress}
            selectedTransaction={selectedTransaction}
            nodes={Array.from(nodes).map((node) => ({
              id: node,
              label: node,
              radius: 20,
            }))}
            edges={Object.values(edges)}
            onSelectAddress={(addr) => {
              if (addr) {
                onSelection("address", addr);
              }
            }}
            onSelectTransaction={(tx) => {
              if (tx) {
                onSelection("transaction", tx);
              }
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

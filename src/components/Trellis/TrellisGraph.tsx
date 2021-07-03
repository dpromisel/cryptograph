import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  getSelectionBounds,
  boundsToViewport,
  Node,
  Edge,
} from "@sayari/trellis";
import { withResizeDetector } from "react-resize-detector";
import * as Force from "@sayari/trellis/layout/force";
import { Renderer } from "@sayari/trellis/bindings/react/renderer";
import { styleNode } from "../../util";

const force = Force.Layout();

const Graph = ({
  width = 0,
  height = 0,
  targetRef,
  nodes,
  edges,
  selectedAddress,
  selectedTransaction,
  onSelectTransaction,
  onSelectAddress,
}: {
  width?: number;
  height?: number;
  targetRef?: any;
  nodes: Node[];
  edges: Edge[];
  selectedAddress: string;
  selectedTransaction: string;
  onSelectTransaction: (txId: string) => void;
  onSelectAddress: (addr: string) => void;
}) => {
  const _width = useRef(width);
  _width.current = width;

  const _height = useRef(width);
  _height.current = height;

  const [graph, setGraph] = useState({
    nodes: nodes,
    edges: edges,
    x: 0,
    y: 0,
    zoom: 1,
    hoverNode: undefined,
    hoverEdge: undefined,
    selected: new Set(),
  });

  useEffect(() => {
    force({ nodes, edges }).then(({ nodes, edges }: any) => {
      const { x, y, zoom } = boundsToViewport(getSelectionBounds(nodes, 60), {
        width: _width.current,
        height: _height.current,
      });
      setGraph((graph) => ({ ...graph, nodes, edges, x, y, zoom }));
    });
  }, [nodes, edges]);

  const onNodeDrag = useCallback(
    ({ nodeX, nodeY, target: { id, x = 0, y = 0 } }) => {
      const dx = nodeX - x;
      const dy = nodeY - y;

      setGraph((graph) => ({
        ...graph,
        nodes: graph.nodes.map((node) => {
          if (node.id === id || graph.selected.has(node.id)) {
            return { ...node, x: (node.x || 1) + dx, y: (node.y || 1) + dy };
          }
          return node;
        }, []),
      }));
    },
    []
  );

  const onViewportDrag = useCallback(({ viewportX: x, viewportY: y }) => {
    setGraph((graph) => ({ ...graph, x, y }));
  }, []);
  const onViewportWheel = useCallback(
    ({ viewportX: x, viewportY: y, viewportZoom: zoom }) => {
      setGraph((graph) => ({ ...graph, x, y, zoom }));
    },
    []
  );
  const onNodePointerEnter = useCallback(({ target: { id } }) => {
    setGraph((graph) => ({ ...graph, hoverNode: id }));
  }, []);
  const onNodePointerLeave = useCallback(() => {
    setGraph((graph) => ({ ...graph, hoverNode: undefined }));
  }, []);
  const onEdgePointerEnter = useCallback(({ target: { id } }) => {
    setGraph((graph) => ({ ...graph, hoverEdge: id }));
  }, []);
  const onEdgePointerLeave = useCallback(() => {
    setGraph((graph) => ({ ...graph, hoverEdge: undefined }));
  }, []);

  const styledNodes = useMemo(() => {
    return graph.nodes.map((node) =>
      styleNode(node, node.id === graph.hoverNode, selectedAddress === node.id)
    );
  }, [graph.nodes, graph.hoverNode, selectedAddress]);

  const styledEdges = useMemo(() => {
    return graph.edges.map((edge: any) => ({
      ...edge,
      style:
        edge.id === graph.hoverEdge
          ? { width: 3, arrow: "forward" }
          : selectedTransaction === edge.id
          ? { width: 3, arrow: "forward" }
          : { width: 1, arrow: "forward" },
    }));
  }, [graph.edges, graph.hoverEdge, selectedTransaction]);

  return (
    <div
      ref={targetRef}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      {width === undefined || height === undefined ? (
        <span />
      ) : (
        <Renderer
          width={width}
          height={height}
          nodes={styledNodes}
          edges={styledEdges}
          x={graph.x}
          y={graph.y}
          zoom={graph.zoom}
          onNodeDrag={onNodeDrag}
          onNodePointerUp={({ target: { id } }) => onSelectAddress(id)}
          onNodePointerEnter={onNodePointerEnter}
          onNodePointerLeave={onNodePointerLeave}
          onEdgePointerEnter={onEdgePointerEnter}
          onEdgePointerLeave={onEdgePointerLeave}
          onViewportPointerUp={() => onSelectTransaction("")}
          onEdgePointerUp={({ target: { id } }) => onSelectTransaction(id)}
          onViewportDrag={onViewportDrag}
          onViewportWheel={onViewportWheel}
        />
      )}
    </div>
  );
};

export default withResizeDetector(Graph);

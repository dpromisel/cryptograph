import { Node } from "@sayari/trellis";
import { interpolateBlues } from "d3-scale-chromatic";

export function concatSet(a: any, b: any) {
  const newSet = new Set();
  a.forEach((item: any) => newSet.add(item));
  b.forEach((item: any) => newSet.add(item));
  return newSet;
}

// Dont mind me, just having some fun with d3-scale-chromatic
const color = (x: number) => interpolateBlues(Math.max(Math.sqrt(x), 4) / 10);

export const styleNode = (node: Node, hover: any, selected: boolean) => {
  let style: any = {
    color: color(node.radius),
    labelSize: 10,
    labelWordWrap: 260,
  };

  const selectedStyle = { color: "#7CBBF3", width: 2 };
  const hoverStyle = { color: "#CCC", width: 4 };

  if (selected && hover) {
    style.stroke = [
      { color: "#FFF", width: 2 },
      { color: color(node.radius), width: 2 },
      selectedStyle,
      hoverStyle,
    ];
  } else if (selected) {
    style.stroke = [{ color: "#FFF", width: 2 }, selectedStyle, hoverStyle];
  } else if (hover) {
    style.stroke = [
      { color: "#FFF", width: 2 },
      { color: color(node.radius), width: 2 },
      hoverStyle,
    ];
  } else {
    style.stroke = [
      { color: "#FFF", width: 2 },
      { color: color(node.radius), width: 2 },
    ];
  }
  return { ...node, style };
};

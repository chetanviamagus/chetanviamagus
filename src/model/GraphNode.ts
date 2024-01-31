import { GraphNodeData } from "./GraphNodeData";
export class GraphNode {
    data: GraphNodeData;
    id: string;
    position: { x: number; y: number };
    type: string;
    className?: string;
    parentNode?: string;  
    constructor(
      data: GraphNodeData,
      id: string,
      position: { x: number; y: number },
      type: string,
      className?: string,
      parentNode?: string,
    ) {
      this.data = data;
      this.id = id;
      this.position = position;
      this.type = type;
      this.className = className;
      this.parentNode = parentNode;
    }
  }
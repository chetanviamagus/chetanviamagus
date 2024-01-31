import { MarkerType } from "reactflow";

export class GraphEdge {
    id: string;
    source: string;
    target: string;
    animated: boolean;
    label: string;
    type: string;
    sourceHandle: string;
    targetHandle: string;
    markerEnd: { type: MarkerType };
  
    constructor(id: string, source: string, target: string, animated: boolean, label: string, type: string, sourceHandle: string, targetHandle: string, markerEnd: { type: MarkerType }) {
      this.id = id;
      this.source = source;
      this.target = target;
      this.animated = animated;
      this.label = label;
      this.type = type;
      this.sourceHandle = sourceHandle;
      this.targetHandle = targetHandle;
      this.markerEnd = markerEnd;
    }
  }
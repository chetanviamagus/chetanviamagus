import ReactFlow, { EdgeTypes } from "reactflow";

import "reactflow/dist/style.css";
import CustomEdge from "./CustomEdge";
import CustomNode from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const BaseDiagram = (props: any) => {
  const { nodes, edges } = props;

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        panOnDrag={false}
        zoomOnScroll={false}
        selectionOnDrag={false}
      />
    </>
  );
};

export default BaseDiagram;

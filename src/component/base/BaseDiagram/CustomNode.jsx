import React from "react";
import { Handle, Position } from "reactflow";
const CustomNode = ({ data, isConnectable }) => {
  const { handlers, id, nodeName, nodeContent } = data;
  const renderHandles = () => {
    if (!handlers) return null;
    return handlers.map((handler, index) => (
      <Handle
        key={`${handler.type}-${index}`}
        type={handler.type}
        position={handler.position.toLowerCase() === "right" ? Position.Right : Position.Left}
        style={handler.connectionPositionStyles}
        id={handler.id}
        isConnectable={isConnectable}
      />
    ));
  };
  return (
    <>
      {renderHandles()}
      <div id={id} className="flex flex-col gap-2">
        <i style={{ color: "#00ae45" }} className={`pi text-8xl ${nodeContent}`} />
        <div
          style={{ backgroundColor: "#1d313d" }}
          className="bg-grey-900 rounded-md px-3 py-1.5 text-xs text-white shadow-md"
        >
          {nodeName}
        </div>
      </div>
    </>
  );
};
export default CustomNode;

// React imports
import React, { FC, memo } from "react";

// Component imports
import Text from "component/Text/Text";

// Reactflow imports
import { Handle, Position } from "reactflow";

// Define the type for the data prop
interface CustomNodeData {
  isDisabled?: boolean;
  label?: string;
  image?: string;
  isParent?: boolean;
  isTruncate?: boolean;
  sourceId?: string;
  enableSourceHandle?: boolean;
  targetId?: string;
  enableTargetHandle?: boolean;
}

// Define the type for the props
interface CustomNodeProps {
  data: CustomNodeData;
  id: string;
}

// CustomNode component directly included in View6.tsx
const CustomNode: FC<CustomNodeProps> = ({ data, id }) => {
  const {
    isDisabled,
    label,
    image,
    isParent,
    isTruncate,
    sourceId,
    enableSourceHandle,
    targetId,
    enableTargetHandle,
  } = data ?? {};

  const handleClick = () => {
    if (!isDisabled) {
      // Perform actions when enabled
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        id={id}
        className={`node-container group flex
        ${isParent ? "h-15 w-15 rounded-xl" : "h-7.5 w-7.5 rounded-full"} 
        ${isDisabled ? " " : "node-connected bg-transparent "} 
        items-center justify-center !p-0 !text-xxs`}
        onClick={handleClick}
      >
        <div
          className={`${
            isParent ? "hexagon" : "rounded-full"
          } flex h-full w-full scale-110 items-center justify-center bg-base-container hover:bg-base-hover-disable-bg`}
        >
          <img
            src={image}
            alt="logo"
            className={`${isParent ? "max-h-6 max-w-6" : "max-h-5 max-w-5"} ${
              isDisabled ? "grayscale invert" : ""
            } `}
          />
        </div>
        {enableSourceHandle && (
          <Handle
            type="target"
            isConnectableStart
            isConnectableEnd
            position={Position.Top}
            id={sourceId + "-top"}
            className="handle-top invisible group-hover:visible"
          />
        )}
        {enableSourceHandle && (
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectableStart
            isConnectableEnd
            id={sourceId + "-bottom"}
            className="handle-bottom invisible group-hover:visible"
          />
        )}
        {enableTargetHandle && (
          <Handle
            type="source"
            isConnectableStart
            isConnectableEnd
            position={Position.Left}
            id={targetId + "-top-left"}
            className="handle-top-left invisible group-hover:visible"
          />
        )}
        {enableTargetHandle && (
          <Handle
            type="target"
            isConnectableStart
            isConnectableEnd
            position={Position.Left}
            id={targetId + "-bottom-left"}
            className="handle-bottom-left invisible group-hover:visible"
          />
        )}
        {enableTargetHandle && (
          <Handle
            type="source"
            isConnectableStart
            isConnectableEnd
            position={Position.Right}
            id={targetId + "-top-right"}
            className="handle-top-right invisible group-hover:visible"
          />
        )}
        {enableTargetHandle && (
          <Handle
            type="target"
            isConnectableStart
            isConnectableEnd
            position={Position.Right}
            id={targetId + "-bottom-right"}
            className="handle-bottom-right invisible group-hover:visible"
          />
        )}
      </div>
      <Text
        isTruncate={isTruncate}
        className={`${isParent ? "text-xxxs" : "text-xxxxs"} mt-1.5 font-extralight
        ${isDisabled ? "text-base-disable-text" : "text-base-white"} `}
        label={label}
      />
    </div>
  );
};

export default memo(CustomNode);

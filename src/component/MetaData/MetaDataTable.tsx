import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

// Interfaces (adhering to Single Responsibility Principle)
interface MetaDataTableProps {
  id: string;
  data: {
    entityName: string;
    attributes: Record<string, AttributeData>;
  };
}

interface MetaDataTableRowProps {
  nodeId: string;
  attributes: AttributeData;
  handleId: string;
}

interface AttributeData {
  name: string;
  dataType: string;
  constrain: string;
  sourceId?: string;
  enableSourceHandle?: boolean;
  targetId?: string;
  enableTargetHandle?: boolean;
}

// Component for a single row (adhering to Single Responsibility Principle)
const MetaDataTableRow: React.FC<MetaDataTableRowProps> = ({ nodeId, attributes, handleId }) => {
  if (!handleId || !attributes) {
    return null;
  }

  const { name, dataType, constrain, sourceId, enableSourceHandle, targetId, enableTargetHandle } =
    attributes;

  return (
    <div className="custom-node__select relative w-full text-base flex flex-row gap-3 px-4 py-2 !bg-base-table-bg text-left">
      <div className="flex-1">{name}</div>
      <div className="w-24">{dataType}</div>
      <div className="w-24">{constrain}</div>
      {enableSourceHandle && <Handle type="source" position={Position.Right} id={sourceId} />}
      {enableTargetHandle && <Handle type="target" position={Position.Left} id={targetId} />}
    </div>
  );
};

// Component for managing a group of rows (adhering to Single Responsibility Principle)
const GroupedAttributes: React.FC<{
  groupKey: string;
  attributes: JSX.Element[];
  isCollapsed: boolean;
  toggleCollapse: () => void;
}> = ({ groupKey, attributes, isCollapsed, toggleCollapse }) => {
  const [collapsedColumnTypes, setCollapsedColumnTypes] = useState(true);

  const shouldShowMoreLessButton = attributes.length > 2 && !isCollapsed; // Use updated logic

  return (
    <React.Fragment key={groupKey}>
      <>
        {groupKey === "PK-FK-column" ? (
          ""
        ) : (
          <>
            <div
              className="relative capitalize text-lg bg-base-table-footer-bg px-4 py-1.5 cursor-pointer"
              onClick={toggleCollapse}
            >
              <span className="absolute left-4 cursor-pointer ">
                {isCollapsed ? (
                  <i className="pi pi-chevron-up text-xl"></i>
                ) : (
                  <i className="pi pi-chevron-down text-xl"></i>
                )}
              </span>
              {groupKey}
            </div>
          </>
        )}
      </>
      {groupKey === "PK-FK-column" && (
        <>
          {attributes.slice(0, 2)}
          {shouldShowMoreLessButton && (
            <div
              className="p-2 cursor-pointer bg-base-container uppercase"
              onClick={() => setCollapsedColumnTypes(!collapsedColumnTypes)}
            >
              {collapsedColumnTypes ? "Show more" : "Show less"}
            </div>
          )}
          {!collapsedColumnTypes && attributes.slice(2)}
        </>
      )}
      {groupKey !== "PK-FK-column" && !isCollapsed && attributes}
    </React.Fragment>
  );
};

// Main component (adhering to Single Responsibility Principle)
const MetaDataTable: React.FC<MetaDataTableProps> = ({ id, data }) => {
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([
    // Add all group IDs here to initially collapse them
    data.entityName + "PK-FK-column", // Combine "PK", "FK", and "column" into a single group
    ...Object.keys(data.attributes).map(
      (handleId) => data.entityName + data.attributes[handleId].constrain
    ),
  ]);

  // Corrected group collapse/expand logic
  const isGroupCollapsed = (groupId: string) => {
    return collapsedGroups.includes(groupId);
  };

  const toggleGroupCollapse = (groupId: string) => {
    setCollapsedGroups((prevCollapsedGroups) =>
      prevCollapsedGroups.includes(groupId)
        ? prevCollapsedGroups.filter((group) => group !== groupId)
        : [...prevCollapsedGroups, groupId]
    );
  };

  const groupedAttributes: Record<string, JSX.Element[]> = {};

  // Group attributes by type
  Object.keys(data.attributes).forEach((handleId) => {
    const attributes = data.attributes[handleId];
    let groupKey = attributes.constrain;

    // Combine "PK", "FK", and "column" into a single group
    if (["PK", "FK", "column"].includes(groupKey)) {
      groupKey = "PK-FK-column";
    }

    if (!groupedAttributes[groupKey]) {
      groupedAttributes[groupKey] = [];
    }

    groupedAttributes[groupKey].push(
      <MetaDataTableRow key={handleId} nodeId={id} attributes={attributes} handleId={handleId} />
    );
  });

  return (
    <>
      <div className="text-xs text-center lowercase text-dark-neutral-gray-800 bg-base-table-bg shadow-md p-0.75 rounded-md border border-base-table-header-bg">
        <div className="text-xl capitalize p-3 rounded-t-sm text-dark-neutral-gray-1000 bg-base-table-header-bg px-4 py-1.5 relative">
          {data.entityName}
        </div>
        {Object.keys(groupedAttributes).map((groupKey) => (
          <GroupedAttributes
            key={groupKey}
            groupKey={groupKey}
            attributes={groupedAttributes[groupKey]}
            isCollapsed={
              groupKey === "PK-FK-column"
                ? isGroupCollapsed(data.entityName + groupKey + "-column")
                : isGroupCollapsed(data.entityName + groupKey)
            }
            toggleCollapse={() =>
              groupKey === "PK-FK-column"
                ? toggleGroupCollapse(data.entityName + groupKey + "-column")
                : toggleGroupCollapse(data.entityName + groupKey)
            }
          />
        ))}
      </div>
    </>
  );
};

export default memo(MetaDataTable);

import CheckBox from "component/CheckBox/CheckBox";
import CustomTooltip from "component/Tooltip/Tooltip";
import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";
import { useEffect, useState } from "react";

function SimpleTreeTable(props: any) {
  const {
    className,
    nodesData,
    onClickLeaf,
    variant,
    readOnly,
    nodesSelected,
    nodesSelectedData,
    disableLink,
    tableState,
    ...primeReactProps
  } = props;

  const [nodes, setNodes] = useState<any[]>(nodesData);
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);
  const [selectedNodeKeys, setSelectedNodeKeys] = useState<any>(nodesSelectedData || []);

  useEffect(() => {
    setNodes(nodesData);
  }, []);

  useEffect(() => {
    const findSelected = (data: any[]) => {
      return data.filter((node) => {
        if (node.children) {
          node.children = findSelected(node.children);
        }
        return selectedNodeKeys[node.key]?.checked || selectedNodeKeys[node.key]?.partialChecked;
      });
    };
    const dataCopy = structuredClone(nodesData);
    const selected = findSelected([...dataCopy]);
    setSelectedNodes(selected);
  }, [tableState]);

  // Function to extract all keys from nodesData
  const extractKeys = (nodesArray: any[]): string[] => {
    return nodesArray.reduce((keys, node) => {
      keys.push(node.key);
      if (node.children) {
        keys = keys.concat(extractKeys(node.children));
      }
      return keys;
    }, [] as string[]);
  };

  const allKeys: any = extractKeys(nodesData);

  //Function to select all nodes
  const selectAll = () => {
    const selectedKeys: { [key: string]: { checked: boolean; partialChecked: boolean } } = {};

    const traverseNodes = (nodesArray: any[]) => {
      nodesArray.forEach((node) => {
        selectedKeys[node.key] = { checked: true, partialChecked: false };
        if (node.children) {
          traverseNodes(node.children);
        }
      });
    };

    traverseNodes(nodesData);
    setSelectedNodeKeys(selectedKeys);
    nodesSelected(selectedKeys);
  };

  //Function to de-select all nodes
  const deselectAll = () => {
    const selectedKeys: { [key: string]: { checked: boolean; partialChecked: boolean } } = {};

    const traverseNodes = (nodesArray: any[]) => {
      nodesArray.forEach((node) => {
        selectedKeys[node.key] = { checked: false, partialChecked: false };
        if (node.children) {
          traverseNodes(node.children);
        }
      });
    };

    traverseNodes(nodesData);
    setSelectedNodeKeys(selectedKeys);
    nodesSelected(selectedKeys);
  };

  const [stateIsAllSelected, setStateIsAllSelected] = useState(false);

  //Function to check if all nodes are selected
  const isAllSelected = () => {
    let allSelected = true;

    const traverseNodes = (nodesArray: any[]) => {
      nodesArray.forEach((node) => {
        if (!selectedNodeKeys[node.key] || !selectedNodeKeys[node.key].checked) {
          allSelected = false;
        }
        if (node.children) {
          traverseNodes(node.children);
        }
      });
    };

    traverseNodes(nodesData);
    return allSelected;
  };

  useEffect(() => {
    if (isAllSelected()) {
      setStateIsAllSelected(true);
    } else {
      setStateIsAllSelected(false);
    }
  }, [selectedNodeKeys]);

  const rowClassName = (node: any) => {
    return { "table-tree-leaf-child-row": !node.children, truncate: true, "read-only": readOnly };
  };

  const nameHeaderTemplate = (
    <div className="flex items-center gap-x-1.75">
      {!readOnly ? (
        <CheckBox
          checked={stateIsAllSelected}
          onChange={stateIsAllSelected ? deselectAll : selectAll}
          hideErrorRow
        />
      ) : null}

      <div>Application Resource</div>
    </div>
  );

  const renderNameColumn = (node: any) => {
    const bodyTemplate = !disableLink ? (
      (() => {
        if (Array.isArray(node.children) && node.children.length > 0) {
          // node.children is a non-empty array
          return <span className="truncate">{node?.data?.name ?? "-"}</span>;          
        } else {
          // node.children is not a non-empty array
          return (
            <a
              onClick={() => onClickLeaf?.(node)}
              className="w-32 cursor-pointer truncate text-primary-electron-blue-800 underline"
            >
              {node?.data?.name ?? "-"}
            </a>
          );
        }
      })()
    ) : (
      <span className="truncate">{node?.data?.name ?? "-"}</span>
    );

    return (
      <div className="first-col inline-block">
        <div className="flex items-center gap-6">
          <div>{bodyTemplate}</div>
          {node?.data?.info ? (
            <CustomTooltip
              message={node?.data?.info ?? ""}
              position="top"
              className=""
              iconClassName="flex items-center justify-center gap-1.5"
            />
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <TreeTable
      rowClassName={rowClassName}
      value={tableState === "selected" ? selectedNodes : nodes}
      selectionMode="checkbox"
      selectionKeys={selectedNodeKeys}
      onSelectionChange={(e: any) => {
        setSelectedNodeKeys(e.value);
        nodesSelected(e.value);
      }}
      className={`custom-treetable mt-3 !rounded-md !border !border-dark-neutral-gray-300 ${
        className ?? ""
      }`}
      expandedKeys={allKeys} //Expand all nodes by default
      {...primeReactProps}
    >
      <Column
        field="name"
        header={nameHeaderTemplate}
        body={renderNameColumn}
        expander
        className={`w-1/5 truncate ${variant === "secondary" ? "w-2/5" : ""}`}
      ></Column>
      <Column
        field="region"
        header="Region"
        className={`w-1/5 truncate ${variant === "secondary" ? "w-1/5" : ""}`}
      ></Column>
      <Column
        field="dbType"
        header="Type"
        className={`w-1/5 truncate ${variant === "secondary" ? "w-1/5" : ""}`}
      ></Column>
      <Column
        field="schema"
        header="Description"
        className={`w-1/5 truncate ${variant === "secondary" ? "w-1/5" : ""}`}
      ></Column>
      <Column
        field="telemetry"
        header="Telemetry"
        className={`w-1/5 truncate ${variant === "secondary" ? "w-1/5" : ""}`}
      ></Column>
    </TreeTable>
  );
}

export default SimpleTreeTable;

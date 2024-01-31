// React imports
import React, { useEffect, useRef, useState } from "react";

// Heroicons imports
import {
  ChevronLeftIcon,
  LightBulbIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Component imports
import ChatBotInput from "component/ChatBotInput/ChatBotInput";
import DialogBox from "component/Dialog/Dialog";
import InputBox from "component/InputBox/InputBox";
import MetaData from "component/MetaData/MetaData";
import SimpleAccordion from "component/SimpleAccordion/SimpleAccordion";
import SimpleTreeTable from "component/SimpleTreeTable/SimpleTreeTable";
import Text from "component/Text/Text";
import ToastCustom from "component/Toast/Toast";
import CustomTooltip from "component/Tooltip/Tooltip";

// Model imports
import { GraphEdge } from "model/GraphEdge";
import { GraphNode } from "model/GraphNode";
import { GraphNodeData } from "model/GraphNodeData";

// Reactflow imports
import { MarkerType, Node } from "reactflow";

// Route imports

// Utility and constant imports
import { TOAST_VARIANT } from "util/Constant";

// Data imports
import LinkButton from "component/LinkButton/LinkButton";
import SimpleSelectButton from "component/SimpleSelectButton/SimpleSelectButton";
import projectDataSourceTableJson from "poc/projectDataSource.json";
import projectDataSourceGraphNodeData from "poc/projectDataSourceGraphNodes";
import EditableText from "component/EditableText/EditableText";
import { capitalizeFirstLetter } from "util/CommonUtil";

// Constants
const awsDataSourceTable = projectDataSourceTableJson.dataSources[0].data;
const influxDataSourceTable = projectDataSourceTableJson.dataSources[1].data;
const slackDataSourceTable = projectDataSourceTableJson.dataSources[2].data;

//Later this array will be fetched from the backend API
const projectDataSourceGraphNodes = projectDataSourceGraphNodeData;
const nodesList = projectDataSourceGraphNodes.map(
  (node) =>
    new GraphNode(
      new GraphNodeData(
        node.data.image,
        node.data.label,
        node.data.isDisabled,
        node.data.isParent,
        node.data.isTruncate,
        node.data.enableSourceHandle,
        node.data.enableTargetHandle
      ),
      node.id,
      node.position,
      node.type,
      // @ts-ignore: will fix later
      node.className,
      node.parentNode
    )
);

let initialEdgesArray: GraphEdge[] = [];
const whyIsMyWebsiteSlow: GraphEdge[] = [
  {
    id: "InfluxData-PrometheusDB",
    source: "InfluxData",
    target: "PrometheusDB",
    animated: true,
    label: "InfluxData PrometheusDB",
    type: "bezier",
    sourceHandle: "InfluxDataHandle",
    targetHandle: "Datadog-InfluxDataHandle",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "PrometheusDB-Datadog",
    source: "PrometheusDB",
    target: "Datadog",
    animated: true,
    label: "PrometheusDB and Datadog",
    type: "bezier",
    sourceHandle: "InfluxDataHandle",
    targetHandle: "Datadog-InfluxDataHandle",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "Datadog-InfluxData",
    source: "Datadog",
    target: "InfluxData",
    animated: true,
    label: "Datadog and InfluxData",
    type: "bezier",
    sourceHandle: "InfluxDataHandle",
    targetHandle: "Datadog-InfluxDataHandle",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
]; // Assume this is your edges array
interface ConnectDataProps {
  projectInfo?: {
    projectName?: string;
    projectIcon?: string;
    projectDescription?: string;
  };
  dataSources: (sources: number) => void;
}

interface ProjectInfo {
  projectName?: string;
  projectIcon?: string;
  projectDescription?: string;
}

const PageConnectData: React.FC<ConnectDataProps> = (props: ConnectDataProps) => {
  const { dataSources } = props;
  const getProjectInfo = localStorage.getItem("projectInfo");
  const projectInfo: ProjectInfo = JSON.parse(getProjectInfo ? getProjectInfo : "");
  const [isSchemaDialogVisible, setSchemaDialogVisible] = useState<boolean>(false);
  const [isInfoDialogVisible, setIsInfoDialogVisible] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>(projectInfo.projectName ?? "");
  const [projectDescription, setProjectDescription] = useState<string>(
    projectInfo.projectDescription ?? ""
  );
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initialEdges, setInitialEdges] = useState<GraphEdge[]>(initialEdgesArray); // Assume this is your edges array
  const [initialNodes, setInitialNodes] =
    useState<Node<GraphNodeData, string | undefined>[]>(nodesList);

  const [awsNodes, setAwsNodes] = useState<object>({});
  const [influxNodes, setInfluxNodes] = useState<object>({});
  const [slackNodes, setSlackNodes] = useState<object>({});
  const [selectedDataSources, setSelectedDataSources] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [key, setKey] = useState(Math.random());
  const handleFullScreen = (isFullScreen: boolean) => {
    setIsFullScreen(isFullScreen);
  };
  const [tableState, setTableState] = useState("allDataSets");
  const toastRef = useRef<any>("");

  useEffect(() => {
    if (errorMessage) {
      toastRef.current.showFunction();
    }
  }, [errorMessage]);

  useEffect(() => {
    let totalSelectedDataSources = 0;
    if (awsNodes) {
      const numberOfCheckedItems = countCheckedItems(awsNodes);
      totalSelectedDataSources += numberOfCheckedItems;
    }
    if (influxNodes) {
      const numberOfCheckedItems = countCheckedItems(influxNodes);
      totalSelectedDataSources += numberOfCheckedItems;
    }
    if (slackNodes) {
      const numberOfCheckedItems = countCheckedItems(slackNodes);
      totalSelectedDataSources += numberOfCheckedItems;
    }
    setSelectedDataSources(totalSelectedDataSources);
  }, [awsNodes, influxNodes, slackNodes]);

  useEffect(() => {
    dataSources(selectedDataSources);
  }, [selectedDataSources]);

  const countCheckedItems = (data: any) => {
    let count = 0;
    // Iterate through the keys of the object
    Object.keys(data).forEach((key) => {
      // Check if the key contains a hyphen
      if (key.includes("-")) {
        // If it contains a hyphen, check if the item is checked
        if (data[key].checked) {
          count += 1;
        }
      }
    });

    return count;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const findNode = (label: string) =>
    nodesList.find((node) =>
      node.data.label?.toLowerCase().trim().includes(label?.toLowerCase().trim())
    );

  const handleUpdateInitialNodes = () => {
    const lowerCaseInputValue = inputValue.toLowerCase();
    if (
      lowerCaseInputValue.includes("why") &&
      lowerCaseInputValue.includes("website") &&
      lowerCaseInputValue.includes("slow")
    ) {
      setInitialEdges((prevEdges) => [...prevEdges, ...whyIsMyWebsiteSlow]);

      // Node IDs to enable
      const nodeIdsToEnable = ["InfluxData", "PrometheusDB", "Datadog"];
      // Check if the nodes are already enabled
      const nodesAreEnabled = initialNodes.some(
        (node) => nodeIdsToEnable.includes(node.id) && !node.data.isDisabled
      );

      if (nodesAreEnabled) {
        setErrorMessage("Nodes are already enabled.");
        return;
      }
      // Find the nodes you want to enable and their child nodes
      const nodesToEnable = initialNodes.filter(
        (node) =>
          nodeIdsToEnable.includes(node.id) || nodeIdsToEnable.includes(node.parentNode as string)
      );

      if (nodesToEnable.length > 0) {
        // Update the initialNodes state
        setInitialNodes((prevNodes: Node<GraphNodeData, string | undefined>[]) =>
          prevNodes.map((node) => {
            if (
              nodeIdsToEnable.includes(node.id) ||
              nodeIdsToEnable.includes(node.parentNode as string)
            ) {
              return {
                ...node,
                data: {
                  ...node.data,
                  isDisabled: false,
                },
              };
            }
            return node;
          })
        );
      }

      // Stop the execution of the current function
      return;
    }

    const staticSourceNodeId = "Slack";
    const staticTargetNodeId = "Datadog";
    const staticSourceNode = findNode(staticSourceNodeId);
    const staticTargetNode = findNode(staticTargetNodeId);
    // Convert inputValue to lowercase for case-insensitive comparison
    const singleNodeValue = lowerCaseInputValue.match(/add (.*)/);
    if (singleNodeValue) {
      // Update the initialNodes state
      const updatedNodes = initialNodes.map((node) => {
        // Check if the node is a parent node or a child node
        const inputValueNode = findNode(singleNodeValue[1]);
        if (inputValueNode) {
          if (node.id === inputValueNode.id || node.parentNode === inputValueNode.id) {
            if (!node.data.isDisabled) {
              setErrorMessage("Node is already enabled.");
              return node;
            } else {
              return {
                ...node,
                data: {
                  ...node.data,
                  isDisabled: false,
                },
              };
            }
          }
        }
        return node;
      });
      setInitialNodes(updatedNodes);
    } else if (lowerCaseInputValue.includes("remove") || lowerCaseInputValue.includes("reset")) {
      if (staticSourceNode && staticTargetNode) {
        removeEdge(staticSourceNode, staticTargetNode);
      }
    }
    // Parse the input value
    const matches = inputValue.match(
      /(.*) (edge|relation|relationship|connection) between (.*) and (.*)/
    );

    if (!matches || matches.length !== 5) {
      // Display error message in UI
      return;
    }

    const action = matches[1];
    const sourceNode = findNode(matches[3]);
    const targetNode = findNode(matches[4]);

    if (!sourceNode || !targetNode) {
      console.error("One or both nodes not found");
      return;
    }

    // Call addEdge() with the nodes that match the input value
    if (action === "add") {
      // Check if the node is already enabled
      if (!sourceNode.data.isDisabled || !targetNode.data.isDisabled) {
        setErrorMessage("Node is already enabled.");
        return;
      }
      // Check if an edge with the same source and target nodes already exists
      const newEdgeId = `${sourceNode.id}-${targetNode.id}`;
      if (initialEdgesArray.some((edge) => edge.id === newEdgeId)) {
        setErrorMessage("Duplicate Edge. This connection is already established.");
        return;
      }
      addEdgeAndEnableNode(sourceNode, targetNode);
    } else if (action === "remove") {
      // Check if the node is already disabled
      if (sourceNode.data.isDisabled || targetNode.data.isDisabled) {
        setErrorMessage("Node is already disabled.");
        return;
      }
      removeEdge(sourceNode, targetNode);
    }
  };

  function addEdgeAndEnableNode(sourceNode: GraphNode, targetNode: GraphNode) {
    const newEdgeId = `${sourceNode.id}-${targetNode.id}`;
    // Check if an edge with the same source and target nodes already exists
    if (initialEdgesArray.some((edge) => edge.id === newEdgeId)) {
      // Show a toast message
      if (errorMessage) {
        toastRef.current.showFunction();
      }
      setErrorMessage("Duplicate Edge. This connection is already established.");
      return;
    }

    // Enable the sourceNode and targetNode
    sourceNode.data.isDisabled = false;
    targetNode.data.isDisabled = false;

    // Update the initialNodes state
    const updatedNodes = initialNodes.map((node) => {
      // Check if the node is a parent node or a child node
      if (
        node.id === sourceNode.id ||
        node.id === targetNode.id ||
        node.parentNode === sourceNode.id ||
        node.parentNode === targetNode.id
      ) {
        return {
          ...node,
          data: {
            ...node.data,
            isDisabled: false,
          },
        };
      }
      return node;
    });
    setInitialNodes(updatedNodes);

    const newEdge = new GraphEdge(
      `${sourceNode.id}-${targetNode.id}`, // id
      sourceNode.id, // source
      targetNode.id, // target
      true, // animated
      `edge between ${sourceNode.data.label} and ${targetNode.data.label}`, // label
      "bezier", // type
      `${sourceNode.id}Handle`, // sourceHandle
      `${targetNode.id}-${sourceNode.id}Handle`, // targetHandle
      { type: MarkerType.ArrowClosed } // markerEnd
    );
    // Add the new edge to the initialEdges
    setInitialEdges((prevEdges) => [...prevEdges, newEdge]);
  }
  function removeEdge(sourceNode: GraphNode, targetNode: GraphNode) {
    const edgeId = `${sourceNode.id}-${targetNode.id}`;
    initialEdgesArray = initialEdgesArray.filter((edge) => edge.id !== edgeId);

    // Disable the sourceNode and targetNode
    sourceNode.data.isDisabled = true;
    targetNode.data.isDisabled = true;

    // remove the selected edge to the initialEdges
    setInitialEdges(initialEdgesArray);

    // Update the initialNodes state
    const updatedNodes = initialNodes.map((node) => {
      if (
        node.id === sourceNode.id ||
        node.id === targetNode.id ||
        node.parentNode === sourceNode.id ||
        node.parentNode === targetNode.id
      ) {
        return {
          ...node,
          data: {
            ...node.data,
            isDisabled: true,
          },
        };
      }
      return node;
    });
    setInitialNodes(updatedNodes);
  }

  const handleSend = (text: string) => {
    console.log("filter", text);
  };

  const handleEditNameSave = (name: string) => {
    setProjectName(capitalizeFirstLetter(name));
    localStorage.setItem(
      "projectInfo",
      JSON.stringify({ ...projectInfo, projectName: capitalizeFirstLetter(name) })
    );
  };

  const handleEditDescriptionSave = (description: string) => {
    setProjectDescription(capitalizeFirstLetter(description));
    localStorage.setItem(
      "projectInfo",
      JSON.stringify({ ...projectInfo, projectDescription: capitalizeFirstLetter(description) })
    );
  };

  const handleReRender = () => {
    setKey(Math.random());
  };

  const interpretationDialogContent = () => {
    return (
      <div className="flex w-87 flex-col gap-3 rounded-xl border border-primary-electron-blue-100 bg-primary-electron-blue-100 p-6 shadow-toast_secondary">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3 text-primary-electron-blue-700">
            <LightBulbIcon className="h-6 w-6" />

            <Text
              className="text-sm font-semibold leading-none"
              label={"Hawkeye's interpretation"}
            />
          </div>

          <XMarkIcon
            className="h-6 w-6 cursor-pointer text-dark-neutral-gray-700 hover:text-dark-neutral-gray-900"
            onClick={() => {
              setIsInfoDialogVisible(false);
            }}
          />
        </div>

        <div className="text-left text-sm text-dark-neutral-gray-700">
          <Text
            label={
              'Databases with tables having keywords "CPU", "Uptime", "processing" are highlighted'
            }
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="screen-bg flex h-full mx-auto w-full md:max-w-rightContent p-3 flex-col gap-3 overflow-auto rounded-xl px-6 pt-6"
      style={{ height: "calc(100vh - 94px)", scrollBehavior: "smooth" }}
      // id="chatContainer"
    >
      <div className="flex w-full flex-col items-center gap-6 border-b border-dark-neutral-gray-200 pb-6 md:flex-row md:justify-between">
        <div className="flex w-full items-center gap-4 px-3">
          {projectInfo.projectIcon !== "" ? (
            <img src={projectInfo.projectIcon} alt={"project-icon"} />
          ) : null}

          <div className="flex w-full flex-col justify-center">
            <div className="flex h-7.5 items-center text-base font-bold text-dark-text-main">
              <EditableText label={projectName} onSave={handleEditNameSave} />
            </div>

            <div className="flex h-7.5 w-full items-center text-sm text-dark-neutral-gray-700">
              <EditableText
                className="w-full"
                label={projectDescription}
                onSave={handleEditDescriptionSave}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col">
        <div className="relative pb-6">
          <ChatBotInput
            variant="secondary"
            handleSend={(text: string) => handleSend(text)}
            onClickInfoDialog={() => {
              setIsInfoDialogVisible(true);
            }}
          />
        </div>

        <div className="flex w-full flex-col gap-6 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <SimpleSelectButton
            value={tableState}
            optionLabel="label"
            options={[
              { label: "All Datasets", value: "allDataSets", className: "w-35" },
              { label: `${selectedDataSources} selected`, value: "selected", className: "w-35" },
            ]}
            onChange={(selectedValue: any) => {
              setTableState(selectedValue);
            }}
          />

          <LinkButton
            path=""
            disabled={selectedDataSources === 0}
            onClick={() => {
              setSchemaDialogVisible(true);
            }}
            label="View Schema"
            className="text-end text-sm text-primary-electron-blue-800"
          />
        </div>

        <div className="w-full">
          <SimpleAccordion
            accordionItems={[
              {
                header: `AWS ${
                  countCheckedItems(awsNodes) !== 0
                    ? `(${countCheckedItems(awsNodes)} selected)`
                    : ""
                }`,
                content: (
                  <div className="w-full">
                    <SimpleTreeTable
                      nodesData={awsDataSourceTable}
                      variant="secondary"
                      className="!mt-0"
                      hideErrorRow
                      nodesSelectedData={awsNodes}
                      nodesSelected={(nodes: any) => {
                        setAwsNodes(nodes);
                      }}
                      scrollable
                      scrollHeight={"calc(100vh - 300px)"}
                      disableLink
                      tableState={tableState}
                      // readOnly={tableState === "selected"}
                    />
                  </div>
                ),
              },
              {
                header: `Influx ${
                  countCheckedItems(influxNodes) !== 0
                    ? `(${countCheckedItems(influxNodes)} selected)`
                    : ""
                }`,
                content: (
                  <div className="w-full">
                    <SimpleTreeTable
                      nodesData={influxDataSourceTable}
                      variant="secondary"
                      className="!mt-0"
                      hideErrorRow
                      nodesSelectedData={influxNodes}
                      nodesSelected={(nodes: any) => {
                        setInfluxNodes(nodes);
                      }}
                      scrollable
                      scrollHeight={"calc(100vh - 300px)"}
                      disableLink
                      tableState={tableState}
                      // readOnly={tableState === "selected"}
                    />
                  </div>
                ),
              },
              {
                header: `Slack ${
                  countCheckedItems(slackNodes) !== 0
                    ? `(${countCheckedItems(slackNodes)} selected)`
                    : ""
                }`,
                content: (
                  <div className="w-full">
                    <SimpleTreeTable
                      nodesData={slackDataSourceTable}
                      variant="secondary"
                      className="!mt-0"
                      hideErrorRow
                      nodesSelectedData={slackNodes}
                      nodesSelected={(nodes: any) => {
                        setSlackNodes(nodes);
                      }}
                      scrollable
                      scrollHeight={"calc(100vh - 300px)"}
                      disableLink
                      tableState={tableState}
                      // readOnly={tableState === "selected"}
                      // onClickLeaf={(node: any) => {
                      //   console.log("Clicked on leaf", node);
                      //   setSchemaDialogVisible(true);
                      // }}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      <DialogBox
        closable={false}
        modal
        visible={isSchemaDialogVisible}
        position="right"
        onHide={() => {
          setSchemaDialogVisible(false);
        }}
        className={`slide-dialog-modal h-screen rounded-l-xl bg-base ${
          isFullScreen ? "w-full" : "w-full md:w-5/6 lg:w-3/5"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-start justify-between">
            <button
              onClick={() => {
                setSchemaDialogVisible(false);
              }}
              className="mr-1.5 rounded-full p-1.5 text-dark-neutral-gray-900 hover:bg-black"
            >
              {""}
              <ChevronLeftIcon className="h-6 w-6 " />
            </button>
            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-1.5 pt-0.876">
                <Text
                  className="text-heading-3 font-semibold text-base-white"
                  label={"Virtual Schema"}
                />
                <CustomTooltip classNames="-right-5" message="Hi" />
              </div>
              <div className="relative flex items-center gap-1.5">
                <Text
                  className="text-sm font-normal text-dark-neutral-gray-800  "
                  label={projectName}
                />
                {/* <ChevronRightIcon className="h-3 w-3 text-dark-neutral-gray-800" /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container relative m-auto w-full">
          <InputBox
            className="!h-12.5 !rounded-xl !px-3 !py-3"
            placeholder="Filter"
            onChange={handleInputChange}
          />
          <button
            className="absolute right-3.5 top-8.5 text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900"
            onClick={handleUpdateInitialNodes}
          >
            {""}
            <PaperAirplaneIcon className="h-6 w-6 " />
          </button>
        </div>
        <ToastCustom
          position="bottom-right"
          ref={toastRef}
          message={errorMessage}
          variant={TOAST_VARIANT.TERTIARY}
        />
        <div className="relative h-full">
          <MetaData
            hideMinimap
            initialEdges={initialEdges}
            initialNodes={initialNodes}
            key={key}
            onFullScreen={handleFullScreen}
            onReRender={handleReRender}
          />
        </div>
      </DialogBox>

      <DialogBox
        visible={isInfoDialogVisible}
        variant="secondary"
        closable={false}
        className=""
        dismissableMask
        modal={false}
        onHide={() => {
          setIsInfoDialogVisible(false);
        }}
      >
        {interpretationDialogContent()}
      </DialogBox>
    </div>
  );
};

export default PageConnectData;

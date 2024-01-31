// React imports
import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Heroicons imports
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

// Lottiefiles imports
// import { Player } from "@lottiefiles/react-lottie-player";
// import successTickLottie from "asset/img/lottie/success-tick-animation.json";

// Component imports
import ButtonBox from "component/ButtonBox/ButtonBox";
import DialogBox from "component/Dialog/Dialog";
import InputBox from "component/InputBox/InputBox";
import MetaData from "component/MetaData/MetaData";
import SimpleTreeTable from "component/SimpleTreeTable/SimpleTreeTable";
import Text from "component/Text/Text";
import ToastCustom from "component/Toast/Toast";
import CustomTooltip from "component/Tooltip/Tooltip";

// Model imports
import { GraphEdge } from "model/GraphEdge";
import { GraphNodeData } from "model/GraphNodeData";

// Reactflow imports
import { MarkerType, Node } from "reactflow";

// Reducer imports
import selectDatasourceReducer, {
  INITIAL_DATASOURCE_SELECT_STATE,
} from "reducer/datasource/SelectDatasourceReducer";

// Route imports
import { linkAuthRoute, linkDataSourceList, linkProjectList } from "routes";

// Service imports
import SelectDatasourceAPIService from "service/datasource/SelectDatasourceAPIService";

// Utility and constant imports
import { OperationType, ScreenRenderStatus } from "util/CommonConstant";
import { TOAST_VARIANT } from "util/Constant";

// Data imports
import dataSourceGraphNodeData from "poc/dataSourceGraphNodes";
import dataSourceTableJson from "poc/dataSource.json";
import { GraphNode } from "model/GraphNode";

// Constants
const dataSourceTable = dataSourceTableJson.dataSources[0].data;

//Later this array will be fetched from the backend API
const dataSourceGraphNodes = dataSourceGraphNodeData;
const nodesList = dataSourceGraphNodes.map(
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
      node.parentNode,
      // @ts-ignore: will fix later
      node.className
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

function PageDatasourceSelect() {
  const { datasourceKey, uid } = useParams();
  const [selectDatasourceState, dispatch] = useReducer(selectDatasourceReducer, {
    ...INITIAL_DATASOURCE_SELECT_STATE,
    operationType: uid ? OperationType.VIEW : OperationType.CREATE,
    uid: uid as string,
  });
  const toastRef = useRef<any>("");
  const [initialEdges, setInitialEdges] = useState<GraphEdge[]>(initialEdgesArray); // Assume this is your edges array
  const [initialNodes, setInitialNodes] =
    useState<Node<GraphNodeData, string | undefined>[]>(nodesList);
  const navigate = useNavigate();

  const [isSchemaDialogVisible, setSchemaDialogVisible] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (errorMessage) {
      toastRef.current.showFunction();
    }
  }, [errorMessage]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const findNode = (label: string) =>
    nodesList.find(
      (node) =>
        node.data.label
          ?.toLowerCase()
          .trim()
          .includes(label?.toLowerCase().trim())
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

  const gotoProjectListPage = () => {
    navigate(linkAuthRoute + linkProjectList);
  };

  const gotoSelectDatasourceView = () => {
    SelectDatasourceAPIService.dispatchScreenRenderStatusAction(dispatch, ScreenRenderStatus.INIT);
  };

  const gotoSuccessView = () => {
    SelectDatasourceAPIService.dispatchConnectionSuccess(dispatch);
  };

  const goBack = () => {
    navigate(linkAuthRoute + linkDataSourceList);
  };

  if (selectDatasourceState.screenRenderStatus === ScreenRenderStatus.SUCCESS) {
    return (
      <div className="screen-bg flex min-h-full items-center justify-center">
        <div className="mx-auto my-auto flex w-106 flex-col items-center">
          <Text
            className="mt-9 text-center text-heading-3 font-semibold"
            label={`Data Sources ${
              selectDatasourceState.operationType === OperationType.CREATE ? "Added" : "Updated"
            }`}
          />
          <Text
            className="my-3 text-center text-body-copy-2 "
            label={"You can set up a project with this data source and add more"}
          />
          {/* <div>
            <Player
              autoplay
              src={successTickLottie}
              keepLastFrame
              style={{ height: "150px", width: "150px" }}
            />
          </div> */}

          <div className="mt-6 w-full">
            <ButtonBox label="Set up a project" onClick={gotoProjectListPage} />
          </div>

          <div className="mt-3 w-full">
            <ButtonBox
              label="Add more data sources"
              variant="no-border"
              onClick={gotoSelectDatasourceView}
            />
          </div>
        </div>
      </div>
    );
  }
  const selectedAccount = location.pathname.split("/")[4];
  const [key, setKey] = useState(Math.random());
  const handleReRender = () => {
    setKey(Math.random());
  };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleFullScreen = (isFullScreen: boolean) => {
    setIsFullScreen(isFullScreen);
  };
  return (
    <div className="flex min-h-full mx-auto w-full md:max-w-rightContent p-3 flex-col">
      <div className="flex w-full items-start justify-between gap-4 border-dark-neutral-gray-200 pr-3 pt-3">
        <div className="flex items-start gap-x-3">
          <div
            className="cursor-pointer rounded-full p-1.5 hover:bg-neutral-200/10"
            onClick={goBack}
          >
            <ArrowLeftIcon className="w-6 " />
          </div>
          <div className="flex flex-col">
            <Text
              className="text-heading-2 font-bold"
              label={"Application Sources"}
            />
            <div className="mb-3 mt-1.5 flex items-center gap-x-3 text-body-copy-2">
              <Text
                className="text-primary-electron-blue-800"
                label={selectedAccount.toUpperCase()}
              />
              <div>
                <Text
                  className="text-dark-neutral-gray-800"
                  label={`IAM : User123  |  Acc. No :  123456789012  |  1670 data sources`}
                />
              </div>
            </div>
          </div>
        </div>
        <ButtonBox
          className="box-border !h-auto !w-auto !px-6 !py-1.5 text-sm"
          label={"Set up a project"}
          onClick={gotoProjectListPage}
        />
      </div>
      <div className="screen-bg w-full flex-1 rounded-xl p-3">
        <div className="relative m-auto w-full">
          <InputBox
            className="search-bg !h-12 w-full pl-12"
            placeholder="Filter"
            hideLabel
            hideErrorRow
          />
          <button className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900">
            <PaperAirplaneIcon className="h-6 w-6 " />
          </button>
        </div>
        <div className="mt-3">
          <SimpleTreeTable
            nodesData={dataSourceTable}
            hideErrorRow
            onClickLeaf={(node: any) => {
              console.log("Clicked on leaf", node);
              setSchemaDialogVisible(true);
            }}
            scrollable
            scrollHeight={"calc(100vh - 240px)"}
            readOnly
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
          setIsFullScreen(false);
        }}
        className={`slide-dialog-modal h-screen bg-base transition-all delay-100 ${
          isFullScreen ? "w-full" : "w-full rounded-l-xl md:w-5/6 lg:w-3/5"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-start justify-between">
            <button
              onClick={() => {
                setSchemaDialogVisible(false);
                setIsFullScreen(false);
              }}
              className="mr-1.5 rounded-full p-1.5 text-dark-neutral-gray-900 hover:bg-black"
            >
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
                <Text className="text-sm font-normal text-dark-neutral-gray-800" label={"AWS"} />
                <ChevronRightIcon className="h-3 w-3 text-dark-neutral-gray-800" />
                <span onClick={handleReRender}>
                  <Text
                    className="text-sm font-normal text-dark-neutral-gray-800 underline"
                    label={"RDS"}
                  />
                </span>
                <ChevronRightIcon className="h-3 w-3 text-dark-neutral-gray-800" />
                <Text
                  className="text-sm font-normal text-dark-neutral-gray-800 "
                  label={"RDS 1 Logs"}
                />

                {/* <ChevronRightIcon className="h-3 w-3 text-dark-neutral-gray-800" />
                <Text className="text-sm font-normal text-dark-neutral-gray-800" label="Slack" /> */}
              </div>
            </div>
          </div>
        </div>

        <div className="relative m-auto w-full">
          <InputBox placeholder="Filter" className="!h-12.5 py-3" onChange={handleInputChange} />
          <button
            className="absolute right-3.5 top-8.5 text-dark-neutral-gray-600 hover:text-dark-neutral-gray-900"
            onClick={handleUpdateInitialNodes}
          >
            <PaperAirplaneIcon className="h-6 w-6 " />
            {/* {messageIsStreaming ? (
              <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
            ) : (
              <img src={sendMessageIcon} alt="send" />
            )} */}
          </button>
        </div>
        <ToastCustom
          position="bottom-right"
          ref={toastRef}
          message={errorMessage}
          variant={TOAST_VARIANT.TERTIARY}
        />
        <div style={{ height: "calc(100vh - 200px)" }}>
          <MetaData
            delayForFitView={175}
            hideMinimap
            initialEdges={initialEdges}
            initialNodes={initialNodes}
            key={key}
            onFullScreen={handleFullScreen}
            onReRender={handleReRender}
          />
        </div>
      </DialogBox>
    </div>
  );
}

export default PageDatasourceSelect;

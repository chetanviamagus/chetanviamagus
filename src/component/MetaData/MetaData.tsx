// React imports
import { useCallback, useEffect, useRef, useState } from "react";

// Heroicons imports
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

// ReactFlow imports
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  MiniMap,
  Node,
  NodeChange,
  Panel,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

// Component imports
import Level1CustomNode from "./Level-1-CustomNode";
import MetaDataTable from "./MetaDataTable";

// Initial elements imports
import { edges as initialTableEdges, nodes as initialTableNodes } from "./initial-elements";
import { usePrevious } from "hook/usePrevious";
import { GraphNodeData } from "model/GraphNodeData";
const nodeTypes = {
  custom: Level1CustomNode,
};
const level2CustomNode = {
  custom: MetaDataTable,
};

const MetaData = ({
  onFullScreen,
  initialNodes,
  initialEdges,
  delayForFitView,
  hideMinimap,
  onReRender,
}: {
  onFullScreen: (isFullScreen: boolean) => void;
  initialNodes: any;
  initialEdges: any;
  delayForFitView?: number;
  hideMinimap?: boolean;
  onReRender?: (isBackVisible: boolean) => void;
}) => {
  const [customNodeTypes, setCustomNodeTypes] = useState(nodeTypes);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const flowRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isBackVisible, setIsBackVisible] = useState(false);
  const [viewMode, setViewMode] = useState("level-1");
  const [tableNodes, setTableNodes, onTableNodesChange] = useNodesState(initialTableNodes);
  const [tableEdges, setTableEdges, onTableEdgesChange] = useEdgesState(initialTableEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setTableNodes(initialTableNodes);
  }, [initialNodes, initialEdges]);
  useEffect(() => {
    setEdges(initialEdges);
    setTableEdges(initialTableEdges);
  }, [initialEdges, initialTableEdges]);

  const onConnect = useCallback(
    (connection: any) => {
      // Add the animated property to the connection object
      // connection.animated = true;

      // Add the markerEnd property to the connection object
      connection.markerEnd = {
        type: MarkerType.ArrowClosed,
      };
      if (viewMode === "level-1") {
        setEdges((eds: any) => addEdge(connection, eds));
      } else {
        setTableEdges((eds: any) => addEdge(connection, eds));
      }

      const { source, target } = connection;
      const updatedNodes = (viewMode === "level-1" ? nodes : tableNodes).map((node: any) => {
        if (source || target) {
          if (
            node.id === source ||
            node.parentNode === source ||
            node.id === target ||
            node.parentNode === target
          ) {
            return {
              ...node,
              data: {
                ...node.data,
                isDisabled: false,
              },
            };
          }
        }
        return node;
      });
      if (viewMode === "level-1") {
        setNodes(updatedNodes);
      } else {
        setTableNodes(updatedNodes);
      }
    },
    [nodes, edges, tableNodes, tableEdges]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (viewMode === "level-1") {
        setNodes((nds: Node<any>[]) => applyNodeChanges(changes, nds));
      } else {
        setTableNodes((nds: Node<any>[]) => applyNodeChanges(changes, nds));
      }
    },
    [viewMode, nodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (viewMode === "level-1") {
        setEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds));
      } else {
        setTableEdges((eds: Edge<any>[]) => applyEdgeChanges(changes, eds));
      }
    },
    [viewMode, edges]
  );

  useEffect(() => {
    if (viewMode === "level-2") {
      //@ts-ignore: will fix later
      setCustomNodeTypes(level2CustomNode);
      setTimeout(() => {
        reactFlowInstance?.fitView();
      }, 50);
    }
  }, [viewMode]);

  const toggleScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
    onFullScreen?.(!isFullScreen);
  }, [isFullScreen]);
  const toggleIsBackVisible = () => {
    setCustomNodeTypes(nodeTypes);
    setViewMode("level-1");
    setTimeout(() => {
      reactFlowInstance?.fitView();
    }, 50);
  };

  const onNodeClick = () => {
    setViewMode("level-2");
  };
  const handleOnLoad = (instance: ReactFlowInstance) => {
    setTimeout(() => setReactFlowInstance(instance), 0);
  };
  useEffect(() => {
    setTimeout(() => reactFlowInstance?.fitView(), 200);
  }, [isFullScreen]);

  return (
    <>
      <div className="reactflow-graph-container h-full w-full rounded-xl border border-dark-neutral-gray-300">
        <ReactFlow
          onInit={handleOnLoad}
          ref={flowRef}
          nodes={viewMode === "level-1" ? nodes : tableNodes}
          edges={viewMode === "level-1" ? edges : tableEdges}
          // @ts-ignore: will fix later
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={customNodeTypes}
          className="react-flow-subflows-example"
          fitView
        >
          <Panel
            className={`h-9 w-9 cursor-pointer rounded-full bg-black p-1.5 opacity-60 ${viewMode === "level-2" ? "" : "hidden"}`}
            position="top-left"
          >
            <button className="h-6 w-6" onClick={toggleIsBackVisible}>
              <ArrowUturnLeftIcon className="h-6 w-6 " />
            </button>
          </Panel>
          <Panel
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/30"
            position="top-right"
            onClick={toggleScreen}
          >
            <ArrowsPointingOutIcon
              className={`h-6 w-6 cursor-pointer ${isFullScreen ? "hidden" : ""}`}
            />
            <ArrowsPointingInIcon
              className={`h-6 w-6 cursor-pointer ${isFullScreen ? "" : "hidden"}`}
            />
          </Panel>
          {!hideMinimap && <MiniMap />}
          <Controls position="top-right" />
          <Background color="#3B3E4A" />
        </ReactFlow>
      </div>
    </>
  );
};

export default MetaData;

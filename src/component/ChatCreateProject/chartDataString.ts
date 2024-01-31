import { MarkerType } from "reactflow";

export const lineChartData = JSON.stringify({
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Dataset 1",
      data: [17, 28, 19, 25, 35],
      fill: true,
      tension: 0.4,
      borderColor: "#6973D5",
      pointBackgroundColor: "#6973D5",
      pointBorderWidth: 3,
      pointBorderColor: "#FAFAFB",
      borderWidth: 1,
    },
    {
      label: "Dataset 2",
      data: [15, 35, 20, 49, 10],
      fill: true,
      borderColor: "#FF9C85",
      tension: 0.4,
      pointBackgroundColor: "#FF9C85",
      pointBorderWidth: 3,
      pointBorderColor: "#FAFAFB",
      borderWidth: 1,
    },
  ],
});

export const nivoLineChartData = {
  title: "Nivo line chart 2",
  dataset: [
    {
      id: "Japan",
      data: [
        {
          x: "Plane",
          y: 14,
        },
        {
          x: "Helicopter",
          y: 109,
        },
        {
          x: "Boat",
          y: 238,
        },
        {
          x: "Train",
          y: 48,
        },
        {
          x: "Subway",
          y: 37,
        },
        {
          x: "Bus",
          y: 280,
        },
      ],
      color: "#E0E1E5",
      gradientEnd: "#ff0000",
    },
    {
      id: "France",
      data: [
        {
          x: "Plane",
          y: 216,
        },
        {
          x: "Helicopter",
          y: 90,
        },
        {
          x: "Boat",
          y: 53,
        },
        {
          x: "Train",
          y: 269,
        },
        {
          x: "Subway",
          y: 222,
        },
        {
          x: "Bus",
          y: 182,
        },
      ],
      color: "#9FD356",
    },
  ],
  textXAxis: "Transport",
  textYAxis: "Cost",
};

export const nivoLineChartData2 = {
  title: "",
  dataset: [
    {
      id: "Data",
      data: [
        {
          x: "May1",
          y: 21000,
        },
        {
          x: "May 2",
          y: 25000,
        },
        {
          x: "May 3",
          y: 30000,
        },
        {
          x: "May 4",
          y: 28000,
        },
      ],
      color: "#9FD356",
    },
  ],
  textXAxis: "",
  textYAxis: "",
};

export const nivoPieChartData = {
  title: "",
  dataset: [
    {
      id: "unavailability",
      label: "Unavailability",
      value: 105,
      color: "#FFC107",
    },
    {
      id: "performance",
      label: "Performance",
      value: 60,
      color: "#FE5F55",
    },
    {
      id: "cost",
      label: "Cost",
      value: 70,
      color: "#9FD356",
    },
    {
      id: "features",
      label: "Features",
      value: 80,
      color: "#F2703E",
    },
    {
      id: "provisioning",
      label: "Provisioning",
      value: 90,
      color: "#53D8FB",
    },
  ],
};

export const scenario1DiagramData = {
  nodes: [
    {
      id: "1",
      type: "custom",
      data: {
        id: "clientApplication",
        nodeName: "Client Application",
        nodeContent: "pi-desktop",
        handlers: [
          {
            type: "source",
            position: "Right",
            connectionPositionStyles: { top: "20%" },
            id: "clientApplicationRightSideUp",
          },
          {
            type: "source",
            position: "Right",
            connectionPositionStyles: { top: "60%" },
            id: "clientApplicationRightSideDown",
          },
        ],
      },
      position: { x: 0, y: 100 },
    },
    {
      id: "2",
      type: "custom",
      data: {
        id: "primaryNode",
        nodeName: "Primary Node",
        nodeContent: "pi-database",
        handlers: [
          {
            type: "target",
            position: "Left",
            connectionPositionStyles: { top: "20%" },
            id: "primaryNodeLeftSideUp",
          },
          {
            type: "target",
            position: "Left",
            connectionPositionStyles: { top: "60%" },
            id: "primaryNodeLeftSideDown",
          },
          { type: "source", position: "Right", id: "primaryNodeRightSideUp" },
        ],
      },
      position: { x: 400, y: 100 },
    },
    {
      id: "3",
      type: "custom",
      data: {
        id: "secondaryNode1",
        nodeName: "Secondary Node 1",
        nodeContent: "pi-database",
        handlers: [
          { type: "target", position: "Left", connectionPositionStyles: { top: "50%" }, id: "e" },
        ],
      },
      position: { x: 800, y: 0 },
    },
    {
      id: "4",
      type: "custom",
      data: {
        id: "secondaryNode2",
        nodeName: "Secondary Node 2",
        nodeContent: "pi-database",
        handlers: [
          { type: "target", position: "Left", connectionPositionStyles: { top: "50%" }, id: "f" },
        ],
      },
      position: { x: 800, y: 200 },
    },
  ],
  edges: [
    {
      id: "e1-2-handle-1",
      source: "1",
      target: "2",
      data: {
        label: "Read",
      },
      type: "custom",
      animated: true,
      sourceHandle: "clientApplicationRightSideUp",
      targetHandle: "primaryNodeLeftSideUp",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 40,
        height: 40,
        color: "#00ae45",
      },
    },
    {
      id: "e1-2-handle-2",
      source: "1",
      target: "2",
      data: {
        label: "Write",
      },
      type: "custom",
      animated: true,
      sourceHandle: "clientApplicationRightSideDown",
      targetHandle: "primaryNodeLeftSideDown",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 40,
        height: 40,
        color: "#00ae45",
      },
    },
    {
      id: "e2-3",
      source: "2",
      target: "3",
      sourceHandle: "primaryNodeRightSideUp",
      data: {
        label: "Replication",
      },
      type: "custom",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 40,
        height: 40,
        color: "#00ae45",
      },
    },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      sourceHandle: "primaryNodeRightSideUp",
      data: {
        label: "Replication",
      },
      type: "custom",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 40,
        height: 40,
        color: "#00ae45",
      },
    },
  ],
};

export const doughnutChartData = JSON.stringify({
  labels: ["Dataset 1", "Dataset 2", "Dataset 3", "Dataset 4", "Dataset 5", "Dataset 6"],
  datasets: [
    {
      label: "ABC",
      data: [20, 40, 13, 35, 20, 38],
      backgroundColor: ["yellow", "aqua", "pink", "lightgreen", "gold", "lightblue"],
      hoverOffset: 5,
      total: 156,
    },
  ],
});

export const citationData = JSON.stringify({
  message: "Hello Vinod",
  num: 5,
});

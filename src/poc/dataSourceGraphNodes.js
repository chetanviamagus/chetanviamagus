// import ebsLogo from "asset/img/icons/aws-ebs.svg";
// import ec2Logo from "asset/img/icons/aws-ec2.svg";
import rdsLogo from "asset/img/icons/aws-rds.svg";
import database from "asset/img/icons/database.png";
// import datadog from "asset/img/icons/datadog.svg";
// import influxdb from "asset/img/icons/influxdb-blue.svg";
// import network from "asset/img/icons/network.png";
// import prometheus from "asset/img/icons/prometheus-orange.svg";
// import awsLogo from "asset/img/logos/datasource/aws-logo.svg";
// import slackLogo from "asset/img/logos/datasource/slack-logo.svg";

const dataSourceGraphNodeData = [
  // {
  //   data: {
  //     image: slackLogo,
  //     label: "Slack",
  //     isDisabled: true,
  //     isParent: true,
  //     isTruncate: false,
  //     enableSourceHandle: true,
  //     enableTargetHandle: true,
  //   },
  //   id: "SlackData",
  //   position: { x: -150, y: 0 },
  //   type: "custom",
  // },
  // {
  //   data: {
  //     image: influxdb,
  //     label: "Influx",
  //     isDisabled: true,
  //     isParent: true,
  //     isTruncate: false,
  //     enableSourceHandle: true,
  //     enableTargetHandle: true,
  //   },
  //   id: "InfluxData",
  //   position: { x: 0, y: 0 },
  //   type: "custom",
  // },
  // {
  //   id: "1-A",
  //   data: {
  //     image: database,
  //     isDisabled: true,
  //     label: "Data",
  //     isTruncate: true,
  //   },
  //   type: "custom",
  //   position: { x: 45, y: -40 },
  //   
  //   parentNode: "InfluxData",
  // },
  // {
  //   id: "2-A",
  //   data: { isDisabled: true, image: network, label: "Network", isTruncate: true },
  //   type: "custom",
  //   position: { x: -15, y: -40 },
  //   
  //   parentNode: "InfluxData",
  // },
  // {
  //   id: "PrometheusDB",
  //   data: {
  //     image: prometheus,
  //     isDisabled: true,
  //     label: "Prometheus DB",
  //     isParent: true,
  //     enableSourceHandle: true,
  //     enableTargetHandle: true,
  //   },
  //   type: "custom",
  //   position: { x: 150, y: 0 },
  //   
  // },
  // {
  //   id: "1-B",
  //   data: { isDisabled: true, image: database, label: "Data", isTruncate: true },
  //   type: "custom",
  //   position: { x: 45, y: -40 },
  //   
  //   parentNode: "PrometheusDB",
  // },
  // {
  //   id: "2-B",
  //   data: { isDisabled: true, image: network, label: "Network", isTruncate: true },
  //   type: "custom",
  //   position: { x: -15, y: -40 },
  //   
  //   parentNode: "PrometheusDB",
  // },
  {
    id: "rds",
    data: {
      image: rdsLogo,
      label: "RDS 1 Logs",
      isParent: true,
      isDisabled: false,
      enableSourceHandle: true,
      enableTargetHandle: true,
    },
    type: "custom",
    position: { x: 0, y: 0 },
    
  },
  {
    id: "1-C",
    data: { isDisabled: false, image: database, label: "Schema 1", isTruncate: true },
    type: "custom",
    position: { x: 65, y: 80 },
    
    parentNode: "rds",
  },
  {
    id: "2-C",
    data: { isDisabled: false, image: database, label: "Schema 2", isTruncate: true },
    type: "custom",
    position: { x: 15, y: 80 },
    
    parentNode: "rds",
  },
  {
    id: "3-C",
    data: { isDisabled: false, image: database, label: "Schema 3", isTruncate: true },
    type: "custom",
    position: { x: -35, y: 80 },
    
    parentNode: "rds",
  },
  // {
  //   id: "Datadog",
  //   data: {
  //     image: datadog,
  //     isDisabled: true,
  //     label: "Datadog",
  //     isParent: true,
  //     enableSourceHandle: true,
  //     enableTargetHandle: true,
  //   },
  //   type: "custom",
  //   position: { x: 75, y: 150 },
  //   
  // },
];

export default dataSourceGraphNodeData;

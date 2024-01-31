import influxLogo from "asset/img/icons/influxdb-blue.svg";
import prometheusLogo from "asset/img/icons/prometheus-orange.svg";
import awsLogo from "asset/img/logos/datasource/aws-logo.svg";
import azureLogo from "asset/img/logos/datasource/azure-logo.svg";
import gcpLogo from "asset/img/logos/datasource/gcp-logo.svg";
import mongodbLogo from "asset/img/logos/datasource/mongodb-logo.svg";
import snowflakeLogo from "asset/img/logos/datasource/snowflake-logo.svg";
import ibmLogo from "asset/img/logos/datasource/ibm-logo.svg";
import jiraLogo from "asset/img/logos/datasource/jira-logo.svg";
import slackLogo from "asset/img/logos/datasource/slack-logo.svg";
import servicenowLogo from "asset/img/logos/datasource/servicenow-logo.svg";
import redisLogo from "asset/img/logos/datasource/redis-logo.svg";
import newrelicLogo from "asset/img/logos/datasource/newrelic-logo.svg";
import datadogLogo from "asset/img/logos/datasource/datadog-logo.svg";
import { DatasourceAssetObj } from "interface/datasource";

export enum DATASOURCE_KEYS {
  INFLUX = "influx",
  PROMETHEUS = "prometheus",
  AWS = "aws",
  AZURE = "azure",
  GCP = "gcp",
  MONGODB = "mongodb",
  SNOWFLAKE = "snowflake",
  JIRA = "jira",
  SLACK = "slack",
  IBM = "ibm",
  SERVICE_NOW = "servicenow",
  REDIS = "redis",
  NEW_RELIC = "newrelic",
  DATADOG = "datadog",
}

export const DATASOURCE_KEYS_ARRAY = Object.values(DATASOURCE_KEYS);

export const DATASOURCE_ASSETS: DatasourceAssetObj = {
  [DATASOURCE_KEYS.AWS]: {
    name: "Amazon Web Services",
    key: DATASOURCE_KEYS.AWS,
    logo: awsLogo,
    formStructure: [
      {
        name: "Access Key ID",
        key: "accessKey",
        type: "text",
        placeholder: "Enter Access Key",
        validations: "mandatory",
      },
      {
        name: "Secret Access Key",
        key: "secretKey",
        type: "text",
        validations: "mandatory",
      },
    ],
  },
  [DATASOURCE_KEYS.AZURE]: {
    name: "Microsoft Azure",
    key: DATASOURCE_KEYS.AZURE,
    logo: azureLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "text",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.GCP]: {
    name: "Google Cloud Platform",
    key: DATASOURCE_KEYS.GCP,
    logo: gcpLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "text",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.MONGODB]: {
    name: "MongoDB Atlas",
    key: DATASOURCE_KEYS.MONGODB,
    logo: mongodbLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "text",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.SNOWFLAKE]: {
    name: "Snowflake Data Cloud",
    key: DATASOURCE_KEYS.SNOWFLAKE,
    logo: snowflakeLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "text",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.JIRA]: {
    name: "Jira",
    key: DATASOURCE_KEYS.JIRA,
    logo: jiraLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "text",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.SLACK]: {
    name: "Slack",
    key: DATASOURCE_KEYS.SLACK,
    logo: slackLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "text",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.IBM]: {
    name: "IBM Cloud",
    key: DATASOURCE_KEYS.IBM,
    logo: ibmLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "text",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.SERVICE_NOW]: {
    name: "Servicenow",
    key: DATASOURCE_KEYS.SERVICE_NOW,
    logo: servicenowLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "text",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.REDIS]: {
    name: "Redis",
    key: DATASOURCE_KEYS.REDIS,
    logo: redisLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "password",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.NEW_RELIC]: {
    name: "New Relic",
    key: DATASOURCE_KEYS.NEW_RELIC,
    logo: newrelicLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "password",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.DATADOG]: {
    name: "Datadog",
    key: DATASOURCE_KEYS.DATADOG,
    logo: datadogLogo,
    formStructure: [
      {
        name: "Field 1",
        key: "field1",
        type: "password",
        placeholder: "Enter Field 1",
      },
    ],
  },
  [DATASOURCE_KEYS.INFLUX]: {
    name: "Influx",
    key: DATASOURCE_KEYS.AWS,
    logo: influxLogo,
    formStructure: [
      {
        name: "Access Key ID",
        key: "accessKey",
        type: "text",
        placeholder: "Enter Access Key",
        validations: "mandatory",
      },
      {
        name: "Secret Access Key",
        key: "secretKey",
        type: "text",
        validations: "mandatory",
      },
    ],
  },
  [DATASOURCE_KEYS.PROMETHEUS]: {
    name: "Prometheus",
    key: DATASOURCE_KEYS.AWS,
    logo: prometheusLogo,
    formStructure: [
      {
        name: "Access Key ID",
        key: "accessKey",
        type: "text",
        placeholder: "Enter Access Key",
        validations: "mandatory",
      },
      {
        name: "Secret Access Key",
        key: "secretKey",
        type: "text",
        validations: "mandatory",
      },
    ],
  },
};

export const DATASOURCE_PAGE_LIST = [
  {
    key: "aws",
    uid: "random-uuid-1",
    accountNo: "123456789012",
    username: "IAM : User123",
    datasourceCount: 1670,
  },
  {
    key: "azure",
    uid: "random-uuid-2",
    accountNo: "AZURE-ACCOUNT-123",
    username: "Azure User",
    datasourceCount: 500,
  },
  {
    key: "gcp",
    uid: "random-uuid-3",
    accountNo: "GCP-ACCOUNT-123",
    username: "GCP User",
    datasourceCount: 100,
  },
  {
    key: "mongodb",
    uid: "random-uuid-4",
    accountNo: "MONGODB-ACCOUNT-123",
    username: "MongoDB User",
    datasourceCount: 280,
  },
  {
    key: "snowflake",
    uid: "random-uuid-5",
    accountNo: "SNOWFLAKE-123",
    username: "Snowflake User",
    datasourceCount: 430,
  },
  {
    key: "jira",
    uid: "random-uuid-6",
    accountNo: "JIRA-ACCOUNT-123",
    username: "Jira User",
    datasourceCount: 100,
  },
  {
    key: "slack",
    uid: "random-uuid-7",
    accountNo: "SLACK-ACCOUNT-123",
    username: "Slack User",
    datasourceCount: 100,
  },
  {
    key: "ibm",
    uid: "random-uuid-8",
    accountNo: "IBM-ACCOUNT-123",
    username: "IBM User",
    datasourceCount: 100,
  },
  {
    key: "servicenow",
    uid: "random-uuid-9",
    accountNo: "SERVICENOW-ACCOUNT-123",
    username: "ServiceNow User",
    datasourceCount: 100,
  },
  {
    key: "redis",
    uid: "random-uuid-10",
    accountNo: "REDIS-ACCOUNT-123",
    username: "Redis User",
    datasourceCount: 100,
  },
  {
    key: "newrelic",
    uid: "random-uuid-11",
    accountNo: "NEWRELIC-ACCOUNT-123",
    username: "New Relic User",
    datasourceCount: 100,
  },
  {
    key: "datadog",
    uid: "random-uuid-12",
    accountNo: "DATADOG-ACCOUNT-123",
    username: "Datadog User",
    datasourceCount: 100,
  },
  {
    key: "influx",
    uid: "random-uuid-13",
    accountNo: "INFLUX-ACCOUNT-123",
    username: "Influx User",
    datasourceCount: 100,
  },
  {
    key: "prometheus",
    uid: "random-uuid-14",
    accountNo: "PROMETHEUS-ACCOUNT-123",
    username: "Prometheus User",
    datasourceCount: 100,
  },
];

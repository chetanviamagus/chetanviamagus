import { getEnvVariableValue } from "util/CommonUtil";
export const DEFAULT_SYSTEM_PROMPT =
  getEnvVariableValue("NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT") ||
  "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

export const OPENAI_API_HOST =
  getEnvVariableValue("VITE_OPENAI_API_HOST") || "https://api.openai.com";

export const DEFAULT_TEMPERATURE = parseFloat(
  getEnvVariableValue("VITE_DEFAULT_TEMPERATURE") || "1"
);

export const OPENAI_API_TYPE = getEnvVariableValue("VITE_OPENAI_API_TYPE") || "openai";

export const OPENAI_API_VERSION =
  getEnvVariableValue("VITE_OPENAI_API_VERSION") || "2023-03-15-preview";

export const OPENAI_ORGANIZATION = getEnvVariableValue("VITE_OPENAI_ORGANIZATION") || "";

export const AZURE_DEPLOYMENT_ID = getEnvVariableValue("VITE_AZURE_DEPLOYMENT_ID") || "";

import { useCallback } from "react";

import { useFetch } from "hook/useFetch";
import { getEnvVariableValue } from "util/CommonUtil";

export interface GetModelsRequestProps {
  key: string;
}

const useApiService = () => {
  const fetchService = useFetch();

  // const getModels = useCallback(
  // 	(
  // 		params: GetManagementRoutineInstanceDetailedParams,
  // 		signal?: AbortSignal
  // 	) => {
  // 		return fetchService.get<GetManagementRoutineInstanceDetailed>(
  // 			`/v1/ManagementRoutines/${params.managementRoutineId}/instances/${params.instanceId
  // 			}?sensorGroupIds=${params.sensorGroupId ?? ''}`,
  // 			{
  // 				signal,
  // 			}
  // 		);
  // 	},
  // 	[fetchService]
  // );

  const getModels = useCallback(
    (params: GetModelsRequestProps, signal?: AbortSignal) => {
      return fetchService.post<GetModelsRequestProps>(`https://api.openai.com/api/models`, {
        body: { key: params.key },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getEnvVariableValue("VITE_OPENAI_API_KEY") ?? ""}`,
        },
        signal,
      });
    },
    [fetchService]
  );

  return {
    getModels,
  };
};

export default useApiService;

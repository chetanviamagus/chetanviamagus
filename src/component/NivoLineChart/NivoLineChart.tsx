import BaseNivoLineChart from "component/base/BaseNivoLineChart/BaseNivoLineChart";
import { useAppSelector } from "hook/redux";
import React, { useEffect, useState } from "react";
import StaticDataService from "service/StaticDataService";
import { formatNumber } from "util/CommonUtil";

interface DataItem {
  x: string;
  y: number;
}

interface DataType {
  id: string;
  data: DataItem[];
  color: string;
}

interface ILineChartDS {
  title?: string;
  dataset: DataType[];
  textXAxis?: string;
  textYAxis?: string;
}

interface IProps {
  chartData: string;
  className?: string;
  enableArea?: boolean;
}

const NivoLineChart: React.FC<IProps> = (props) => {
  const [data, setData] = useState<ILineChartDS>({
    title: "",
    dataset: [],
    textXAxis: "",
    textYAxis: "",
  });
  const [loader, setLoader] = useState(true);
  const currentProject = useAppSelector((state) => state.project.selectedProject);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (props.chartData?.includes?.("~END~")) {
      const data = await importDataFile();
      setTimeout(async () => {
        const response: any = await StaticDataService.getNivoLineChartData(data || undefined);
        setLoader(false);

        if (response.status === 200) {
          setData(response.data);
        }
      }, 500);
    }
  };

  const importDataFile = async () => {
    let iData: any;
    try {
      const a = await import(
        `./../../poc/${(
          currentProject.projectInfo?.projectName ?? currentProject?.name
        )?.toLowerCase?.()}/store.js`
      );

      const chartID = props.chartData.replace?.("~END~", "")?.trim?.();

      iData = a.default?.[chartID];
    } catch (err) {
      const a: any = await import(`./../../poc/kroger/store.js`);

      const chartID = props.chartData.replace?.("~END~", "")?.trim?.();

      iData = a.default?.[chartID];
    }

    return iData;
  };

  if (loader) {
    return (
      <div className="relative h-64 w-full p-4">
        <div className="flex h-full items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const calculateTickValues = () => {
    const tickValues = [];
    if (data.dataset[0].data?.length > 0) {
      const maxDataValue = Math.max(
        ...(data.dataset[0].data || []).map((item: { y: number }) => item.y)
      );
      for (let i = 0; i < 5; i++) {
        tickValues.push((maxDataValue / 4) * i);
      }
    }
    return tickValues;
  };

  return (
    <div className={`relative h-64 w-full py-4 ${props.className ?? ""}`}>
      <BaseNivoLineChart
        title={data.title ?? ""}
        data={data.dataset ?? []}
        axisBottom={{ legend: data.textXAxis ?? "" } ?? {}}
        axisLeft={{
          legend: data.textYAxis ?? "",
          format: formatNumber,
          tickValues: calculateTickValues(),
        }}
        enableArea={props.enableArea}
      />
    </div>
  );
};

export default React.memo(NivoLineChart);

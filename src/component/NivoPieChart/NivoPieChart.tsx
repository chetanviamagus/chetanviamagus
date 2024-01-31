import BaseNivoPieChart from "component/base/BaseNivoPieChart/BaseNivoPieChart";
import { useAppSelector } from "hook/redux";
import React, { useEffect, useState } from "react";
import { LegendProps } from "@nivo/legends";
import StaticDataService from "service/StaticDataService";
interface IPieChartDS {
  title?: string;
  dataset: any[];
}
interface IProps {
  chartData: string;
  innerRadius?: number;
  padAngle?: number;
  className?: string;
  customLegends?: LegendProps[];
  showLegends?: boolean;
}

const NivoPieChart: React.FC<IProps> = (props) => {
  const [data, setData] = useState<IPieChartDS>({
    title: "",
    dataset: [],
  });
  const [loader, setLoader] = useState(true);
  const currentProject = useAppSelector((state) => state.project.selectedProject);

  const { innerRadius, chartData, padAngle, customLegends, className, showLegends } = props;

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (chartData?.includes?.("~END~")) {
      const data = await importDataFile();
      setTimeout(async () => {
        const response: any = await StaticDataService.getNivoPieChartData(data || undefined);
        setLoader(false);
        setTimeout(() => {
          if (response.status === 200) {
            setData(response.data);
          }
        }, 100);
      }, 500);
    }
  };

  const importDataFile = async () => {
    let iData: any;
    try {
      const a: any = await import(
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
      <div className="relative h-100 w-full p-4">
        <div className="flex h-full items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative h-84 w-full pb-6 ${className ?? ""}`}>
      {/* need to pass hight & width or else throwing error (put any random number it will take the parent height eg:h-100) */}
      <BaseNivoPieChart
        height={400}
        width={400}
        innerRadius={innerRadius}
        title={data.title ?? ""}
        data={data.dataset ?? []}
        padAngle={padAngle}
        legends={customLegends}
        showLegends={showLegends}
      />
    </div>
  );
};

export default React.memo(NivoPieChart);

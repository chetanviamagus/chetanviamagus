import { Chart } from "primereact/chart";
import React, { Component, useEffect, useState } from "react";

const DoughNutWithoutMemo: React.FC<any> = (props: any) => {
  const { chartData: stringData, lightOptions, id, className, style, chartLabel } = props;

  const [lineStylesData, setLineStylesData] = useState<any>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (stringData?.includes?.("~END~")) {
      setLoading(false);
      console.log(stringData?.replace?.("~END~", "") || "{}");

      const _fData: string = stringData?.replace?.("~END~", "")?.replace(/▍|\n|`/g, "") || "{}";

      setLineStylesData(JSON?.parse?.(_fData));
    }
  }, [stringData]);

  const basicOption: any = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          label: function (tooltipItem: any) {
            let value = tooltipItem?.dataset?.realData?.[tooltipItem.dataIndex];
            let label = tooltipItem?.label;
            return `${label}: ${value}`;
          },
        },
      },
      crosshair: false,
    },
    cutout: 60,
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="card relative mb-10 self-center">
        <Chart
          type="doughnut"
          data={lineStylesData}
          options={basicOption}
          id={id}
          className={className}
          style={style}
        />
        <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="-left-1 text-lg font-semibold text-white">
            {lineStylesData?.datasets?.[0]?.total?.toString?.() ?? "0"}
          </div>
          <div className="text-xs text-white ">{chartLabel}</div>
        </div>
      </div>
      <div className="flex flex-wrap self-start">
        {lineStylesData
          ? lineStylesData?.labels?.map((label: string, index: number) => (
              <div className="doughnut-chart-legend  mb-1.5 flex items-center" key={index}>
                <div
                  className=" rounded-infoDiv  mr-1.5 h-3 w-3 "
                  style={{
                    backgroundColor: lineStylesData.datasets[0].backgroundColor?.[index],
                  }}
                />
                <div className="flex-shrink-0">
                  <div className="text-body-copy-1 text-primary-ptext-1300">{label}</div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

// memoziation

const DoughNut = React.memo(DoughNutWithoutMemo);
// redux wiring

// exports

export default DoughNut;

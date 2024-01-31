import { Chart } from "primereact/chart";
import React, { Component, useEffect, useState } from "react";

import Legend from "../Legend";

const LineChartWithoutMemo: React.FC<any> = React.forwardRef((props: any, ref: any) => {
  const {
    lineStylesData: stringData,
    getLightTheme,
    id,
    label,
    labelClassName,
    legendClassName,
    isLegendTop,
    individualLegendClass,
    hideLabel,
    hideLegend,
    isLoading,
    v,
    ...chartProps
  } = props;

  const [lineStylesData, setLineStylesData] = useState<any>();

  const basicOptions = {
    animation: {
      duration: 0, // Set the animation duration to 0 to disable it
    },
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: false,
      },
      crosshair: {
        line: {
          color: "#5F6889",
          dashPattern: [1, 2],
        },
      },
      tooltip: {
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
          padding: 4,
        },
        // grid: {
        //   color: '#ebedef',
        //   borderDash: [2, 2],
        //   borderColor: 'transparent',
        // },
      },
      y: {
        ticks: {
          color: "#495057",
          padding: 10,
          display: true,
        },
        // grid: {
        //   color: '#ebedef',
        //   borderColor: 'transparent',
        //   borderDash: [2, 2],
        // },
      },
    },
  };
  const [styledData, setStyledData] = useState<any>();

  const setGradient = (data?: any) => {
    const canvasLineChart: any = document.getElementById("lineChart")?.firstChild;
    const ctx = canvasLineChart?.getContext("2d");
    const gradientActual = ctx?.createLinearGradient(0, 40, 0, 250);
    gradientActual?.addColorStop(0, "rgba(105,115,213,0.7)");
    gradientActual?.addColorStop(0.7, "rgba(105,115,213,0.5)");
    gradientActual?.addColorStop(1, "rgba(105,115,213,0.1)");
    const gradientBaseLine = ctx?.createLinearGradient(0, 40, 0, 250);
    gradientBaseLine?.addColorStop(0, "rgba(255,156,133,0.7)");
    gradientBaseLine?.addColorStop(0.7, "rgba(255,156,133,0.5)");
    gradientBaseLine?.addColorStop(1, "rgba(255,156,133,0.1)");

    const _d = data.datasets?.length > 0 ? data : lineStylesData;

    if (_d) {
      const _styledData = {
        ..._d,
        datasets: [
          {
            ..._d.datasets[0],
            backgroundColor: gradientActual,
            borderColor: gradientActual,
          },
          {
            ..._d.datasets[1],
            backgroundColor: gradientBaseLine,
            borderColor: gradientBaseLine,
          },
        ],
      };
      setStyledData(_styledData);
    }
  };

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!loading && lineStylesData?.datasets?.length > 0) {
  //     setGradient();
  //   }
  // }, [loading]);

  useEffect(() => {
    if (stringData?.includes?.("~END~")) {
      setLoading(false);
      console.log(stringData?.replace?.("~END~", "") || "{}");

      const _fData: string = stringData?.replace?.("~END~", "")?.replace(/▍|\n|`/g, "") || "{}";

      setLineStylesData(JSON?.parse?.(_fData));
      setTimeout(() => {
        setGradient(JSON?.parse?.(_fData));
      }, 500);
    }
  }, [stringData]);

  if (loading) {
    return <div>Preparing the chart...</div>;
  }

  if (!loading) {
    return (
      <>
        <div className="card h-full">
          <div>{label}</div>
          {/* <div className="h-6">{isLoading ? "Loading..." : ""}</div> */}
          <div className={`${isLegendTop ? "flex flex-col-reverse   " : ""} h-full`}>
            <Chart
              type="line"
              data={styledData}
              options={basicOptions}
              id={id}
              ref={ref}
              {...chartProps}
              width="0w"
              height="0h"
            />
            <div className={legendClassName}>
              {lineStylesData && !hideLegend ? (
                lineStylesData?.datasets?.map((element: any, i: any) => {
                  return (
                    <div key={i}>
                      <Legend
                        label={element.label}
                        shape="circle"
                        fillColor={element.borderColor}
                        className={individualLegendClass}
                      />
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return <>Something went wrong</>;
});

// memoziation

const LineChart = React.memo(LineChartWithoutMemo);

// exports

export default LineChart;

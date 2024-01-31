import Label from "component/Label";
import Legend from "component/Legend";
import SkeletonCustom from "component/Skeleton";
import { BaseChartProps } from "interface/component";
import { Chart } from "primereact/chart";
import React from "react";
import { LEGENDS_POSITION, getLegendPositionClass, BAR_CHART_TYPE } from "util/CommonUtil";

interface Dataset {
  label: string;
  backgroundColor: string | string[];
  data: number[];
  yAxisID?: string;
  // Add other properties as needed
}
interface ITooltipStyles {
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  titleColor?: string;
  titleAlign?: string;
  bodyColor?: string; //Font color for body
  bodyALign?: string;
  padding?: number;
  displayColors?: boolean;
  boxWidth?: number;
  boxHeight?: number;
  // Add other properties as needed
}

interface IBarChart extends BaseChartProps {
  legendsPosition?: keyof typeof LEGENDS_POSITION;
  legendClassName?: string;
  legendTextClassName?: string;
  barChartType?: keyof typeof BAR_CHART_TYPE;
  basicOptions?: any;
  data: {
    labels: string[];
    datasets: Dataset[];
    // Add other properties as needed
  };
  tooltipStyles?: ITooltipStyles;
}

const BarChart: React.FC<IBarChart> = (props: IBarChart) => {
  const {
    data,
    title,
    titleClassName,
    basicOptions,
    id,
    style,
    chartContainerClassName,
    className,
    hideLabel,
    loader,
    legendsPosition,
    legendClassName,
    legendTextClassName,
    barChartType,
    tooltipStyles,
  } = props;

  const defaultLegendsPosition = LEGENDS_POSITION.BOTTOM_LEFT;

  const defaultTooltipStyles = {
    backgroundColor: tooltipStyles?.backgroundColor ?? "rgba(0, 0, 0, 0.8)",
    borderColor: tooltipStyles?.borderColor ?? "rgba(0, 0, 0, 0.8)",
    borderWidth: tooltipStyles?.borderWidth ?? 1,
    titleColor: tooltipStyles?.titleColor ?? "white",
    titleAlign: tooltipStyles?.titleAlign ?? "left",
    bodyColor: tooltipStyles?.bodyColor ?? "white",
    bodyALign: tooltipStyles?.bodyALign ?? "left",
    padding: tooltipStyles?.padding ?? 6,
    displayColors: tooltipStyles?.displayColors ?? true,
    boxWidth: tooltipStyles?.boxWidth ?? 14,
    boxHeight: tooltipStyles?.boxHeight ?? 14,
  };

  // Default basic options based on barChartType
  const getDefaultOptions = () => {
    switch (barChartType) {
      case BAR_CHART_TYPE.HORIZONTAL:
        return {
          indexAxis: "y",
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: defaultTooltipStyles,
          },
          scales: {},
        };
      case BAR_CHART_TYPE.MULTI_AXIS:
        return {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: defaultTooltipStyles,
          },
          scales: {
            x: {},
            y: { type: "linear", display: true, position: "left" },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        };
      case BAR_CHART_TYPE.VERTICAL_STACKED:
        return {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: defaultTooltipStyles,
          },
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        };
      default:
        return {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: defaultTooltipStyles,
          },
          scales: {
            x: {},
            y: {},
          },
        };
    }
  };

  const mergedBasicOptions = {
    ...getDefaultOptions(),
    ...basicOptions,
  };

  return (
    <React.Fragment>
      {loader ? (
        <SkeletonCustom height="16.875rem" borderRadius="8px" />
      ) : (
        <div className="relative flex h-full w-full flex-col justify-between">
          {!hideLabel && (
            <Label
              label={title}
              labelClassNames={`text-xss text-black mb-4 ${titleClassName ?? ""}`}
            />
          )}
          <div className={`relative flex w-full flex-col ${chartContainerClassName ?? ""}`}>
            <Chart
              type="bar"
              data={data}
              options={mergedBasicOptions}
              id={id}
              style={style}
              className={`py-12 ${className ?? ""}`}
            />
          </div>

          <div
            className={`absolute w-full ${getLegendPositionClass(
              legendsPosition ?? defaultLegendsPosition
            )}`}
          >
            <div className={`flex flex-wrap gap-4 sm:gap-6 ${legendClassName ?? ""}`}>
              {data.datasets?.map(({ label, backgroundColor }: any, index: any) => {
                return (
                  <Legend
                    key={index}
                    label={label}
                    fillColor={
                      Array.isArray(backgroundColor) ? backgroundColor[0] : backgroundColor
                    }
                    labelClassNames={`text-black text-xs ${legendTextClassName ?? ""}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

// memoziation

// const BarChart = React.memo(BarChartWithoutMemo);

// redux wiring

// exports
const isComponentEqual = (prevProps: BaseChartProps, newProps: BaseChartProps) => {
  if (prevProps.loader !== newProps.loader) return false;
  return true;
};
// export default React.memo(BarChart, isComponentEqual);
export default React.memo(BarChart, isComponentEqual);

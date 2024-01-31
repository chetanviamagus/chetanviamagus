import Label from "component/Label";
import Legend from "component/Legend";
import SkeletonCustom from "component/Skeleton";
import { BaseChartProps } from "interface/component";
import { Chart } from "primereact/chart";
import React from "react";
import { LEGENDS_POSITION, getLegendPositionClass, LINE_CHART_TYPE } from "util/CommonUtil";

interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: any;
  borderColor?: string;
  yAxisID?: string;
  tension?: number;
  borderDash?: number[];
  fill?: boolean;
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

interface IPolarAreaChart extends BaseChartProps {
  legendsPosition?: keyof typeof LEGENDS_POSITION;
  legendClassName?: string;
  legendTextClassName?: string;
  lineChartType?: keyof typeof LINE_CHART_TYPE;
  basicOptions?: any;
  data: {
    labels: string[];
    datasets: Dataset[];
    // Add other properties as needed
  };
  tooltipStyles?: ITooltipStyles;
}

const PolarAreaChart: React.FC<IPolarAreaChart> = (props: IPolarAreaChart) => {
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
    lineChartType,
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
    return {
      plugins: {
        legend: {
          display: false,
        },
        tooltip: defaultTooltipStyles,
      },
      scales: {
        r: {
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
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
          <div
            className={`relative flex w-full flex-col items-center justify-center ${
              chartContainerClassName ?? ""
            }`}
          >
            <Chart
              type="polarArea"
              data={data}
              options={mergedBasicOptions}
              id={id}
              style={{ width: "50%", ...style }}
              className={`py-12 ${className ?? ""}`}
            />
          </div>

          <div
            className={`absolute w-full ${getLegendPositionClass(
              legendsPosition ?? defaultLegendsPosition
            )}`}
          >
            <div className={`flex flex-wrap gap-4 sm:gap-6 ${legendClassName ?? ""}`}>
              {data.labels?.map((label: any, index: any) => {
                // Get the corresponding backgroundColor for the label
                const fillColor =
                  index !== -1 ? data.datasets[0]?.backgroundColor?.[index] : "blue"; // You can set a default color if label is not found

                return (
                  <Legend
                    key={index}
                    label={label}
                    fillColor={fillColor}
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

// const PolarAreaChart = React.memo(PolarAreaChartWithoutMemo);

// redux wiring

// exports
const isComponentEqual = (prevProps: BaseChartProps, newProps: BaseChartProps) => {
  if (prevProps.loader !== newProps.loader) return false;
  return true;
};
// export default React.memo(BarChart, isComponentEqual);
export default React.memo(PolarAreaChart, isComponentEqual);

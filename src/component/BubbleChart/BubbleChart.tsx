import Legend from "component/Legend";
import SkeletonCustom from "component/Skeleton";
import Text from "component/Text/Text";
import { BaseChartProps } from "interface/component";
import { Chart } from "primereact/chart";
import React from "react";
import { LEGENDS_POSITION, getLegendPositionClass } from "util/CommonUtil";

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

interface Dataset {
  label: string;
  data: { x: number; y: number; r: number }[];
  backgroundColor?: any;
  pointBackgroundColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderColor?: string;
  pointBorderColor?: string;
  borderColor?: string;
  yAxisID?: string;
  tension?: number;
  borderDash?: number[];
  fill?: boolean;
  // Add other properties as needed
}

interface IBubbleChart extends BaseChartProps {
  legendsPosition?: keyof typeof LEGENDS_POSITION;
  legendClassName?: string;
  legendTextClassName?: string;
  basicOptions?: any;
  data: {
    labels: string[];
    datasets: Dataset[];
    // Add other properties as needed
  };
  tooltipStyles?: ITooltipStyles;
}

const BubbleChart: React.FC<IBubbleChart> = (props: IBubbleChart) => {
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
        x: {},
        y: {},
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
        <div className="relative flex w-full flex-col justify-between">
          {!hideLabel && (
            <Text
              label={title}
              className={`mb-4 text-left text-xs text-black ${titleClassName ?? ""}`}
            />
          )}
          <div
            className={`relative flex w-full flex-col items-center justify-center ${
              chartContainerClassName ?? ""
            }`}
          >
            <Chart
              type="bubble"
              data={data}
              options={mergedBasicOptions}
              id={id}
              style={style}
              className={`py-8 ${className ?? ""}`}
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
                    fillColor={backgroundColor}
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

// memoization

// const BubbleChart = React.memo(BubbleChartWithoutMemo);

// redux wiring

// exports
const isComponentEqual = (prevProps: BaseChartProps, newProps: BaseChartProps) => {
  if (prevProps.loader !== newProps.loader) return false;
  return true;
};
// export default React.memo(BarChart, isComponentEqual);
export default React.memo(BubbleChart, isComponentEqual);

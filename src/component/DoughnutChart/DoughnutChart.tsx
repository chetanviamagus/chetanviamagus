import Label from "component/Label";
import SkeletonCustom from "component/Skeleton";
import Text from "component/Text";
import { BaseChartProps } from "interface/component";
import { Chart } from "primereact/chart";
import React from "react";
import {
  LEGENDS_POSITION,
  generateDarkerColor,
  generateRandomColor,
  getLegendPositionClass,
} from "util/CommonUtil";

interface ITooltipStyles {
  width?: string;
  border?: string;
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  titleFontSize?: string;
  titleFontFamily?: string;
  titleFontColor?: string;
  titleAlignment?: string;
  labelFontFamily?: string;
  labelFontSize?: string;
  labelFontColor?: string;
  labelAlignment?: string;
  labelColorWidth?: string;
  labelColorHeight?: string;
  labelColorBorder?: string;
  labelColorBorderRadius?: string;
}

interface IDoughNut extends BaseChartProps {
  data: number[];
  dataLabels: string[];
  dataBackgroundColors?: string[]; //make it optional?
  dataHoverBackgroundColors?: string[];
  valueToBeShownInCenter?: string;
  legendsPosition?: keyof typeof LEGENDS_POSITION;
  isTooltipLegendVisible?: boolean;
  legendColorClassName?: string;
  tooltipStyles?: ITooltipStyles;
  noDataClassName?: string;
  centerValueClassName?: string;
  centerSpaceWidth?: number;
}

const DoughNut: React.FC<IDoughNut> = (props: IDoughNut) => {
  const {
    lightOptions,
    id,
    className,
    style,
    hideLabel,
    label,
    titleClassName,
    legendClassName,
    loader,
    data,
    dataLabels,
    dataBackgroundColors,
    dataHoverBackgroundColors,
    legendsPosition,
    valueToBeShownInCenter,
    isTooltipLegendVisible,
    tooltipStyles,
    noDataClassName,
    centerValueClassName,
    legendColorClassName,
    chartContainerClassName,
    centerSpaceWidth,
  } = props;

  const defaultLegendsPosition = LEGENDS_POSITION.BOTTOM_LEFT;

  const getTooltipArrow = (indicator: string) => {
    const existingTooltipArrow = document.querySelector(".tooltip-arrow");

    // If it exists, remove it from the DOM
    if (existingTooltipArrow) {
      existingTooltipArrow.parentNode?.removeChild(existingTooltipArrow);
    }

    const tooltipArrow = document.createElement("div");
    tooltipArrow.classList.add("tooltip-arrow");
    tooltipArrow.style.position = "absolute";
    tooltipArrow.style.width = "0";
    tooltipArrow.style.height = "0";
    tooltipArrow.style.borderStyle = "solid";
    tooltipArrow.style.borderWidth = "7px 0px 7px 7px";
    tooltipArrow.style.borderColor = "transparent transparent transparent #fff";
    if (indicator === "top") {
      tooltipArrow.style.left = "calc(50% - 7px)";
      tooltipArrow.style.top = "-6px";
      tooltipArrow.style.transform = "rotate(270deg)";
      return tooltipArrow;
    } else if (indicator === "left") {
      tooltipArrow.style.top = "calc(50% - 6px)";
      tooltipArrow.style.left = "-5px";
      tooltipArrow.style.transform = "rotate(180deg)";
      return tooltipArrow;
    } else if (indicator === "right") {
      tooltipArrow.style.top = "calc(50% - 6px)";
      tooltipArrow.style.right = "-5px";
      tooltipArrow.style.transform = "rotate(0deg)";
      return tooltipArrow;
    }
  };

  const createTooltip = (chart: any) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("div");

    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.style.width = tooltipStyles?.width ?? "max-content";
      tooltipEl.style.padding = "4px 6px";
      tooltipEl.style.border = tooltipStyles?.border ?? "";
      tooltipEl.style.background = tooltipStyles?.backgroundColor ?? "#ffffff";
      tooltipEl.style.borderRadius = tooltipStyles?.borderRadius ?? "8px";
      tooltipEl.style.boxShadow = tooltipStyles?.boxShadow ?? "0px 0px 24px #00000014";
      tooltipEl.style.color = "black";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = "translate(-50%, 0)";
      tooltipEl.style.transition = "all .1s ease";
      tooltipEl.style.zIndex = "99";

      const table = document.createElement("table");

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
    return tooltipEl;
  };

  //Try to pass the custom tooltip as JSX (research)
  const customTooltipHandler = (context: any) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = createTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b: any) => b.lines);
      const dataValues = tooltip.dataPoints[0].dataset.data;
      const bgColors = tooltip.dataPoints[0].dataset.backgroundColor;

      const tableHead = document.createElement("thead");

      const tr = document.createElement("tr");
      tr.style.borderWidth = "0px";
      tr.style.lineHeight = "2";

      const th = document.createElement("th");
      th.style.fontSize = tooltipStyles?.titleFontFamily ?? "13px";
      th.style.fontFamily = tooltipStyles?.titleFontFamily ?? "font-sans";
      th.style.textAlign = tooltipStyles?.titleAlignment ?? "left";
      th.style.color = tooltipStyles?.titleFontColor ?? "#000000";

      const titleText = document.createTextNode(titleLines[0]);

      th.appendChild(titleText);
      tr.appendChild(th);
      tableHead.appendChild(tr);

      const tableBody = document.createElement("tbody");

      bodyLines.forEach((body: any) => {
        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = "0px";
        tr.style.lineHeight = "1";
        tr.style.display = "flex";
        tr.style.alignItems = "center";
        tr.style.gap = "4px";

        const td = document.createElement("td");
        td.style.fontSize = tooltipStyles?.labelFontSize ?? "13px";
        td.style.fontFamily = tooltipStyles?.labelFontFamily ?? "font-sans";
        td.style.textAlign = tooltipStyles?.labelAlignment ?? "left";
        td.style.color = tooltipStyles?.labelFontColor ?? "#000000";

        const dataIndex = dataValues.findIndex((data: any) => data.toString() === body[0]);
        const requiredBgColor = bgColors.filter((_: any, index: number) => index === dataIndex)[0];

        const text = document.createTextNode(`${body[0]}%`);
        const dataColor = document.createElement("div");
        dataColor.style.width = tooltipStyles?.labelColorWidth ?? "14px";
        dataColor.style.height = tooltipStyles?.labelColorHeight ?? "14px";
        dataColor.style.borderRadius = tooltipStyles?.labelColorBorderRadius ?? "4px";
        dataColor.style.border = tooltipStyles?.labelColorBorder ?? "none";
        dataColor.style.backgroundColor = requiredBgColor;
        td.appendChild(text);
        if (isTooltipLegendVisible) {
          tr.appendChild(dataColor);
        }
        tr.appendChild(td);

        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("table");

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;

    // Calculate the half-width as a percentage of the chart width
    const chartWidth = chart.chartArea.right - chart.chartArea.left;
    const tooltipPercentageWidth = 20; // Adjust the percentage as needed **Needs modification**
    const tooltipHalfWidth = (tooltipPercentageWidth / 100) * chartWidth;

    // Calculate the position based on the middle of the chart
    const middleX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;

    if (tooltip.caretX < middleX) {
      // Tooltip on the right for the first half
      tooltipEl.style.left = positionX + tooltip.caretX + tooltipHalfWidth + "px";
    } else {
      // Tooltip on the left for the second half
      tooltipEl.style.left = positionX + tooltip.caretX - tooltipHalfWidth + "px";
    }
    tooltipEl.style.top = positionY + tooltip.caretY - 30 + "px"; //adjust (number) value to the requirement **Needs modification**

    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + "px " + tooltip.options.padding + "px";
    tooltipEl.appendChild(getTooltipArrow(`${tooltip.caretX < middleX ? "left" : "right"}`));
  };

  // Generate an array of random colors based on the length of data
  const randomColors = Array.from({ length: data.length }, () => generateRandomColor());
  const randomHoverColors = randomColors.map((color: string) => generateDarkerColor(color, 0.8));

  return (
    <>
      {loader ? (
        <SkeletonCustom height="18.75rem" borderRadius="8px" />
      ) : (
        <div
          className={`relative flex h-full w-full flex-col justify-between overflow-x-hidden text-black ${
            chartContainerClassName ?? ""
          }`}
        >
          {!hideLabel && (
            <Label
              label={label}
              labelClassNames={`text-xs text-black font-sans mb-6 ${titleClassName ?? ""} `}
            />
          )}

          {data && data.length <= 0 ? (
            <div
              className={`bg-secondary-baseConcrete flex h-80 items-center justify-center rounded-xl py-6 font-sans text-lg text-primary-gray-900 ${
                noDataClassName ?? ""
              }`}
            >
              <Text label={"No data found"} />
            </div>
          ) : (
            <div className="card relative self-center py-6">
              <Chart
                type="pie"
                data={{
                  labels: dataLabels,
                  datasets: [
                    {
                      data: data,
                      backgroundColor: dataBackgroundColors ?? randomColors,
                      hoverBackgroundColor: dataHoverBackgroundColors ?? randomHoverColors,
                    },
                  ],
                }}
                options={
                  !lightOptions
                    ? {
                        plugins: {
                          legend: {
                            display: false,
                          },
                          crosshair: false,
                          tooltip: {
                            enabled: false,
                            external: customTooltipHandler,
                            position: "nearest",
                            padding: "",
                            callbacks: {
                              title: (context: any) => context[0].label,
                            },
                          },
                        },
                        cutout: centerSpaceWidth ?? 60,
                      }
                    : { lightOptions }
                }
                id={id}
                className={className}
                style={style}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                {valueToBeShownInCenter ? (
                  <Text
                    label={valueToBeShownInCenter}
                    className={`flex items-center text-lg text-black ${centerValueClassName ?? ""}`}
                  />
                ) : null}
              </div>
            </div>
          )}

          <div
            className={`absolute w-full ${getLegendPositionClass(
              legendsPosition ?? defaultLegendsPosition
            )}`}
          >
            <div className={`flex flex-wrap gap-4 sm:gap-6`}>
              {dataLabels
                ? dataLabels?.map((label: string, index: number) => (
                    <div className="flex items-center" key={`${index}`}>
                      <div
                        className={`mr-1.5 h-3 w-3 rounded-sm ${legendColorClassName ?? ""}`}
                        style={{
                          backgroundColor: dataBackgroundColors
                            ? dataBackgroundColors[index]
                            : randomColors[index],
                        }}
                      />
                      <div
                        className={`flex items-center text-sm text-black ${legendClassName ?? ""}`}
                      >
                        <Text label={label} />
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// memoziation

// const DoughNut = React.memo(DoughNutWithoutMemo);
// redux wiring

// exports
const isComponentEqual = (prevProps: BaseChartProps, newProps: BaseChartProps) => {
  if (prevProps.loader !== newProps.loader) return false;
  return true;
};
export default React.memo(DoughNut, isComponentEqual);

import { Theme } from "@nivo/core";
import { LegendProps } from "@nivo/legends";
import { LineSvgProps, Point, PointTooltipProps, ResponsiveLine, SliceTooltip } from "@nivo/line";
import React from "react";
import { capitalizeFirstLetter } from "util/CommonUtil";
import Text from "component/Text";
import { Tooltip } from "primereact/tooltip";
// ** Note: make sure parent container have a defined height when using responsive component, otherwise height will be 0 and no chart will be rendered. **//

interface INivoLineChart extends LineSvgProps {
  title?: string;
  theme?: Theme;
  customTooltip?: (point: PointTooltipProps) => React.ReactNode;
  onClick?: (data: object) => void;
}

const NivoLineChart: React.FC<INivoLineChart> = (props: INivoLineChart) => {
  const { data, title, legends, customTooltip, onClick, theme } = props;

  //Custom theme with respect to this project
  const customTheme: Theme = {
    axis: {
      ticks: {
        text: {
          fontSize: 11,
          fill: "#ffffff",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
      },
      legend: {
        text: {
          fontSize: 12,
          fill: "#ffffff",
          outlineWidth: 0,
          outlineColor: "transparent",
        },
      },
    },
  };

  const mergedTheme = {
    ...theme,
    ...customTheme,
  };

  //Basic legend props for the chart can be customized if necessary
  const customLegends: LegendProps[] = legends ?? [
    {
      anchor: "top-right",
      direction: "row",
      justify: false,
      translateX: 40,
      translateY: -30,
      itemsSpacing: 0,
      itemWidth: 100,
      itemHeight: 18,
      itemTextColor: "#ffffff",
      itemDirection: "left-to-right",
      itemOpacity: 1,
      symbolSize: 14,
      symbolShape: "circle",
      effects: [
        {
          on: "hover",
          style: {
            itemTextColor: "#C6C6C6",
          },
        },
      ],
    },
  ];

  //Internal tooltip for the chart
  const internalCustomTooltip = ({ point }: PointTooltipProps) => {
    const xValue = point.data.x.toString();
    const capitalizedValue = capitalizeFirstLetter(xValue);

    return (
      <div className="flex max-w-fit items-center justify-center rounded-lg bg-white p-3 text-primary-electron-blue-100">
        <div className={`mr-1.5 h-4 w-4 rounded-sm`} style={{ backgroundColor: point.color }} />
        <div>
          <span className="font-bold text-primary-electron-blue-100">{capitalizedValue}</span>:{" "}
          {String(point.data.y)}
        </div>
      </div>
    );
  };

  //Custom slice tooltip
  const sliceTooltip = (slice: any) => {
    return (
      <div className="flex max-w-fit flex-col gap-3 rounded-lg bg-white p-3">
        {slice.points.map((point: Point) => {
          return (
            <div className="flex" key={point.id}>
              <div
                className={`mr-1.5 h-4 w-4 rounded-sm`}
                style={{ backgroundColor: point.serieColor }}
              />

              <div className="text-primary-electron-blue-100">
                <span className="pr-1.5 font-bold">{point.serieId}</span>:
                <span>{point.data.yFormatted}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const getLineColors = (): any => {
    if (props.colors) {
      return props.colors;
    }

    //Colors from the API from inside each data object
    const colors = data?.map((dataObject) => dataObject?.color);
    if (colors) {
      return colors;
    }

    return {
      scheme: "nivo",
    };
  };

  const getGradients = (): any[] => {
    if (props.defs) {
      return props.defs;
    }

    //Gradients from the API from inside each data object
    const gradients = data?.map((dataObject) => {
      return {
        id: dataObject?.id,
        type: "linearGradient",
        colors: [
          {
            offset: 0,
            color: dataObject?.color,
          },
          {
            offset: 100,
            color: dataObject?.color,
            opacity: 0,
          },
        ],
      };
    });

    if (gradients) {
      return gradients;
    }

    return [];
  };

  const getFills = (): any[] => {
    if (props.fill) {
      return props.fill;
    }

    //Fills from the API from inside each data object
    const fills = data?.map((dataObject) => {
      return {
        match: {
          id: dataObject?.id,
        },
        id: dataObject?.id,
      };
    });

    if (fills) {
      return fills;
    }

    return [];
  };

  //Main return statement for the chart
  return (
    <div className="w-ful flex h-full flex-col items-center overflow-x-hidden text-xs">
      <div className="mb-3 flex w-full items-center justify-start text-base text-white">
        <Text label={title} />
      </div>

      <ResponsiveLine
        data={data}
        margin={props.margin ?? { top: 50, right: 20, bottom: 50, left: 50 }}
        xScale={props.xScale ?? { type: "point" }}
        xFormat={props.xFormat ?? " >-"}
        yScale={
          props.yScale ?? {
            type: "linear",
            min: 0,
            max: "auto",
            stacked: true,
            reverse: false,
          }
        }
        lineWidth={props.lineWidth ?? 0.5}
        colors={getLineColors()}
        curve={props.curve ?? "monotoneX"}
        yFormat={props.yFormat ?? " >-.2f"}
        axisTop={props.axisTop ?? null}
        axisRight={props.axisRight ?? null}
        axisBottom={{
          ...props.axisBottom,
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          ...props.axisLeft,
          tickSize: 0,
          tickPadding: 10,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={props.pointSize ?? 4}
        pointColor={props.pointColor ?? { from: "color" }}
        pointBorderWidth={props.pointBorderWidth ?? 1}
        pointBorderColor={props.pointBorderColor ?? { from: "serieColor" }}
        pointLabelYOffset={props.pointLabelYOffset ?? -12}
        useMesh={props.useMesh ?? true}
        enableArea={props.enableArea ?? true}
        areaBaselineValue={props.areaBaselineValue ?? 0}
        areaOpacity={props.areaOpacity ?? 0.2}
        areaBlendMode={props.areaBlendMode ?? "normal"}
        defs={getGradients()}
        fill={getFills()}
        enableGridX={props.enableGridX ?? false}
        enableGridY={props.enableGridY ?? false}
        enableSlices={props.enableSlices ?? "x"}
        legends={customLegends}
        tooltip={customTooltip ?? internalCustomTooltip} //This is used when enableSlices is false
        sliceTooltip={({ slice }) => sliceTooltip(slice)} //This is used when enableSlices is true and has either "x" or "y" value
        onClick={({ data }) => {
          if (onClick) {
            onClick(data);
          }
        }}
        theme={mergedTheme}
        // animate={false}
      />
    </div>
  );
};

export default React.memo(NivoLineChart);

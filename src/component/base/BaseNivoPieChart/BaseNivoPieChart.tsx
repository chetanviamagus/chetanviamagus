import { ResponsivePie, PieSvgProps, PieTooltipProps } from "@nivo/pie";
import { LegendProps } from "@nivo/legends";
import { Theme } from "@nivo/core";
import React from "react";
import Text from "component/Text/Text";
import { capitalizeFirstLetter } from "util/CommonUtil";

// ** Note: make sure parent container have a defined height when using responsive component, otherwise height will be 0 and no chart will be rendered. **//
// ** Note: The same chart can be converted into doughnut just by changing the inner radius **//

interface INivoPieChart extends PieSvgProps<any> {
  title?: string;
  theme?: Theme;
  customTooltip?: (datum: PieTooltipProps<any>) => React.ReactNode;
  onClick?: (data: object) => void;
  showLegends?: boolean;
}

const NivoPieChart: React.FC<INivoPieChart> = (props: INivoPieChart) => {
  const { title, data, defs, fill, legends, customTooltip, onClick, theme, showLegends } = props;

  //Basic legend props for the chart can be customized if necessary
  const customLegends: LegendProps[] = (legends as LegendProps[]) ?? [
    {
      anchor: "bottom-right",
      direction: "row",
      justify: false,
      translateY: 40,
      translateX: 0,
      itemsSpacing: 0,
      itemWidth: 90,
      itemHeight: 30,
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

  // Legends configuration based on the showLegends prop
  const legendsConfig = showLegends ? customLegends : [];

  //Internal tooltip for the chart
  const internalCustomTooltip = ({ datum }: PieTooltipProps<any>) => {
    const label = datum.data?.label;
    const capitalizedValue = capitalizeFirstLetter(label);

    return (
      <div className="flex max-w-fit items-center justify-center rounded-lg bg-white p-3">
        <div className={`mr-1.5 h-4 w-4 rounded-sm`} style={{ backgroundColor: datum.color }} />
        <div>
          <span className="font-bold text-primary-electron-blue-100">{capitalizedValue}</span>:{" "}
          {String(datum.data?.value)}
        </div>
      </div>
    );
  };

  //Fill colors for segments
  const getSegmentColors = (): any => {
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

  //Gradients for the chart
  const getGradients = (): any[] => {
    if (props.defs) {
      return props.defs;
    }

    //Get the total of the all values
    const totalValue = data?.reduce((acc, curr) => acc + curr?.value, 0);

    //Cumulative angle for the gradient
    let cumulativeAngle = 0;

    //Gradients from the API from inside each data object
    const gradients = data?.map((dataObject, idx) => {
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + (dataObject.value / totalValue) * 360;
      const averageAngle = (startAngle + endAngle) / 2;

      cumulativeAngle = endAngle; // Update cumulative angle for the next iteration

      return {
        id: dataObject?.id,
        type: "linearGradient",
        gradientTransform: `rotate(${averageAngle} 0.5 0.5)`,
        colors: [
          {
            offset: 0,
            color: dataObject?.color,
            opacity: 0.3,
          },
          {
            offset: 100,
            color: dataObject?.color,
            opacity: 0.3,
          },
        ],
      };
    });

    if (gradients) {
      return gradients;
    }

    return [];
  };

  //Fills for the chart
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
    <div className="flex h-full w-full flex-col items-center text-body-copy-2">
      {title && (
        <div className="mb-3 flex w-full items-center justify-center text-white">
          <Text label={title} className="text-center" />
        </div>
      )}

      <ResponsivePie
        data={data}
        margin={props.margin ?? { top: 5, bottom: 35, left: 0 }}
        colors={getSegmentColors()}
        innerRadius={props.innerRadius ?? 0.03} // value is 0 to 1
        padAngle={props.padAngle ?? 0.7}
        cornerRadius={props.cornerRadius ?? 2}
        activeOuterRadiusOffset={props.activeOuterRadiusOffset ?? 3}
        borderWidth={props.borderWidth ?? 3}
        borderColor={
          props.borderColor ?? {
            from: "color",
            // modifiers: [["brighter", 0.2]],
          }
        }
        arcLinkLabelsSkipAngle={props.arcLinkLabelsSkipAngle ?? 10}
        arcLinkLabelsTextColor={props.arcLinkLabelsTextColor ?? "#333333"}
        arcLinkLabelsThickness={props.arcLinkLabelsThickness ?? 2}
        arcLinkLabelsColor={props.arcLinkLabelsColor ?? { from: "color" }}
        arcLabelsSkipAngle={props.arcLabelsSkipAngle ?? 10}
        enableArcLabels={props.enableArcLabels ?? false}
        enableArcLinkLabels={props.enableArcLinkLabels ?? false}
        arcLabelsTextColor={
          props.arcLabelsTextColor ?? {
            from: "color",
            modifiers: [["darker", 2]],
          }
        }
        defs={getGradients()}
        fill={getFills()}
        legends={legendsConfig}
        tooltip={customTooltip ?? internalCustomTooltip}
        onClick={({ data }) => {
          if (onClick) {
            onClick(data);
          }
        }}
        theme={theme}
        animate={true}
        motionConfig="slow"
        transitionMode="middleAngle"
      />
    </div>
  );
};

export default React.memo(NivoPieChart);

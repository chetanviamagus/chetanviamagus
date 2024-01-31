import { ResponsiveBar, ComputedDatum, BarSvgProps, BarLegendProps } from "@nivo/bar";
import { LegendProps } from "@nivo/legends";
import { Theme } from "@nivo/core";
import React from "react";

// ** Note: make sure parent container have a defined height when using responsive component, otherwise height will be 0 and no chart will be rendered. **//
// ** Note: data, keys and indexBy are compulsory props **//

interface INivoBarChart extends BarSvgProps<any> {
  theme?: Theme;
  legends?: any;
  customTooltip?: (datum: any) => any;
  onClick?: (data: any) => any;
  barAriaLabel?: (data: ComputedDatum<any>) => React.AriaAttributes["aria-label"];
  showLegends?: boolean;
}

const NivoBarChart: React.FC<INivoBarChart> = (props: INivoBarChart) => {
  const { data, legends, customTooltip, onClick, theme, showLegends } = props;

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
  const customLegends: BarLegendProps[] = legends ?? [
    {
      anchor: "top-right",
      direction: "row",
      justify: false,
      translateX: 0,
      translateY: -50,
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

  // Legends configuration based on the showLegends prop
  const legendsConfig = showLegends ? customLegends : [];

  const tooltip = (point: any) => {
    console.log(point);
    return <>Tooltip</>;
  };

  //Main return statement for the chart
  return (
    <div className="flex h-full w-full flex-col items-center overflow-x-auto text-xs text-black">
      <ResponsiveBar
        data={data}
        keys={props.keys}
        indexBy={props.indexBy}
        valueScale={props.valueScale ?? { type: "linear" }}
        groupMode={props.groupMode ?? "grouped"}
        indexScale={props.indexScale ?? { type: "band", round: true }}
        layout={props.layout ?? "vertical"}
        defs={props.defs}
        fill={props.fill}
        padding={props.padding ?? 0.3}
        innerPadding={props.innerPadding ?? 0}
        margin={props.margin ?? { top: 70, right: 40, bottom: 50, left: 60 }}
        colors={props.colors ?? { scheme: "nivo" }}
        borderRadius={props.borderRadius ?? 0}
        borderWidth={props.borderWidth ?? 0}
        borderColor={
          props.borderColor ?? {
            from: "color",
            modifiers: [["darker", 1.6]],
          }
        }
        axisTop={props.axisTop ?? null}
        axisRight={props.axisRight ?? null}
        axisBottom={props.axisBottom}
        axisLeft={props.axisLeft}
        labelSkipWidth={props.labelSkipWidth ?? 12}
        labelSkipHeight={props.labelSkipHeight ?? 12}
        labelTextColor={
          props.labelTextColor ?? {
            from: "color",
            modifiers: [["darker", 1.6]],
          }
        }
        enableGridX={props.enableGridX ?? false}
        enableGridY={props.enableGridY ?? false}
        enableLabel={props.enableLabel ?? false}
        legends={legendsConfig}
        role={props.role ?? "application"}
        ariaLabel={props.ariaLabel ?? "Nivo bar chart demo"}
        barAriaLabel={props.barAriaLabel}
        tooltip={customTooltip && (({ data }) => customTooltip(data))}
        // tooltip={({ data }) => tooltip(data)}
        onClick={({ data }) => {
          if (onClick) {
            onClick(data);
          }
        }}
        theme={mergedTheme}
      />
    </div>
  );
};

export default React.memo(NivoBarChart);

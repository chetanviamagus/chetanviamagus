import { ResponsiveRadar, RadarSvgProps } from "@nivo/radar";
import { Theme } from "@nivo/core";
import React from "react";
import { capitalizeFirstLetter } from "util/CommonUtil";

// ** Note: make sure parent container have a defined height when using responsive component, otherwise height will be 0 and no chart will be rendered. **//

interface INivoRadarChart extends RadarSvgProps<any> {
  theme?: Theme;
  legends?: any;
  customTooltip?: (datum: any) => any;
  showLegends?: boolean;
}

const NivoRadarChart: React.FC<INivoRadarChart> = (props: INivoRadarChart) => {
  const { legends, customTooltip, theme, showLegends } = props;

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
  const customLegends = legends ?? [
    {
      anchor: "top-right",
      direction: "column",
      translateX: -80,
      translateY: -60,
      itemWidth: 80,
      itemHeight: 20,
      itemTextColor: "#999",
      symbolSize: 12,
      symbolShape: "circle",
      effects: [
        {
          on: "hover",
          style: {
            itemTextColor: "#000",
          },
        },
      ],
    },
  ];

  // Legends configuration based on the showLegends prop
  const legendsConfig = showLegends ? customLegends : [];

  //Main return statement for the chart
  return (
    <div className="w-ful flex h-full flex-col items-center text-xs text-black">
      <ResponsiveRadar
        data={props.data}
        keys={props.keys}
        indexBy={props.indexBy}
        curve={props.curve ?? "catmullRomClosed"}
        fillOpacity={props.fillOpacity ?? 0.3}
        valueFormat={props.valueFormat ?? ">-.2f"}
        margin={props.margin ?? { top: 60, right: 80, bottom: 40, left: 80 }}
        gridLevels={props.gridLevels ?? 3}
        gridShape={props.gridShape ?? "circular"}
        enableDots={props.enableDots ?? true}
        borderColor={props.borderColor ?? { from: "color" }}
        borderWidth={props.borderWidth ?? 2}
        gridLabelOffset={props.gridLabelOffset ?? 25}
        dotSize={props.dotSize ?? 10}
        dotColor={props.dotColor ?? { theme: "background" }}
        dotBorderWidth={props.dotBorderWidth ?? 2}
        colors={props.colors ?? { scheme: "nivo" }}
        // colors={props.colors}
        blendMode={props.blendMode ?? "normal"}
        motionConfig={props.motionConfig ?? "wobbly"}
        legends={legendsConfig}
        sliceTooltip={customTooltip && (({ data }) => customTooltip(data))}
        theme={mergedTheme}
      />
    </div>
  );
};

export default React.memo(NivoRadarChart);

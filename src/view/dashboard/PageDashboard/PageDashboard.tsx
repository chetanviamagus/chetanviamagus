import ChartCard from "component/ChartCard/ChartCard";
import NivoBarChart from "component/NivoBarChart/NivoBarChart";
import NivoLineChart from "component/NivoLineChart/NivoLineChart";
import NivoPieChart from "component/NivoPieChart/NivoPieChart";
import NivoRadarChart from "component/NivoRadarChart/NivoRadarChart";
import SimpleDropDown from "component/SimpleDropDown/SimpleDropDown";
import Text from "component/Text/Text";
import BaseNivoLineChart from "component/base/BaseNivoLineChart/BaseNivoLineChart";
import { useAppDispatch, useAppSelector } from "hook/redux";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { linkAuthRoute, linkProjectBase, linkProjectChat } from "routes";
import { setSelectedProject } from "slice/ProjectSlice";
import { getLocalStorage } from "util/CommonUtil";
import { LOCAL_STORAGE } from "util/Constant";
import HomeContext from "util/api/home/home.context";

const PageDashboard = () => {
  const [options, setOptions] = useState([]);

  const { uid: projectUid } = useParams<{ uid: string }>();

  const navigate = useNavigate();

  // const {
  //   state: { selectedConversation },
  //   dispatch: homeDispatch,
  // } = useContext(HomeContext);

  const dispatch = useAppDispatch();
  const currentProject = useAppSelector((state) => state.project.selectedProject);

  useEffect(() => {
    const _options = JSON.parse(getLocalStorage(LOCAL_STORAGE.PROJECT_LIST) || "[]");
    if (_options.length > 0) {
      const temp = _options?.map((item: any) => {
        return {
          id: item.id,
          name: item?.projectInfo?.projectName ?? "",
          icon: item?.projectInfo?.projectIcon ?? null,
        };
      });
      setOptions(temp);
      const selectedProject = _options.find((item: any) => item.id === projectUid);
      dispatch(setSelectedProject(selectedProject ?? _options[_options.length - 1]));
    }
  }, []);

  return (
    <div className="mx-auto flex w-full flex-col p-3 md:max-w-rightContent">
      <div className="mb-6 flex flex-col items-center gap-3 px-3 pt-3 sm:flex-row sm:justify-between">
        <Text label={"Dashboard"} className="text-2xl font-semibold text-dark-text-main" />

        <SimpleDropDown
          hideLabel
          hideErrorRow
          options={options}
          optionLabel="name"
          // optionValue="id"
          value={currentProject}
          onChange={(e: any) => {
            dispatch(setSelectedProject(e.value));
            // homeDispatch({ field: "selectedConversation", value: undefined });
            navigate(
              linkAuthRoute + `${linkProjectBase}/${e.value?.id ?? "uid"}${linkProjectChat}`
            );
          }}
          dataKey="id"
          variant="secondary"
          itemTemplate={(option: any) => (
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full">
                <img src={option.icon} alt="" />
              </div>
              <div>{option?.name}</div>
            </div>
          )}
          valueTemplate={(option: any) => (
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-full">
                <img src={option?.icon} alt="" />
              </div>
              <div>{option?.name}</div>
            </div>
          )}
        />
      </div>

      <div className="screen-bg flex w-full flex-col gap-3 rounded-md p-3">
        <div className="grid w-full grid-cols-3 gap-3">
          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <ChartCard
              title={"Chart name"}
              graph={
                <div className="w-full">
                  <NivoPieChart
                    className="secondary-pie !h-60 w-full !pb-0"
                    chartData="~END~"
                    customLegends={[
                      {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateY: 40,
                        translateX: 0,
                        itemsSpacing: 0,
                        itemWidth: 60,
                        itemHeight: 30,
                        itemTextColor: "#ffffff",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 12,
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
                    ]}
                    showLegends={false}
                  />
                </div>
              }
            />
          </div>

          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <ChartCard
              title={"Chart name"}
              graph={
                <div className="w-full">
                  <NivoLineChart enableArea={false} chartData="hjsgj ~END~" />
                </div>
              }
            />
          </div>

          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <ChartCard
              title={"Chart name"}
              graph={
                <div className="h-60 w-full">
                  <NivoBarChart
                    showLegends={false}
                    height={400}
                    width={800}
                    groupMode="stacked"
                    data={[
                      { month: "Jan", server1: 10000, server1Color: "hsl(136, 70%, 50%)" },
                      { month: "Feb", server2: 15000, server2Color: "hsl(56, 70%, 50%)" },
                      { month: "Mar", server3: 11000, server3Color: "hsl(312, 70%, 50%)" },
                      { month: "Apr", server4: 14000, server4Color: "hsl(277, 70%, 50%)" },
                      { month: "May", server5: 20000, server5Color: "hsl(119, 70%, 50%)" },
                    ]}
                    keys={["server1", "server2", "server3", "server4", "server5"]}
                    defs={[
                      {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "#38bcb2",
                        size: 4,
                        padding: 1,
                        stagger: true,
                      },
                      {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "#eed312",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                      },
                    ]}
                    fill={[
                      {
                        match: {
                          id: "server3",
                        },
                        id: "dots",
                      },
                      {
                        match: {
                          id: "server5",
                        },
                        id: "lines",
                      },
                    ]}
                    indexBy={"month"}
                    enableGridX={false}
                    enableGridY={false}
                    borderRadius={6}
                    axisBottom={{
                      tickSize: 0,
                      tickPadding: 10,
                      tickRotation: 0,
                      legend: "Month",
                      legendPosition: "middle",
                      legendOffset: 40,
                      truncateTickAt: 0,
                    }}
                    axisLeft={{
                      tickSize: 0,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Cost",
                      legendPosition: "middle",
                      legendOffset: -40,
                      truncateTickAt: 0,
                      format: (value) => `${value / 1000}k`,
                    }}
                  />
                </div>
              }
            />
          </div>

          <div className="col-span-3 lg:col-span-2">
            <ChartCard
              title={"Chart name"}
              graph={
                <div className="relative h-65 w-full p-4">
                  <BaseNivoLineChart
                    data={[
                      {
                        id: "AWS",
                        data: [
                          {
                            x: "Jan",
                            y: 1200,
                          },
                          {
                            x: "Feb",
                            y: 1800,
                          },
                          {
                            x: "Mar",
                            y: 700,
                          },
                          {
                            x: "Apr",
                            y: 500,
                          },
                          {
                            x: "May",
                            y: 300,
                          },
                        ],
                        color: "#E0E1E5",
                      },
                      {
                        id: "MS Azure",
                        data: [
                          {
                            x: "Jan",
                            y: 200,
                          },
                          {
                            x: "Feb",
                            y: 1700,
                          },
                          {
                            x: "Mar",
                            y: 1000,
                          },
                          {
                            x: "Apr",
                            y: 1500,
                          },
                          {
                            x: "May",
                            y: 600,
                          },
                        ],
                        color: "#9FD356",
                      },
                    ]}
                    defs={[
                      {
                        id: "gradientA",
                        type: "linearGradient",
                        colors: [
                          { offset: 0, color: "inherit" },
                          { offset: 100, color: "inherit", opacity: 0 },
                        ],
                      },
                      // Add more gradients as needed
                    ]}
                    fill={[
                      {
                        match: {
                          id: "AWS",
                        },
                        id: "gradientA",
                      },
                      {
                        match: {
                          id: "MS Azure",
                        },
                        id: "gradientA",
                      },
                    ]}
                    axisBottom={{
                      legend: "Transport",
                    }}
                    axisLeft={{
                      legend: "Cost",
                      legendOffset: -40,
                      format: (value) => `${value / 1000}k`,
                    }}
                  />
                </div>
              }
            />
          </div>

          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <ChartCard
              title={"Chart name"}
              graph={
                <div className="h-62 w-full">
                  <NivoRadarChart
                    height={100}
                    width={100}
                    data={[
                      {
                        cost: "Jan",
                        AWS: 63,
                        Azure: 58,
                        Google: 30,
                      },
                      {
                        cost: "Feb",
                        AWS: 91,
                        Azure: 25,
                        Google: 105,
                      },
                      {
                        cost: "Mar",
                        AWS: 83,
                        Azure: 112,
                        Google: 119,
                      },
                      {
                        cost: "Apr",
                        AWS: 107,
                        Azure: 30,
                        Google: 70,
                      },
                      {
                        cost: "May",
                        AWS: 50,
                        Azure: 100,
                        Google: 60,
                      },
                    ]}
                    colors={["#9FD356", "#ED1C24", "#F2703E"]}
                    keys={["AWS", "Azure", "Google"]}
                    indexBy={"cost"}
                    showLegends
                  />
                </div>
              }
            />
          </div>

          <div className="col-span-3 md:col-span-2 lg:col-span-1">
            <ChartCard
              title={"Chart name"}
              graph={
                <div className="w-full">
                  <NivoPieChart
                    className="secondary-pie !h-60 w-full !pb-0"
                    chartData="~END~"
                    innerRadius={0.6}
                    customLegends={[
                      {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateY: 40,
                        translateX: 0,
                        itemsSpacing: 0,
                        itemWidth: 60,
                        itemHeight: 30,
                        itemTextColor: "#ffffff",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 12,
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
                    ]}
                    showLegends={false}
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDashboard;

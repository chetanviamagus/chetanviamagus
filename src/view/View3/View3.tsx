import logo1 from "asset/img/icons/bell.svg";
import logo2 from "asset/img/icons/check_icon.svg";
import logo3 from "asset/img/icons/influxdb-blue.svg";
import logo4 from "asset/img/icons/inquire.svg";
import logo6 from "asset/img/icons/send-message.svg";
import logo5 from "asset/img/icons/settings-white.svg";
import hawkEyeLogo from "asset/img/logos/logo.svg";
import BarChart from "component/BarChart";
import BubbleChart from "component/BubbleChart";
import ButtonBox from "component/ButtonBox/ButtonBox";
import ChartCard from "component/ChartCard/ChartCard";
import ChatBotInput from "component/ChatBotInput/ChatBotInput";
import ChatBotText from "component/ChatBotText/ChatBotText";
import DialogBox from "component/Dialog/Dialog";
import DoughnutChart from "component/DoughnutChart";
import FileUploadDemo from "component/FileUploadDemo/FileUploadDemo";
import IconSelector from "component/IconSelector/IconSelector";
import InputSearch from "component/InputSearch/InputSearch";
import LineChart2 from "component/LineChart2";
import NivoBarChart from "component/NivoBarChart/NivoBarChart";
import NivoLineChart from "component/NivoLineChart/NivoLineChart";
import NivoPieChart from "component/NivoPieChart/NivoPieChart";
import NivoRadarChart from "component/NivoRadarChart/NivoRadarChart";
import PieChart from "component/PieChart";
import PolarAreaChart from "component/PolarAreaChart";
import QuickNavCard from "component/QuickNavCard/QuicknavCard";
import RadarChart from "component/RadarChart";
import SimpleAccordion from "component/SimpleAccordion/SimpleAccordion";
import SimpleSelectButton from "component/SimpleSelectButton/SimpleSelectButton";
import Stepper from "component/Stepper/Stepper";
import TeamCard from "component/TeamCard/TeamCard";
import BaseNivoLineChart from "component/base/BaseNivoLineChart";
import BaseNivoPieChart from "component/base/BaseNivoPieChart/BaseNivoPieChart";
import { useState } from "react";
import { linkAuthRoute } from "routes";

const createGradient = () => {
  const gradient = document.createElement("canvas").getContext("2d");
  const gradientFill = gradient?.createLinearGradient(0, 0, 0, 400);
  if (gradientFill) {
    gradientFill.addColorStop(0, "rgb(255, 167, 38, 0.6)");
    gradientFill.addColorStop(0.5, "rgb(255, 167, 38, 0.3)");
    gradientFill.addColorStop(1, "rgb(255, 167, 38, 0.1)");
    return gradientFill;
  }
};

const View3 = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    // You can perform additional actions when the image is selected in the App component
  };
  return (
    <div className="flex mx-auto w-full md:max-w-rightContent p-3 flex-col items-center justify-center">
      <div className="text-xl text-white">View3</div>

      <NivoPieChart chartData=" ~END~" />

      <div className="relative w-full p-6">
        <DoughnutChart
          data={[50, 100, 200]} // data to be passed
          dataLabels={["A", "B", "C"]} //respective data labels to be passed (wrt data)
          // dataBackgroundColors={["#FF6384", "#36A2EB", "#FFCE56"]} // respective background colors (wrt data)
          // dataHoverBackgroundColors={["#FF6384", "#36A2EB", "#FFCE56"]} // respective hover background colors (wrt data)
          chartLabel={"Doughnut chart"}
          label={"Doughnut chart"}
          // valueToBeShownInCenter={"300%"} // if any value is to be shown in center
          legendsPosition={"TOP_LEFT"} // if you want to place the legends anywhere in the container
          isTooltipLegendVisible // if color code for a label is required
          // lightOptions={lightOptions} // if you want to create custom tooltip other and prepare the tooltip from scratch
          tooltipStyles={{ width: "100px" }} //use the props available to style the tooltip with them as required
        />
      </div>

      <div className="relative w-full p-6">
        <PieChart
          data={[50, 100, 200]} // data to be passed
          label={"Pie chart"}
          chartLabel={"Pie chart"}
          dataLabels={["A", "B", "C"]} //respective data labels to be passed (wrt data)
          // dataBackgroundColors={["#FF6384", "#36A2EB", "#FFCE56"]} // respective background colors (wrt data)
          // dataHoverBackgroundColors={["#FF6384", "#36A2EB", "#FFCE56"]} // respective hover background colors (wrt data)
          // valueToBeShownInCenter={"300%"} // if any value is to be shown in center
          legendsPosition={"BOTTOM_LEFT"} // if you want to place the legends anywhere in the container
          isTooltipLegendVisible // if color code for a label is required
          // lightOptions={lightOptions} // if you want to create custom tooltip other and prepare the tooltip from scratch
          tooltipStyles={{ width: "100px" }} //use the props available to style the tooltip with them as required
        />
      </div>

      <div className="relative w-full p-6">
        <BarChart
          // barChartType="MULTI_AXIS" // if the the data is of multi axis type please don't forget to mention the barChartType
          legendsPosition="TOP_LEFT"
          data={{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: "#42A5F5",
                data: [65, 59, 80, 81, 56, 55, 40],
              },
              {
                label: "My Second dataset",
                backgroundColor: "#FFA726",
                data: [28, 48, 40, 19, 86, 27, 90],
              },
            ],
          }}
          /*For multi axis data*/
          // data={{
          //   labels: ["January", "February", "March", "April", "May", "June", "July"],
          //   datasets: [
          //     {
          //       label: "Dataset 1",
          //       backgroundColor: [
          //         "#EC407A",
          //         "#AB47BC",
          //         "#42A5F5",
          //         "#7E57C2",
          //         "#66BB6A",
          //         "#FFCA28",
          //         "#26A69A",
          //       ],
          //       yAxisID: "y",
          //       data: [65, 59, 80, 81, 56, 55, 10],
          //     },
          //     {
          //       label: "Dataset 2",
          //       backgroundColor: "#78909C",
          //       yAxisID: "y1",
          //       data: [28, 48, 40, 19, 86, 27, 90],
          //     },
          //   ],
          // }}
        />
      </div>

      <div className="relative w-full p-6">
        <LineChart2
          // lineChartType="MULTI_AXIS" // if the the data is of multi axis type please don't forget to mention the barChartType
          title="Line Chart"
          data={{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: true,
                backgroundColor: createGradient(),
                borderColor: "#42A5F5",
                tension: 0.4,
              },
              {
                label: "Second Dataset",
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: true,
                backgroundColor: createGradient(), // for gradient in fill
                borderColor: "#FFA726",
                tension: 0.4,
              },
            ],
          }}
          /*For multi axis data*/
          // data={{
          //   labels: ["January", "February", "March", "April", "May", "June", "July"],
          //   datasets: [
          //     {
          //       label: "Dataset 1",
          //       fill: false,
          //       borderColor: "#42A5F5",
          //       yAxisID: "y",
          //       tension: 0.4,
          //       data: [65, 59, 80, 81, 56, 55, 10],
          //     },
          //     {
          //       label: "Dataset 2",
          //       fill: false,
          //       borderColor: "#00bb7e",
          //       yAxisID: "y1",
          //       tension: 0.4,
          //       data: [28, 48, 40, 19, 86, 27, 90],
          //     },
          //   ],
          // }}
        />
      </div>

      <div className="relative w-full p-6">
        <PolarAreaChart
          title="Polar Area Chart"
          legendsPosition="BOTTOM_CENTER"
          data={{
            datasets: [
              {
                data: [11, 16, 7, 3, 14],
                backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#26C6DA", "#7E57C2"],
                label: "My dataset 1",
              },
            ],
            labels: ["Blue", "Green", "Yellow", "Sky blue", "Purple"],
          }}
        />
      </div>

      <div className="relative w-full p-6">
        <RadarChart
          title="Radar chart"
          data={{
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: [65, 59, 90, 81, 56, 55, 40],
              },
              {
                label: "My Second dataset",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                pointBackgroundColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255,99,132,1)",
                data: [28, 48, 40, 19, 96, 27, 100],
              },
            ],
          }}
        />
      </div>

      <div className="relative w-full p-6">
        <BubbleChart
          // lineChartType="MULTI_AXIS" // if the the data is of multi axis type please don't forget to mention the barChartType
          title="Bubble Chart"
          data={{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "First Dataset",
                data: [
                  {
                    x: 20,
                    y: 30,
                    r: 15,
                  },
                  {
                    x: 10,
                    y: 20,
                    r: 10,
                  },
                  {
                    x: 30,
                    y: 40,
                    r: 5,
                  },
                  {
                    x: 60,
                    y: 30,
                    r: 15,
                  },
                ],
                backgroundColor: "#42A5F5",
              },
              {
                label: "Second Dataset",
                data: [
                  {
                    x: 60,
                    y: 20,
                    r: 10,
                  },
                  {
                    x: 20,
                    y: 70,
                    r: 15,
                  },
                  {
                    x: 60,
                    y: 10,
                    r: 15,
                  },
                  {
                    x: 30,
                    y: 80,
                    r: 5,
                  },
                ], // for gradient in fill
                backgroundColor: "#FFA726",
              },
            ],
          }}
        />
      </div>

      <div className="relative h-100 w-full p-4">
        <BaseNivoPieChart
          height={400}
          width={400}
          innerRadius={0.6}
          title="Base Nivo Pie Chart"
          data={[
            {
              id: "make",
              label: "make",
              value: 202,
              color: "#B2DC78",
            },
            {
              id: "elixir",
              label: "elixir",
              value: 410,
              color: "#FFC107",
            },
            {
              id: "lisp",
              label: "lisp",
              value: 95,
              color: "#F58286",
            },
            {
              id: "php",
              label: "php",
              value: 250,
              color: "#F14950",
            },
            {
              id: "css",
              label: "css",
              value: 59,
              color: "#F58D65",
            },
          ]}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "make",
              },
              id: "dots",
            },
            {
              match: {
                id: "css",
              },
              id: "dots",
            },
          ]}
        />
      </div>

      <div className="relative h-100 w-full p-4">
        <BaseNivoLineChart
          title="Nivo line chart"
          data={[
            {
              id: "Japan",
              data: [
                {
                  x: "Plane",
                  y: 14,
                },
                {
                  x: "Helicopter",
                  y: 109,
                },
                {
                  x: "Boat",
                  y: 238,
                },
                {
                  x: "Train",
                  y: 48,
                },
                {
                  x: "Subway",
                  y: 37,
                },
                {
                  x: "Bus",
                  y: 280,
                },
              ],
              color: "#E0E1E5",
            },
            {
              id: "France",
              data: [
                {
                  x: "Plane",
                  y: 216,
                },
                {
                  x: "Helicopter",
                  y: 90,
                },
                {
                  x: "Boat",
                  y: 53,
                },
                {
                  x: "Train",
                  y: 269,
                },
                {
                  x: "Subway",
                  y: 222,
                },
                {
                  x: "Bus",
                  y: 182,
                },
              ],
              color: "#9FD356",
            },
          ]}
          axisBottom={{
            legend: "Transport",
          }}
          axisLeft={{
            legend: "Cost",
          }}
        />
      </div>

      <NivoLineChart chartData="hjsgj ~END~" />

      <div className="relative h-100 w-full p-4">
        <BaseNivoLineChart
          data={[
            {
              id: "japan",
              color: "green",
              data: [
                {
                  x: "plane",
                  y: 14,
                },
                {
                  id: "helicopter",
                  x: "helicopter",
                  y: 109,
                },
                {
                  x: "boat",
                  y: 238,
                },
                {
                  x: "train",
                  y: 48,
                },
                {
                  x: "subway",
                  y: 37,
                },
                {
                  x: "bus",
                  y: 280,
                },
              ],
            },
          ]}
          curve="monotoneX"
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            legend: "Duration",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            legend: "Cost",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          useMesh={true}
          enableGridX={false}
          enableGridY={false}
          defs={[
            {
              id: "gradientA",
              type: "linearGradient",
              colors: [
                { offset: 0, color: "inherit" },
                { offset: 100, color: "white" },
              ],
            },
            // Add more gradients as needed
          ]}
          fill={[
            {
              match: {
                id: "japan",
              },
              id: "gradientA",
            },
            {
              match: {
                id: "japan",
              },
              id: "gradientA",
            },
            {
              match: {
                id: "france",
              },
              id: "gradientA",
            },
          ]}
          enableArea={true}
          areaBaselineValue={0}
          customTooltip={(datum: any) => {
            return (
              <div className="flex max-w-fit items-center justify-center rounded-lg bg-white p-3">
                <div className={`mr-1.5 h-4 w-4 rounded-sm bg-red-400`} />
                <div>
                  <span className="font-bold">{datum?.point?.data.x}</span>: {datum?.point?.data.y}
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="relative h-100 w-full p-4">
        <NivoBarChart
          height={400}
          width={800}
          data={[
            {
              country: "AD",
              "hot dog": 136,
              "hot dogColor": "hsl(292, 70%, 50%)",
              burger: 88,
              burgerColor: "hsl(43, 70%, 50%)",
              sandwich: 7,
              sandwichColor: "hsl(169, 70%, 50%)",
              kebab: 151,
              kebabColor: "hsl(206, 70%, 50%)",
              fries: 154,
              friesColor: "hsl(269, 70%, 50%)",
              donut: 173,
              donutColor: "hsl(119, 70%, 50%)",
            },
            {
              country: "AE",
              "hot dog": 24,
              "hot dogColor": "hsl(6, 70%, 50%)",
              burger: 75,
              burgerColor: "hsl(204, 70%, 50%)",
              sandwich: 58,
              sandwichColor: "hsl(151, 70%, 50%)",
              kebab: 139,
              kebabColor: "hsl(21, 70%, 50%)",
              fries: 148,
              friesColor: "hsl(254, 70%, 50%)",
              donut: 102,
              donutColor: "hsl(246, 70%, 50%)",
            },
            {
              country: "AF",
              "hot dog": 73,
              "hot dogColor": "hsl(29, 70%, 50%)",
              burger: 97,
              burgerColor: "hsl(267, 70%, 50%)",
              sandwich: 100,
              sandwichColor: "hsl(316, 70%, 50%)",
              kebab: 171,
              kebabColor: "hsl(301, 70%, 50%)",
              fries: 13,
              friesColor: "hsl(190, 70%, 50%)",
              donut: 103,
              donutColor: "hsl(34, 70%, 50%)",
            },
            {
              country: "AG",
              "hot dog": 78,
              "hot dogColor": "hsl(136, 70%, 50%)",
              burger: 152,
              burgerColor: "hsl(56, 70%, 50%)",
              sandwich: 19,
              sandwichColor: "hsl(212, 70%, 50%)",
              kebab: 57,
              kebabColor: "hsl(312, 70%, 50%)",
              fries: 187,
              friesColor: "hsl(277, 70%, 50%)",
              donut: 166,
              donutColor: "hsl(119, 70%, 50%)",
            },
          ]}
          keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy={"country"}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "food",
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          barAriaLabel={(e) => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
        />
      </div>

      <div className="relative h-100 w-full p-4">
        <NivoBarChart
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

      <div className="relative h-100 w-full p-4">
        <NivoRadarChart
          height={400}
          width={800}
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

      <div className="my-6 flex w-full items-start">
        <Stepper
          model={[
            { state: "completed", label: "Step 1" },
            { state: "active", label: "Step 2" },
            { state: "pending", label: "Step 3" },
          ]}
          stepperLoader={false}
        />
      </div>

      <div className="my-6 flex w-full flex-col gap-3">
        <ChatBotText text="Nice, now can you describe this project?" chatIcon={hawkEyeLogo} />
        <ChatBotText
          sender="user"
          text="Project Tracking and optimizing server performance, Project Tracking and optimize server performance"
          chatIcon={hawkEyeLogo}
        />
      </div>

      <div className="my-6 w-full">
        <ChatBotInput handleSend={(text: string) => console.log(text)} />
      </div>

      {/* Icon selector component */}
      <div className="my-6 w-full">
        <IconSelector
          images={[hawkEyeLogo, logo1, logo2, logo3, logo4, logo5, logo6]}
          onImageSelect={handleImageSelect}
        />

        {selectedImage && (
          <div>
            <h3>Selected Image:</h3>
            <img src={selectedImage} alt="Selected" />
          </div>
        )}
      </div>

      {/* Upload component */}
      <div className="my-6 w-full">
        <FileUploadDemo
          onFileSelect={(files: any) => {
            console.log("Uploaded:", files);
          }}
        />
      </div>

      {/* Search input */}
      <div className="my-6 w-full">
        <InputSearch handleSearch={(value: string) => console.log(value)} />
      </div>

      <div>
        <ButtonBox label="Dialog" className="w-34" onClick={() => setShowDialog(true)} />

        <DialogBox
          visible={showDialog}
          onHide={() => setShowDialog(false)}
          children={<div>Dialog</div>}
        />
      </div>

      <div className="my-6 w-full">
        <SimpleAccordion
          multiple={false}
          accordionItems={[
            {
              header: "Section 1",
              content: <div className="px-6">Your custom JSX content for Section 1 goes here.</div>,
            },
            {
              header: "Section 2",
              content: <div className="px-6">Your custom JSX content for Section 2 goes here.</div>,
            },
            // Add more sections as needed
          ]}
        />
      </div>

      <div className="my-6 w-full">
        <SimpleSelectButton
          // multiple
          options={[
            { name: "Option 1", value: "option1" },
            { name: "Option 2", value: "option2" },
            { name: "Option 3", value: "option3" },
          ]}
          onChange={(selectedValue: any) => {
            // Handle the selected value as needed
            console.log("Selected Value:", selectedValue);
          }}
        />
      </div>

      <div className="w-101">
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

      <div className="w-full px-40">
        <TeamCard profilePicture={logo5} name="Neubird" email="neubird.ai" tenantType="owner" />
      </div>

      <div className="my-6 w-full">
        <QuickNavCard
          title={"Add team member"}
          description={"You dont have any members in your project... add team members"}
          navigateTo={linkAuthRoute}
        />
      </div>
    </div>
  );
};

export default View3;

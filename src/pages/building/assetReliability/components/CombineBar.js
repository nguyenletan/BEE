import React, { Fragment } from "react";

import { line, area } from "d3-shape";
import { Bar } from "@nivo/bar";

const barColor = "#0095ff";
const lineColor = "rgba(200, 30, 15, 1)";
const areaColor = "#0095ff";

// `v` is used for bars
// `v1` is used for line
// `v2` is used for area
const data = [
  { x: "0", v: 33, v1: 2.0, v2: 1.2 },
  { x: "1", v: 35, v1: 3.1, v2: 1.3 },
  { x: "2", v: 38, v1: 2.3, v2: 1.1 },
  { x: "3", v: 41, v1: 3.1, v2: 2.3 },
  { x: "4", v: 4, v1: 4.0, v2: 2.6 },
  { x: "5", v: 4, v1: 3.9, v2: 2.7 },
  { x: "6", v: 49, v1: 2.9, v2: 2.3 },
  { x: "7", v: 52, v1: 3.3, v2: 1.8 }
];


const data2 = [
  {
    subSystem: 'cooling',
    id: 0,
    used: 5000,
    accrued: 1300,
    allocated: 7300,
  },
  {
    subSystem: 'heating',
    used: 3000,
    accrued: 5100,
    id: 1,
    allocated: 6500,
  },{
    subSystem: 'lighting',
    used: 3100,
    accrued: 200,
    allocated: 4300,
    id: 2,
  },{
    subSystem: 'mechanical ventilation',
    used: 5900,
    accrued: 900,
    allocated: 7200,
    id: 3,
  },{
    subSystem: 'facility envelope',
    used: 4000,
    accrued: 5900,
    allocated: 4300,
    id: 4,
  },{
    subSystem: 'renewables',
    used: 1800,
    accrued: 500,
    allocated: 3100,
    id: 5
  },
  {
    subSystem: 'others',
    id: 6,
    used: 2100,
    accrued: 300,
    allocated: 3100,
  },
]



const Line = ({ bars, xScale, yScale }) => {
  const lineGenerator = line()
    .x(bar => xScale(bar.data.index) + bar.width / 2)
    .y(bar => yScale(bar.data.data.allocated));

  return (
    <Fragment>
      <path
        d={lineGenerator(bars)}
        fill="none"
        stroke={lineColor}
        style={{ pointerEvents: "none" }}
      />
      {bars.map(bar => (
        <circle
          key={bar.key}
          cx={xScale(bar.data.index) + bar.width / 2}
          cy={yScale(bar.data.data.v1)}
          r={4}
          fill="white"
          stroke={lineColor}
          style={{ pointerEvents: "none" }}
        />
      ))}
    </Fragment>
  );
};

const CombineBar = () => (
  <div className="App">
    <Bar
      width={500}
      height={400}
      data={data2}
      keys={["used", "accrued"]}

      padding={0.6}
      groupMode= 'stacked'
      margin={{
        top: 10,
        right: 10,
        bottom: 36,
        left: 36
      }}
      indexBy="id"
      enableLabel={false}
      colors={['#87972f', '#d3dca1', '#636c2e']}
      borderRadius={2}
      // axisLeft={{
      //   tickValues: 7
      // }}
      layers={["grid", "axes", "bars", "markers", "legends", Line]}
    />
  </div>
);


export default CombineBar

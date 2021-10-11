import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import _ from 'lodash'
import moment from 'moment'

const EnergyConsumptionLineChartForGroupByDayOrWeek = ({ data, groupBy, onSelectDay }) => {
  console.log(data)

  const groupByYear = Object.entries(_.groupBy(data, 'year'))

  const datasource = groupByYear.map(g => {
    return {
      id: g[0],
      data: g[1].map(d => {
        return {
          x: d.label,
          y: d.value,
        }
      }),
    }
  })

  //
  // const datasource = [
  //   {
  //     id: groupBy,
  //     color: '#87972f',
  //     data: data.map(d => {
  //       return {
  //         x: d.label,
  //         y: d.value,
  //       }
  //     }),
  //   },
  // ]

  const commonProperties = {
    margin: { top: 0, right: 0, bottom: 60, left: 20 },
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'top-right',
        direction: 'row',
        justify: false,
        translateX: 50,
        translateY: -70,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ],
    sliceTooltip: ({ slice }) => {
      // console.log(slice)
      return (
        <div
          style={{
            background: 'white',
            padding: '9px 12px',
            border: '1px solid #ccc',
          }}
        >
          {slice.points.map(point => (
            <div
              key={point.id}
              style={{
                color: point.serieColor,
                padding: '3px 0',
              }}
            >
              <strong>{point.data.xFormatted}: </strong> {point.data.yFormatted} mWh
            </div>
          ))}
        </div>
      )
    },
    enableArea: true,
    areaOpacity: 0.07,
    colors: { scheme: 'category10' },
    data: datasource,
    animate: true,
    axisBottom: false,
    enableSlices: false,
    useMesh: true,
    enableGridX: false,
    enablePoints: groupBy === 'week' || data?.length < 100,
    pointSize: 10,
    // pointBorderWidth: 2,
    // pointBorderColor:{ from: 'serieColor' },
    // pointColor: { theme: 'background' },
    isInteractive: true,
  }

  const onSelectLine = (point, event) => {
    // console.log(event)
    onSelectDay(moment(point.data.x, "DD/MM/YYYY").toDate(), point.data.y, point.index)
  }

  return (
    <ResponsiveLine
      {...commonProperties}
      data={datasource}
      onClick={onSelectLine}
      yScale={{
        type: 'linear',
        stacked: false,
      }}
      // curve="natural"
    />
  )

}

export default EnergyConsumptionLineChartForGroupByDayOrWeek
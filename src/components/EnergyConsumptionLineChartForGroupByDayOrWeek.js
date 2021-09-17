import React from 'react'
import { ResponsiveLine } from '@nivo/line'
import _ from 'lodash'

const EnergyConsumptionLineChartForGroupByDayOrWeek = ({ data, groupBy }) => {

  const groupByYear = Object.entries(_.groupBy(data, 'year'))

  const datasource = groupByYear.map(g => {
    return {
      id: g[0],
      data: g[1].map(d => {
        return {
          x: d.label,
          y: d.value,
        }
      })
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
    margin: { top: 0, right: 0, bottom: 100, left: 30 },
    sliceTooltip: ({ slice }) => {
      console.log(slice)
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
              <strong>{point.data.xFormatted}: </strong> {point.data.yFormatted}
            </div>
          ))}
        </div>
      )
    },
    enableArea:true,
    areaOpacity:0.07,
    colors: { scheme: 'category10' },
    data: datasource,
    animate: true,
    axisBottom: false,
    enableSlices: false,
    useMesh: true,
    enableGridX: groupBy === 'week',
    enablePoints: groupBy === 'week',
    isInteractive: true,
  }

  return (
    <ResponsiveLine
      {...commonProperties}
      data={datasource}
      yScale={{
        type: 'linear',
        stacked: false,
      }}
      curve="natural"
    />
  )

}

export default EnergyConsumptionLineChartForGroupByDayOrWeek
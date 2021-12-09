import { ResponsiveRadialBar } from '@nivo/radial-bar'
import styled from 'styled-components'

const RadialBarTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 20px;
`

const RadialBarWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 10px;
  @media (min-width: 768px) {
    padding: 20px;
  }
  margin-top: 50px;
  margin-bottom: 40px;

  height: 500px;
  max-width: 50%;
`


const RadialBar = () => {
  const data = [
    {
      "id": "F+E Campus",
      "data": [
        {
          "x": "Energy Usage Intensity",
          "y": 229
        },
        {
          "x": "Cooling Efficiency",
          "y": 203
        },
        {
          "x": "Heating Efficiency",
          "y": 279
        },
        {
          "x": "Lighting Efficiency",
          "y": 290
        },
        {
          "x": "Mechanical Ventilation Efficiency",
          "y": 210
        },
        {
          "x": "Envelope Performance",
          "y": 180
        },
        {
          "x": "Renewables Usage",
          "y": 110
        },
      ]
    },
    {
      "id": "Hill Bay Central Bank Center",
      "data": [
        {
          "x": "Energy Usage Intensity",
          "y": 258
        },
        {
          "x": "Cooling Efficiency",
          "y": 119
        },
        {
          "x": "Heating Efficiency",
          "y": 289
        },
        {
          "x": "Lighting Efficiency",
          "y": 264
        },
        {
          "x": "Mechanical Ventilation Efficiency",
          "y": 200
        },
        {
          "x": "Envelope Performance",
          "y": 190
        },
        {
          "x": "Renewables Usage",
          "y": 80
        },
      ]
    },
    {
      "id": "Design Excellent Center",
      "data": [
        {
          "x": "Energy Usage Intensity",
          "y": 235
        },
        {
          "x": "Cooling Efficiency",
          "y": 126
        },
        {
          "x": "Heating Efficiency",
          "y": 232
        },
        {
          "x": "Lighting Efficiency",
          "y": 189
        },
        {
          "x": "Mechanical Ventilation Efficiency",
          "y": 150
        },
        {
          "x": "Envelope Performance",
          "y": 120
        },
        {
          "x": "Renewables Usage",
          "y": 160
        },
      ]
    }
  ]

  return (
    <RadialBarWrapper>
      <RadialBarTitle>Building Performance Comparison</RadialBarTitle>
      <RadialBarWrapper>
        <ResponsiveRadialBar
          height={350}
          width={350}
          data={data}
          valueFormat=">-.2f"
          padding={0.4}
          enableRadialGrid={true}
          enableCircularGrid={false}
          colors={["#2d6a4f","#40916c","#52b788","#74c69d","#95d5b2","#b7e4c7","#d8f3dc"]}
          cornerRadius={0}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
          circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 160,
              translateY: 0,
              itemsSpacing: 6,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              symbolSize: 18,
              symbolShape: 'square',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                }
              ]
            }
          ]}
        />
      </RadialBarWrapper>
    </RadialBarWrapper>
  )
}

export default RadialBar
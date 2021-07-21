import React, { useState } from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'

import coolingImg from '../../../../assets/images/cooling.svg'
import heatingImg from '../../../../assets/images/heating.svg'
import mechVenImg from '../../../../assets/images/mechanical-ventilation.svg'

const AssetHealthTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`

const AssetHealthOptions = styled.ul`
  margin-left: 2rem;
  margin-bottom: .7rem;
`

const AssetHealthOptionItem = styled.li`
  display: inline-block;
  list-style-type: none;
  margin-right: 2.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: var(--gray);


  &.active {
    color: var(--bs-primary);
    font-weight: 700;
  }

  &:hover {
    text-decoration: underline;
    color: var(--dark);
  }
`

const AssetHealthOptionIcons = styled.img`
  margin-right: .5rem;
`

const AssetHealthTimeLineOptions = styled.ul`
  margin-right: 1rem;
  margin-bottom: 0;
`

const AssetHealthTimeLineOptionItem = styled.ul`
  display: inline-block;
  list-style-type: none;
  margin-right: 2rem;
  font-size: 0.75rem;
  cursor: pointer;
  text-transform: capitalize;
  color: var(--gray);


  &.active {
    color: var(--bs-primary);
    font-weight: 700;
  }

  &:hover {
    text-decoration: underline;
    color: var(--dark);
  }
`

const AssetHealthWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100%;
  height: 440px;

`

const AssetHealth = () => {
  const data = {
    cooling: {
      name: 'cooling',
      data: [
        {
          id: 'Lowest Asset Health',
          data:
            [
              {
                x: 'Jan',
                y: '35'
              },
              {
                x: 'Feb',
                y: '41'
              },
              {
                x: 'Mar',
                y: '43'
              },
              {
                x: 'Apr',
                y: '49'
              },
              {
                x: 'May',
                y: '53'
              },
              {
                x: 'Jun',
                y: '50'
              },
              {
                x: 'Jul',
                y: '47'
              },
              {
                x: 'Aug',
                y: '34'
              },
              {
                x: 'Sep',
                y: '26'
              },
              {
                x: 'Oct',
                y: '31'
              },
              {
                x: 'Nov',
                y: '37'
              },
              {
                x: 'Dec',
                y: '50'
              }
            ]
        },
        {
          id: 'Average Asset Health',
          data:
            [
              {
                x: 'Jan',
                y: '55'
              },
              {
                x: 'Feb',
                y: '60'
              },
              {
                x: 'Mar',
                y: '63'
              },
              {
                x: 'Apr',
                y: '73'
              },
              {
                x: 'May',
                y: '72'
              },
              {
                x: 'Jun',
                y: '59'
              },
              {
                x: 'Jul',
                y: '53'
              },
              {
                x: 'Aug',
                y: '50'
              },
              {
                x: 'Sep',
                y: '59'
              },
              {
                x: 'Oct',
                y: '64'
              },
              {
                x: 'Nov',
                y: '71'
              },
              {
                x: 'Dec',
                y: '74'
              }
            ]
        },
        {
          id: 'Best Asset Health',
          data:
            [
              {
                x: 'Jan',
                y: '95'
              },
              {
                x: 'Feb',
                y: '96'
              },
              {
                x: 'Mar',
                y: '92'
              },
              {
                x: 'Apr',
                y: '85'
              },
              {
                x: 'May',
                y: '83'
              },
              {
                x: 'Jun',
                y: '75'
              },
              {
                x: 'Jul',
                y: '73'
              },
              {
                x: 'Aug',
                y: '70'
              },
              {
                x: 'Sep',
                y: '75'
              },
              {
                x: 'Oct',
                y: '81'
              },
              {
                x: 'Nov',
                y: '88'
              },
              {
                x: 'Dec',
                y: '91'
              }
            ]
        }
      ]
    },

    heating:
      {
        name: 'heating',
        data: [
          {
            id: 'Lowest Asset Health',
            data:
              [
                {
                  x: 'Jan',
                  y: '38'
                },
                {
                  x: 'Feb',
                  y: '41'
                },
                {
                  x: 'Mar',
                  y: '44'
                },
                {
                  x: 'Apr',
                  y: '49'
                },
                {
                  x: 'May',
                  y: '53'
                },
                {
                  x: 'Jun',
                  y: '55'
                },
                {
                  x: 'Jul',
                  y: '47'
                },
                {
                  x: 'Aug',
                  y: '40'
                },
                {
                  x: 'Sep',
                  y: '31'
                },
                {
                  x: 'Oct',
                  y: '35'
                },
                {
                  x: 'Nov',
                  y: '40'
                },
                {
                  x: 'Dec',
                  y: '55'
                }
              ]
          },
          {
            id: 'Average Asset Health',
            data:
              [
                {
                  x: 'Jan',
                  y: '54'
                },
                {
                  x: 'Feb',
                  y: '59'
                },
                {
                  x: 'Mar',
                  y: '60'
                },
                {
                  x: 'Apr',
                  y: '69'
                },
                {
                  x: 'May',
                  y: '71'
                },
                {
                  x: 'Jun',
                  y: '60'
                },
                {
                  x: 'Jul',
                  y: '55'
                },
                {
                  x: 'Aug',
                  y: '55'
                },
                {
                  x: 'Sep',
                  y: '59'
                },
                {
                  x: 'Oct',
                  y: '64'
                },
                {
                  x: 'Nov',
                  y: '73'
                },
                {
                  x: 'Dec',
                  y: '77'
                }
              ]
          },
          {
            id: 'Best Asset Health',
            data:
              [
                {
                  x: 'Jan',
                  y: '93'
                },
                {
                  x: 'Feb',
                  y: '87'
                },
                {
                  x: 'Mar',
                  y: '85'
                },
                {
                  x: 'Apr',
                  y: '85'
                },
                {
                  x: 'May',
                  y: '79'
                },
                {
                  x: 'Jun',
                  y: '78'
                },
                {
                  x: 'Jul',
                  y: '83'
                },
                {
                  x: 'Aug',
                  y: '85'
                },
                {
                  x: 'Sep',
                  y: '88'
                },
                {
                  x: 'Oct',
                  y: '81'
                },
                {
                  x: 'Nov',
                  y: '85'
                },
                {
                  x: 'Dec',
                  y: '92'
                }
              ]
          }
        ]
      },

    mechanicalVentilation:
      {
        name: 'mechanical ventilation',
        data: [
          {
            id: 'Lowest Asset Health',
            data:
              [
                {
                  x: 'Jan',
                  y: '39'
                },
                {
                  x: 'Feb',
                  y: '41'
                },
                {
                  x: 'Mar',
                  y: '44'
                },
                {
                  x: 'Apr',
                  y: '55'
                },
                {
                  x: 'May',
                  y: '53'
                },
                {
                  x: 'Jun',
                  y: '50'
                },
                {
                  x: 'Jul',
                  y: '47'
                },
                {
                  x: 'Aug',
                  y: '39'
                },
                {
                  x: 'Sep',
                  y: '40'
                },
                {
                  x: 'Oct',
                  y: '36'
                },
                {
                  x: 'Nov',
                  y: '41'
                },
                {
                  x: 'Dec',
                  y: '50'
                }
              ]
          },
          {
            id: 'Average Asset Health',
            data:
              [
                {
                  x: 'Jan',
                  y: '59'
                },
                {
                  x: 'Feb',
                  y: '65'
                },
                {
                  x: 'Mar',
                  y: '63'
                },
                {
                  x: 'Apr',
                  y: '69'
                },
                {
                  x: 'May',
                  y: '72'
                },
                {
                  x: 'Jun',
                  y: '59'
                },
                {
                  x: 'Jul',
                  y: '55'
                },
                {
                  x: 'Aug',
                  y: '51'
                },
                {
                  x: 'Sep',
                  y: '59'
                },
                {
                  x: 'Oct',
                  y: '64'
                },
                {
                  x: 'Nov',
                  y: '71'
                },
                {
                  x: 'Dec',
                  y: '80'
                }
              ]
          },
          {
            id: 'Best Asset Health',
            data:
              [
                {
                  x: 'Jan',
                  y: '95'
                },
                {
                  x: 'Feb',
                  y: '92'
                },
                {
                  x: 'Mar',
                  y: '92'
                },
                {
                  x: 'Apr',
                  y: '85'
                },
                {
                  x: 'May',
                  y: '80'
                },
                {
                  x: 'Jun',
                  y: '79'
                },
                {
                  x: 'Jul',
                  y: '73'
                },
                {
                  x: 'Aug',
                  y: '74'
                },
                {
                  x: 'Sep',
                  y: '71'
                },
                {
                  x: 'Oct',
                  y: '79'
                },
                {
                  x: 'Nov',
                  y: '81'
                },
                {
                  x: 'Dec',
                  y: '83'
                }
              ]
          }
        ]
      }
  }

  const [selectedData, selectData] = useState(data.cooling)

  const commonProperties = {

    margin: { top: 30, right: 20, bottom: 110, left: 40 },
    // data: selectedData,
    animate: true,
    motionConfig: 'gentle'
    // enableSlices: 'x',
  }

  const onSelect = (e) => {
    switch (e) {
      case 'cooling':
        selectData(data.cooling)
        break
      case 'heating':
        selectData(data.heating)
        break
      case 'mechanical ventilation':
        selectData(data.mechanicalVentilation)
        break
      default:
        break
    }
  }

  return (
    <AssetHealthWrapper>
      <div className='d-flex'>
        <AssetHealthTitle>Asset Health</AssetHealthTitle>

        <AssetHealthOptions className='d-flex'>

          <AssetHealthOptionItem
            className={selectedData.name === 'cooling' ? 'active' : ''}
            onClick={() => onSelect('cooling')}
          >
            <AssetHealthOptionIcons src={coolingImg} />Cooling
          </AssetHealthOptionItem>

          <AssetHealthOptionItem
            className={selectedData.name === 'heating' ? 'active' : ''}
            onClick={() => onSelect('heating')}
          ><AssetHealthOptionIcons
            src={heatingImg}
          />Heating
          </AssetHealthOptionItem>

          <AssetHealthOptionItem
            className={selectedData.name === 'mechanical ventilation' ? 'active' : ''}
            onClick={() => onSelect('mechanical ventilation')}
          ><AssetHealthOptionIcons
            src={mechVenImg}
          />Mechanical
          Ventilation
          </AssetHealthOptionItem>

        </AssetHealthOptions>
      </div>

      <div className='d-flex justify-content-end'>
        <AssetHealthTimeLineOptions>
          <AssetHealthTimeLineOptionItem className='active'>this year</AssetHealthTimeLineOptionItem>
          <AssetHealthTimeLineOptionItem>this month</AssetHealthTimeLineOptionItem>
          <AssetHealthTimeLineOptionItem>this week</AssetHealthTimeLineOptionItem>
          <AssetHealthTimeLineOptionItem>today</AssetHealthTimeLineOptionItem>
        </AssetHealthTimeLineOptions>
      </div>

      <ResponsiveLine
        {...commonProperties}
        data={selectedData.data}
        curve='catmullRom'
        useMesh={false}
        enableSlices={false}
        enablePoint={false}
        pointSize={0}
        pointColor='#fff'
        pointBorderWidth={1}
        enableGridX={false}
        lineWidth={3}
        yScale={{
          type: 'linear',
          min: 0,
          max: 100
        }}
        axisLeft={{
          tickValues: [0, 25, 50, 75, 100],
          format: value => {
            return value + '%'
          }
        }}
        pointBorderColor={{ from: 'serieColor' }}
        xScale={{ type: 'point' }}
        colors={['#636c2e', '#87972F', '#c1cf74']}
        legends={[
          {
            anchor: 'top left',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: -35,
            itemWidth: 150,
            itemHeight: 20,
            itemsSpacing: 0,
            symbolSize: 10,
            symbolShape: 'circle',
            itemDirection: 'left-to-right',
            itemTextColor: '#777',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />

    </AssetHealthWrapper>
  )
}

export default AssetHealth

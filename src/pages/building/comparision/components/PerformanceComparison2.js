import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ResponsiveLine } from '@nivo/line'
import { Container, Modal } from 'react-bootstrap'
import roofImg from '../../../../assets/images/roof.svg'
import wallImg from '../../../../assets/images/wall.svg'
import openingsImg from '../../../../assets/images/openings.svg'
import floorImg from '../../../../assets/images/floor.svg'
import lightingImg from '../../../../assets/images/lighting.svg'
import coolingImg from '../../../../assets/images/cooling.svg'
import heatingImg from '../../../../assets/images/heating.svg'
import mechVentImg from '../../../../assets/images/mechanical-ventilation.svg'
import renewableImg from '../../../../assets/images/renewable.svg'
import plugloadImg from '../../../../assets/images/plugload.svg'
import { useTranslation } from 'react-i18next'
import { deepClone } from 'Utilities'
import BarBlock from 'pages/building/comparision/components/BarBlock'
import {
  coolingSVG,
  floorSVG,
  heatingSVG,
  lightingSVG,
  mechVentSVG,
  openingsSVG,
  plugLoadSVG,
  renewableSVG,
  roofSVG,
  wallSVG,
} from 'SvgConstants'
import UrlButton from 'components/UrlButton'

const ChartHeader = styled.div`

  margin-right: 20px;
`

const PerformanceComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 0;
`

const EditConfigurationButton = styled.button`
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 0.8rem;
`

const PerformanceComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 10px;
  @media (min-width: 768px) {
    padding: 20px;
  }
  margin-top: 40px;
  margin-bottom: 40px;
  //height: max(500px, 100vw / 4);
  min-width: 100%;
`

const PopupTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 2rem;
`

const PopupCategory = styled.section`
  margin-top: 1.5rem;

`

const PopupCategoryTitle = styled.h4`
  font-size: .95rem;
  margin-bottom: .5rem;
`

const ParameterList = styled.ul`
  padding-inline-start: 10px;
  font-size: .9rem;
  max-height: 125px;
  overflow: auto;
`

const ParameterItem = styled.li`
  list-style-type: none;
  margin-top: .3rem;

  &.sub-systems .custom-control-label::before {
    //top: 0.5rem;
  }
`

const ParameterItemIcon = styled.img`
  margin-right: .5rem;
  width: 27px;
  height: 27px;
`

const UpdateBtn = styled.button`
  border-radius: 15px;
  margin-right: 15px;
  font-size: .8rem;
  padding-left: 20px;
  padding-right: 20px;
`
const CancelBtn = styled.button`
  border-width: 0;
  border-radius: 15px;
  font-size: .85rem;
  padding-left: 20px;
  padding-right: 20px;
`

const LineChartWrapper = styled.div`
  margin-top: 18px;
  height: max(500px, 100vw / 4);
  width: calc(100% - 50px);
`

const PerformanceComparison2 = () => {

  const { t, i18n } = useTranslation('comparison')

  const data = [
    {
      id: 'Design Excellent Center',
      data: [
        {
          x: 'Cooling',
          y: '5',
        },
        {
          x: 'Heating',
          y: '5',
        },
        {
          x: 'Lighting',
          y: '3',
        },
        {
          x: 'Mechanical Ventilation',
          y: '4',
        },
        {
          x: 'Roof',
          y: '5',
        },
        {
          x: 'Wall',
          y: '4',
        },
        {
          x: 'Openings',
          y: '5',
        },
        {
          x: 'Floor',
          y: '3',
        },
        {
          x: 'Renewable',
          y: '3',
        },
        {
          x: 'Plug Loads',
          y: '3',
        },
      ],
    },
    {
      id: 'Hill Bay Central Bank Center',
      data: [
        {
          x: 'Cooling',
          y: '6',
        },
        {
          x: 'Heating',
          y: '6',
        },
        {
          x: 'Lighting',
          y: '5',
        },
        {
          x: 'Mechanical Ventilation',
          y: '5',
        },
        {
          x: 'Roof',
          y: '3',
        },
        {
          x: 'Wall',
          y: '3',
        },
        {
          x: 'Openings',
          y: '4',
        },
        {
          x: 'Floor',
          y: '5',
        },
        {
          x: 'Renewable',
          y: '4',
        },
        {
          x: 'Plug Loads',
          y: '2',
        },
      ],
    },
    {
      id: 'F+E Campus',
      data: [
        {
          x: 'Cooling',
          y: '4',

        },
        {
          x: 'Heating',
          y: '5',
        },
        {
          x: 'Lighting',
          y: '4',
        },
        {
          x: 'Mechanical Ventilation',
          y: '5',
        },
        {
          x: 'Roof',
          y: '4',
        },
        {
          x: 'Wall',
          y: '4',
        },
        {
          x: 'Openings',
          y: '5',
        },
        {
          x: 'Floor',
          y: '3',
        },
        {
          x: 'Renewable',
          y: '6',
        },
        {
          x: 'Plug Loads',
          y: '6',
        },
      ],
    },
  ]

  const otherMonitoredEquipments = [
    'Photocopy Printers',
    'Computers',
    'Water Heaters',
    'Water Cooler',
    'Server Rack',
    'Add additional equipment',
  ]

  const commonProperties = {
    margin: { top: 0, right: 20, bottom: 80, left: 25 },
    animate: true,
    // height: 350
    // enableSlices: 'x',
  }

  const [show, setShow] = useState(false)
  const [chartData, setChartData] = useState(deepClone(data))

  useEffect(() => {
    const tmp = deepClone(data)
    for (let item of tmp) {
      item.id = t(item.id)
      for (let j of item.data) {
        j.x = t(j.x)
      }
    }
    setChartData(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onUpdate = (buildings, subSystems) => {
    filterData(buildings, subSystems)
    setShow(false)
  }

  const filterData = (buildings, subSystems) => {
    const arr = [...data.filter(i => buildings.includes(i.id))]
    arr.forEach(a => {
      a.data = [...a.data.filter(d => subSystems.includes(d.x))]
    })
    setChartData(arr)
  }

  const onClick = () => {
    handleShow()
  }

  const getIcon = (type) => {
    switch (type) {
      case 'Roof':
        return roofImg

      case 'Wall':
        return wallImg

      case 'Openings':
        return openingsImg

      case 'Floor':
        return floorImg

      case 'Cooling':
        return coolingImg

      case 'Heating':
        return heatingImg

      case 'Lighting':
        return lightingImg

      case 'Mechanical Ventilation':
        return mechVentImg

      case 'Renewable':
        return renewableImg

      case 'Plug Loads':
        return plugloadImg

      default:
        return ''
    }
  }

  const Popup = () => {
    // const selectedBuildings = [];
    const { t } = useTranslation('comparisonParametersPopup')

    let selectedBuildings = data.map(d => d.id)
    let selectedSubSystems = data[0].data.map(d => d.x)

    const onSelectBuilding = (e) => {
      if (e.target.checked) {
        selectedBuildings = [...new Set([...selectedBuildings, e.target.value])]
      } else {
        selectedBuildings = selectedBuildings.filter((value) => e.target.value !== value)
      }
    }

    const onSelectSubSystem = (e) => {
      if (e.target.checked) {
        selectedSubSystems = [...new Set([...selectedSubSystems, e.target.value])]
      } else {
        selectedSubSystems = selectedSubSystems.filter((value) => e.target.value !== value)
      }
    }

    const buildingItems = data.map((item, index) => {
      return (
        <ParameterItem key={item.id}>
          {/*<FormCheck*/}
          {/*  type="checkbox" id={'checkbox_building_' + index} label={item.id} onChange={onSelectBuilding}*/}
          {/*  value={item.id} defaultChecked*/}
          {/*/>*/}
          <div className="custom-control custom-checkbox">
            <input
              onChange={onSelectBuilding} type="checkbox" className="custom-control-input me-1"
              id={'checkbox_building_' + index} value={item.id} defaultChecked/>
            <label className="custom-control-label" htmlFor={'checkbox_building_' + index}>
              {t(item.id)}
            </label>
          </div>
        </ParameterItem>
      )
    })

    const subSystemItems = data[0].data.map((item, index) => {
      return (
        <ParameterItem key={item.id} className="sub-systems">
          <div className="custom-control custom-checkbox">
            <input
              onChange={onSelectSubSystem} type="checkbox" className="custom-control-input me-1"
              id={'checkbox_subsystem_' + index} value={item.x} defaultChecked
            />
            <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + index}>
              <ParameterItemIcon src={getIcon(item.x)} alt={item.x} title={item.x}/>
              {t(item.x)}
            </label>
          </div>
        </ParameterItem>
      )
    })

    const otherMonitoredEquipmentItems = otherMonitoredEquipments.map((item, index) => {
      return (
        <ParameterItem key={item.id}>
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox" className="custom-control-input me-1"
              id={'checkbox_otherMonitoredEquipments_' + index}
            />
            <label
              className="custom-control-label"
              htmlFor={'checkbox_otherMonitoredEquipments_' + index}
            >{t(item)}
            </label>
          </div>
        </ParameterItem>
      )
    })

    return (
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Body>
          <Container className="mt-4">
            <PopupTitle>{t('Comparison Parameters')}</PopupTitle>
            <PopupCategory>
              <PopupCategoryTitle>{t('Building')}</PopupCategoryTitle>
              <ParameterList>
                {buildingItems}
              </ParameterList>
            </PopupCategory>

            <PopupCategory>
              <PopupCategoryTitle>{t('Sub-Systems')}</PopupCategoryTitle>
              <ParameterList>
                {subSystemItems}
              </ParameterList>
            </PopupCategory>

            <PopupCategory>
              <PopupCategoryTitle>{t('Other Monitored Equipment')}</PopupCategoryTitle>
              <ParameterList>
                {otherMonitoredEquipmentItems}
              </ParameterList>
            </PopupCategory>

            <div className="d-flex justify-content-center mb-2 mt-5">
              <UpdateBtn
                className="btn btn-primary btn-sm"
                onClick={() => onUpdate(selectedBuildings, selectedSubSystems)}
              >{t('Update')}
              </UpdateBtn>
              <CancelBtn className="btn btn-outline-primary btn-sm" onClick={handleClose}>{t('Cancel')}</CancelBtn>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }

  const IconLayer = (props) => {
    //console.log(props)
    const { xScale, innerHeight } = props
    const y = innerHeight + 15
    const xCooling = xScale('Cooling')
    const xHeating = xScale('Heating')
    const xLighting = xScale('Lighting')
    const xMechanicalVentilation = xScale('Mechanical Ventilation')
    const xRoof = xScale('Roof')
    const xWall = xScale('Wall')
    const xOpenings = xScale('Openings')
    const xFloor = xScale('Floor')
    const xRenewable = xScale('Renewable')
    const xPlugLoads = xScale('Plug Loads')
    return (
      <>
        {(xCooling !== undefined) && <g transform={`translate(${xCooling - 16}, ${y})`}>
          {coolingSVG()}
        </g>}
        {(xHeating !== undefined) && <g transform={`translate(${xHeating - 8}, ${y})`}>
          {heatingSVG()}
        </g>}
        {(xLighting !== undefined) && <g transform={`translate(${xLighting - 12}, ${y})`}>
          {lightingSVG()}
        </g>}
        {(xMechanicalVentilation !== undefined) && <g transform={`translate(${xMechanicalVentilation - 18}, ${y})`}>
          {mechVentSVG()}
        </g>}
        {(xRoof !== undefined) && <g transform={`translate(${xRoof - 26}, ${y})`}>
          {roofSVG()}
        </g>}
        {(xWall !== undefined) && <g transform={`translate(${xWall - 28}, ${y})`}>
          {wallSVG()}
        </g>}
        {(xOpenings !== undefined) && <g transform={`translate(${xOpenings - 28}, ${y})`}>
          {openingsSVG()}
        </g>}
        {(xFloor !== undefined) && <g transform={`translate(${xFloor - 28}, ${y})`}>
          {floorSVG()}
        </g>}
        {(xRenewable !== undefined) && <g transform={`translate(${xRenewable - 20}, ${y})`}>
          {renewableSVG()}
        </g>}
        {(xPlugLoads !== undefined) && <g transform={`translate(${xPlugLoads - 20}, ${y})`}>
          {plugLoadSVG()}
        </g>}
      </>
    )
  }

  return (
    <PerformanceComparisonWrapper>
      <ChartHeader className="d-flex justify-content-between mb-5 flex-wrap">
        <PerformanceComparisonTitle className="mb-2 mb-md-0">{t(
          'Building Energy - Sub-System Performance')}</PerformanceComparisonTitle>
        <div className="d-flex">
          <UrlButton url="comparison-building-subsystem-performance" textWidth='68ch'/>
          <EditConfigurationButton
            type="button"
            onClick={onClick}
            className="btn btn-primary btn-sm ms-1"
          >{t('Edit Comparison')}
          </EditConfigurationButton>
        </div>
      </ChartHeader>
      <div className="d-flex">
        <div className="me-2">
          <BarBlock width="36px" marginBottom="30px" backgroundColor="#478D58" text="A"/>
          <BarBlock width="36px" marginBottom="30px" backgroundColor="#63AE62" text="B"/>
          <BarBlock width="36px" marginBottom="30px" backgroundColor="#AACC72" text="C"/>
          <BarBlock width="36px" marginBottom="31px" backgroundColor="#F0EA6F" text="D"/>
          <BarBlock width="36px" marginBottom="31px" backgroundColor="#ECB75F" text="E"/>
          <BarBlock width="36px" marginBottom="31px" backgroundColor="#DF7F4F" text="F"/>
          <BarBlock width="36px" backgroundColor="#D94545" text="G"/>
        </div>
        <LineChartWrapper>
          <ResponsiveLine
            {...commonProperties}
            curve="monotoneX"
            data={chartData}
            useMesh={false}
            enableSlices={false}
            enablePoint
            pointSize={12}
            //pointColor="#fff"
            pointBorderWidth={1}
            enableGridX={false}
            lineWidth={2}
            isInteractive={true}
            layers={[
              'grid',
              'markers',
              'areas',
              IconLayer,
              'lines',
              'slices',
              'axes',
              'points',
              'legends',
            ]}
            yScale={
              {
                type: 'linear',
                min: 1,
                max: 7,
              }
            }
            axisLeft={null
              // {
              //   tickValues: [1, 2, 3, 4, 5, 6, 7],
              //   format: value => {
              //     const labels = ['G', 'F', 'E', 'D', 'C', 'B', 'A']
              //     return labels[value - 1]
              //   },
              // }
            }
            pointBorderColor={
              { from: 'serieColor' }
            }
            xScale={
              { type: 'point' }
            }
            axisBottom={{
              orient: 'bottom',
              tickSize: 6,
              tickPadding: 52,
              tickRotation: 0,
              legend: '',
              legendOffset: 36,
              legendPosition: 'middle',
            }}
            colors={['#AACC72', '#44D7B6', '#478D58']}
            legends={
              [
                {
                  anchor: 'top',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: -35,
                  itemWidth: 180,
                  itemHeight: 20,
                  itemsSpacing: 4,
                  symbolSize: 20,
                  symbolShape: 'circle',
                  itemDirection: 'left-to-right',
                  itemTextColor: '#777',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    }],
                }]
            }
          />
        </LineChartWrapper>
      </div>
      <Popup/>
    </PerformanceComparisonWrapper>
  )
}

export default PerformanceComparison2

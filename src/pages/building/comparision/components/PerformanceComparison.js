import React, { useState } from 'react'
import styled from 'styled-components'
// import range from 'lodash/range'
// import shuffle from 'lodash/shuffle'
import { ResponsiveBump } from '@nivo/bump'
import BarBlock from 'pages/building/comparision/components/BarBlock'
import { deepClone } from 'Utilities'
import roofImg from 'assets/images/roof.svg'
import wallImg from 'assets/images/wall.svg'
import openingsImg from 'assets/images/openings.svg'
import floorImg from 'assets/images/floor.svg'
import coolingImg from 'assets/images/cooling.svg'
import heatingImg from 'assets/images/heating.svg'
import lightingImg from 'assets/images/lighting.svg'
import mechVentImg from 'assets/images/mechanical-ventilation.svg'
import renewableImg from 'assets/images/renewable.svg'
import plugloadImg from 'assets/images/plugload.svg'
import { useTranslation } from 'react-i18next'
import { Container, Modal } from 'react-bootstrap'

const ChartHeader = styled.div`
  margin-right: 20px;
`

const PerformanceComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 20px;
`

const PerformanceComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 10px;
  @media (min-width: 768px) {
    padding: 20px;
  }
  margin-top: 100px;
  margin-bottom: 40px;
  height: max(500px, 100vw / 4);
  min-width: 100%;
`

const EditConfigurationButton = styled.button`
  border-radius: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 0.8rem;
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
  margin-top: 0;
  height: max(500px, 100vw / 4);
  width: calc(100% - 50px);
`

const data = [
  {
    id: 'Design Excellent Center',
    data: [
      {
        x: 'Cooling',
        y: 3,
      },
      {
        x: 'Heating',
        y: 3,
      },
      {
        x: 'Lighting',
        y: 5,
      },
      {
        x: 'Mechanical Ventilation',
        y: 4,
      },
      {
        x: 'Roof',
        y: 3,
      },
      {
        x: 'Wall',
        y: 4,
      },
      {
        x: 'Openings',
        y: 3,
      },
      {
        x: 'Floor',
        y: 5,
      },
      {
        x: 'Renewables',
        y: 5,
      },
      {
        x: 'Plug Loads',
        y: 5,
      },
    ],
  },
  {
    id: 'Hill Bay Central Bank Center',
    data: [
      {
        x: 'Cooling',
        y: 2,
      },
      {
        x: 'Heating',
        y: 2,
      },
      {
        x: 'Lighting',
        y: 3,
      },
      {
        x: 'Mechanical Ventilation',
        y: 3,
      },
      {
        x: 'Roof',
        y: 5,
      },
      {
        x: 'Wall',
        y: 5,
      },
      {
        x: 'Openings',
        y: 4,
      },
      {
        x: 'Floor',
        y: 3,
      },
      {
        x: 'Renewables',
        y: 4,
      },
      {
        x: 'Plug Loads',
        y: 6,
      },

    ],
  },
  {
    id: 'F+E Campus',
    data: [
      {
        x: 'Cooling',
        y: 4,
      },
      {
        x: 'Heating',
        y: 3,
      },
      {
        x: 'Lighting',
        y: 4,
      },
      {
        x: 'Mechanical Ventilation',
        y: 5,
      },
      {
        x: 'Roof',
        y: 4,
      },
      {
        x: 'Wall',
        y: 4,
      },
      {
        x: 'Openings',
        y: 3,
      },
      {
        x: 'Floor',
        y: 5,
      },
      {
        x: 'Renewables',
        y: 2,
      },
      {
        x: 'Plug Loads',
        y: 2,
      },
    ],
  },
  {
    id: 'A',
    data: [
      {
        x: 'Cooling',
        y: 1,
      },
    ],
  },
  {
    id: 'B',
    data: [
      {
        x: 'Cooling',
        y: 1,
      },
    ],
  },
  {
    id: 'C',
    data: [
      {
        x: 'Cooling',
        y: 1,
      },
    ],
  },
  {
    id: 'D',
    data: [
      {
        x: 'Cooling',
        y: 1,
      },
    ],
  },
  {
    id: 'E',
    data: [
      {
        x: 'Cooling',
        y: 1,
      },

    ],
  },
  {
    id: 'F',
    data: [
      {
        x: 'Cooling',
        y: 1,
      },

    ],
  },
  {
    id: 'G',
    data: [
      {
        x: 'Cooling',
        y: 6,
      },
    ],
  },
]


const PerformanceComparison = () => {

  const { t } = useTranslation('comparison')
  const [show, setShow] = useState(false)
  const [chartData, setChartData] = useState(deepClone(data))
  const otherMonitoredEquipments = [
    'Photocopy Printers',
    'Computers',
    'Water Heaters',
    'Water Cooler',
    'Server Rack',
    'Add additional equipment',
  ]


  const commonProps = {

    margin: { top: 0, right: 140, bottom: 108, left: 25 },
    titleOffsetX: -80,
    data: chartData,
    spacing: 50,
    xOuterPadding: 0.2,
    pointSize: 12,
    activePointSize: 20,
    inactivePointSize: 6,
    pointBorderWidth: 1,
    activePointBorderWidth: 2,
    inactivePointBorderWidth: 1,
    lineWidth: 3,
    activeLineWidth: 6,
    inactiveLineWidth: 2,
    enableGridX: false,
    axisTop: false,
    axisLeft: null,
    yScale: { type: 'point' },
    pointBorderColor: { from: 'serie.color' },
    startLabel: false,
    colors: [
      '#AACC72',
      '#44D7B6',
      '#478D58',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent'],
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onUpdate = (buildings, subSystems) => {
    //filterData(buildings, subSystems)
    setShow(false)
  }

  // const filterData = (buildings, subSystems) => {
  //   const arr = [...data.filter(i => buildings.includes(i.id))]
  //   arr.forEach(a => {
  //     a.data = [...a.data.filter(d => subSystems.includes(d.x))]
  //   })
  //   setChartData(arr)
  // }

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

  return (
    <PerformanceComparisonWrapper>
      <ChartHeader className="d-flex justify-content-between mb-5 flex-wrap">
        <PerformanceComparisonTitle className="mb-2 mb-md-0">{t(
          'C02 Emissions - Sub-System Performance')}</PerformanceComparisonTitle>

        <EditConfigurationButton
          type="button"
          onClick={onClick}
          className="btn btn-primary btn-sm"
        >{t('Edit Comparison')}
        </EditConfigurationButton>

      </ChartHeader>

      <div className="d-flex">
        <div className=" mt-2">
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#93d2f0" text="A"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#63bcf2" text="B"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#52a8d9" text="C"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#3c82c6" text="D"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#c4c4c4" text="E"/>
          <BarBlock width="36px" marginBottom="20px" backgroundColor="#a9a9a9" text="F"/>
          <BarBlock width="36px" backgroundColor="#8b8b8b" text="G"/>
        </div>
        <LineChartWrapper>
          <ResponsiveBump
            {...commonProps}
          />
        </LineChartWrapper>
      </div>

      <Popup/>
    </PerformanceComparisonWrapper>
  )
}

export default PerformanceComparison

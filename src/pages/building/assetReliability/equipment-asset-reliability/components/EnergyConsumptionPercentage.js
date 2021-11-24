/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PercentagePieChart from 'pages/building/assetReliability/equipment-asset-reliability/components/PercentagePieChart'
import { getEnergyConsumptionPercentage } from 'api/EquipmentAPI'
import { useAuth } from 'AuthenticateProvider'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`

`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Label = styled.label`
  font-size: 1rem;
`

const EnergyConsumptionPercentage = (props) => {

  const {
    equipmentId, equipmentTypeId, subSystemId, buildingId, startDate, endDate,
  } = props

  const { t } = useTranslation('equipmentAssetReliability')

  const { user } = useAuth()

  const [equipmentGroup, setEquipmentGroup] = useState()
  const [subSystem, setSubSystem] = useState()
  const [building, setBuilding] = useState()

  const convertRawDataToChartData = (tmp) => {
    const _equipmentGroup = [
      {
        id: 'equipment',
        label: 'Equipment',
        value: +tmp?.percentageOfEquipmentType?.toFixed(0),
        color: '#87972f'
      },
      {
        id: 'remaining',
        label: 'remaining',
        value: 100 - (+tmp?.percentageOfEquipmentType?.toFixed(0)),
        color: '#ecedef'
      },
    ]
    setEquipmentGroup(_equipmentGroup)

    const _subSystem = [
        {
          id: 'equipment',
          label: 'equipment',
          value: +tmp?.percentageOfSubSystem?.toFixed(0),
          color: '#87972f',

        },
        {
          id: 'remaining',
          label: 'Remaining',
          value:  100 - (+tmp?.percentageOfSubSystem?.toFixed(0)),
          color: '#ecedef'
        },
      ]
    setSubSystem(_subSystem)

    const _building = [
        {
          id: 'building',
          label: 'Building',
          value: +tmp?.percentageOfBuilding?.toFixed(0),
          color: '#87972f',
          remaining: 77691,
        },
        {
          id: 'remaining',
          label: 'Remaining',
          value: 100 - (+tmp?.percentageOfBuilding?.toFixed(0)),
          color: '#ecedef',
          remaining: 77691,
        },
      ]
    setBuilding(_building)
  }

  // useEffect(() => {
  //   const _equipmentGroup = deepClone(equipmentGroup)
  //   _equipmentGroup[0].id = t(_equipmentGroup[0].id)
  //   _equipmentGroup[1].id = t(_equipmentGroup[1].id)
  //   //setEquipmentGroup(_equipmentGroup)
  //
  //   const _subSystem = deepClone(subSystem)
  //   _subSystem[0].id = t(_subSystem[0].id)
  //   _subSystem[1].id = t(_subSystem[1].id)
  //  // setSubSystem(_subSystem)
  //
  //   const _building = deepClone(building)
  //   _building[0].id = t(_building[0].id)
  //   _building[1].id = t(_building[1].id)
  //   //setBuilding(_building)
  //
  // }, [i18n.language])

  const getEnergyConsumptionPercentageInfo = async () => {
    const idToken = await user.getIdToken()
    // moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'),
    const tmp = await getEnergyConsumptionPercentage(equipmentId, equipmentTypeId, subSystemId, buildingId, startDate,
      endDate, idToken)
    convertRawDataToChartData(tmp[0])

  }

  useEffect(() => {
    getEnergyConsumptionPercentageInfo()
  }, [equipmentId, equipmentTypeId, subSystemId, buildingId, startDate, endDate])


  return (
    <Wrapper>
      <h5 className="mb-5">{t('Energy Consumption')} %</h5>
      <Row>
        <Label>{t('of Equipment Group')}</Label>
        {equipmentGroup && <PercentagePieChart data={equipmentGroup} />}
      </Row>

      <Row>
        <Label>{t('of Sub-system')}</Label>
        {subSystem && <PercentagePieChart data={subSystem} />}
      </Row>

      <Row>
        <Label>{t('of Building')}</Label>
        {building && <PercentagePieChart data={building} />}
      </Row>
    </Wrapper>
  )

}

export default EnergyConsumptionPercentage
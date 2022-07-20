/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import styled from 'styled-components'
import { getProjectPeakDemand } from 'api/EquipmentAPI'
import { useAuth } from 'AuthenticateProvider'
import { deepClone, getMonthName } from 'Utilities'
import { EuiRange } from '@elastic/eui'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`

`

const ChartWrapper = styled.div`
  height: 350px;
`

const NumberOfDaysWrapper = styled.div`
  width: 400px;
`

const NumberOfDaysLabel = styled.div`
  width: 150px;
  font-size: 0.9rem;
`

const ProjectedPeakDemand = (props) => {

  const { equipmentId } = props
  const { user } = useAuth()
  const [depreciationData, setDepreciationData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [numberOfNextDays, setNumberOfNextDays] = useState(14)
  const { t, i18n } = useTranslation(['equipmentAssetReliability', 'common'])

  const convertRawDataToChartData = (rawData) => {
    const dataSource = [
      {
        id: 'ProjectPeakDemand',
        data: rawData.map(d => {
          return {
            x: t(getMonthName(d.month), { ns: 'common' }) + ' ' + d.day,
            y: +d.average.toFixed(2),
          }
        }),
      }]
    setDepreciationData([...dataSource])
    setFilterData(deepClone(dataSource))
  }

  const getProjectPeakDemandInfo = async () => {
    const idToken = await user.getIdToken()
    // moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'),
    const tmp = await getProjectPeakDemand(equipmentId, 14, idToken)
    convertRawDataToChartData(tmp)
  }

  useEffect(() => {
    getProjectPeakDemandInfo()
    //TS
  }, [equipmentId, i18n.language])

  const Line = ({ series, innerHeight, margin }) => {
    // let data0
    // for (let i = 0; i < series[0]?.data.length; i++) {
    //   console.log(series[0]?.data[i].data.x)
    //   if (series[0]?.data[i].data.x >= currentAge) {
    //     data0 = series[0]?.data[i]
    //     break
    //   }
    // }
    //
    // const x = data0?.position?.x
    //
    return (
      <>
        {/*<text x={x - 40} y="-5" className="small">Current Age</text>*/}
        <text x={260} y="-5" className="small" strokeWidth={1} stroke="#87972f">{t('2 Potential Problems')}</text>
        <text x={460} y="-5" className="small" strokeWidth={1} stroke="#87972f">{t('1 Potential Problems')}</text>
        <text x={660} y="-5" className="small" strokeWidth={1} stroke="#87972f">{t('1 Potential Problems')}</text>
        {/*<line*/}
        {/*  x1={x} y1={0} x2={x} y2={innerHeight} stroke="#87972f" strokeDasharray="3"*/}
        {/*  strokeWidth={1}*/}
        {/*/>*/}

        <line x1="300" y1="10" x2="300" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>
        <line x1="500" y1="10" x2="500" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>
        <line x1="700" y1="10" x2="700" y2="285" stroke="#87972f" strokeDasharray="2" strokeWidth={1}/>
      </>
    )
  }

  const commonProperties = {
    margin: { top: 30, right: 20, bottom: 25, left: 40 },
    data: filterData,
    animate: true,
    colors: ['#87972f'],
    enableSlices: false,
    enableGridX: false,
    enableGridY: true,
    enablePoints: true,
    pointBorderWidth: 5,
    pointBorderColor: { from: 'serieColor' },
    pointColor: { theme: 'background' },
    isInteractive: true,
    useMesh: true,
    lineWidth: 2,
    yScale: {
      type: 'linear',
      stacked: false,
    },
    curve: 'linear',
    axisLeft: {
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'KWh',
      legendOffset: -40,
      legendPosition: 'middle',
    },

    layers: ['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends', Line],
  }

  const onChange = (e) => {
    setNumberOfNextDays(e.target.value)
    let tmp = [...filterData]
    tmp[0].data = []
    for (let i = 0; i <= e.target.value; i++) {
      tmp[0].data.push(deepClone(depreciationData[0].data[i]))
    }
    setFilterData([...tmp])
  }

  return (
    <Wrapper>
      <div className="d-flex justify-content-between mb-5">
        <h5>{t('Projected Peak Demand (kW)')}</h5>
        <NumberOfDaysWrapper className="d-flex justify-content-between">
          <NumberOfDaysLabel for="number-of-next-days">{t('Number of days')}: </NumberOfDaysLabel>
          <EuiRange
            id="number-of-next-days"
            min={1}
            max={14}
            step={1}
            showTicks
            value={numberOfNextDays}
            onChange={onChange}

            aria-label="Number of Next Days"
          />
        </NumberOfDaysWrapper>
      </div>
      <ChartWrapper>
        <ResponsiveLine
          {...commonProperties}
        />
      </ChartWrapper>
    </Wrapper>
  )

}

export default ProjectedPeakDemand
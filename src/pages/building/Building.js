import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import image1 from '../../assets/images/building1.jpg'
import image2 from '../../assets/images/building2.jpg'
import image3 from '../../assets/images/building3.jpg'
import Header from '../../components/Header'
import BuildingInfo from '../../components/BuildingInfo'
import { useParams } from 'react-router'
import BuildingHistoricalNav from '../../components/BuildingHistoricalNav'
import EnergyPerformance from './energyPerformance/EnergyPerformance'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import Comparison from './comparision/Comparison'
import Improve from './improve/Improve'
import AssetReliability from './assetReliability/AssetReliability'
import { getBuildingById } from 'api/BuildidingAPI'
import { useAuth } from 'AuthenticateProvider'
import { findCountryByCountryCode } from 'reference-tables/Country'
import {
  printDateTime,
  quarterOptions,
  selectEndMonth,
  selectEndQuarter,
  selectEndYear,
  selectStartMonth,
  selectStartQuarter,
  selectStartYear,
  shortMonthOptions,
} from 'Utilities'
import moment from 'moment'
import { EuiDatePicker, EuiDatePickerRange, EuiFieldNumber, EuiSelect } from '@elastic/eui'
import BuildingSkeleton from '../../components/BuildingSkeleton'
import {
  energyPerformanceEndTimeState,
  energyPerformanceStartTimeState,
  isDisplayPerformanceFilterState,
  originalConsumptionBreakdownState,
} from 'atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import ChartType from './components/ChartType'
import { useTranslation } from 'react-i18next'

const BuildingWrapper = styled.div`

  @media (min-width: 1440px) {
    margin-left: 100px;
    margin-right: 100px;
  }
`

const FilterWrapper = styled.div`
  width: 100%
`

const GroupBy = styled.div`
  .euiFormControlLayout {
    max-width: 200px;
  }
`

const StartLabel = styled.label`
  line-height: 30px;
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
  margin-left: 0.5rem;
`

const EndLabel = styled.label`
  line-height: 30px;
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
  margin-left: 20px;
`
const ErrorMsg = styled.span`
  margin-left: 20px;
  color: red;
  font-weight: 500;
  line-height: 28px;
`

const Building = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  // const [startTime, setStartTime] = useState(moment().subtract(1, 'y'))
  const  [startTime, setStartTime] = useRecoilState(energyPerformanceStartTimeState)
  // const [endTime, setEndTime] = useState(moment())
  const  [endTime, setEndTime] = useRecoilState(energyPerformanceEndTimeState)
  const [startDate, setStartDate] = useState(moment().subtract(1, 'y'))
  const [endDate, setEndDate] = useState(moment())
  const [startMonth, setStartMonth] = useState(moment().month() + 1)
  const [startQuarter, setStartQuarter] = useState(moment().quarter())
  const [startYear, setStartYear] = useState(moment().year())

  const [endMonth, setEndMonth] = useState(moment().month() + 1)
  const [endQuarter, setEndQuarter] = useState(moment().quarter())
  const [endYear, setEndYear] = useState(moment().year())
  const [groupBy, setGroupBy] = useState('month')
  const [energyPerformanceGroupBy, setEnergyPerformanceGroupBy] = useState('month')
  const [isInValid, setIsInValid] = useState(false)

  const handleGroupByChange = (group) => {
    setGroupBy(group)
  }

  const BuildingInfoDataArray = [
    {
      name: 'Design Excellence Center',
      image: image1,
      address: 'Neue Straße 111, 99999 Musterstadt',
      useType: 'Office',
      gfa: 25949,
      avgOccupancy: 90,
      storey: 7,
      constructed: '1980-1990',
      greenBuildingRating: 'LEED Gold',
      buildingInfoLastEdited: '25/03/2020',
      energyPerformance: {

        breakDownConsumption: [
          { id: 'cooling', value: 15, color: '#636c2e' },
          { id: 'heating', value: 39, color: '#87972f' },
          { id: 'lighting', value: 28, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 11, color: '#c1cf74' },
          { id: 'others', value: 8, color: '#d5dfa3' }],
        breakDownCost: [
          { id: 'cooling', value: 22, color: '#636c2e' },
          { id: 'heating', value: 12, color: '#87972f' },
          { id: 'lighting', value: 39, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 10, color: '#d5dfa3' }],
        breakDownCO2Emissions: [
          { id: 'cooling', value: 20, color: '#636c2e' },
          { id: 'heating', value: 19, color: '#87972f' },
          { id: 'lighting', value: 37, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 9, color: '#d5dfa3' }],

        electricalSystemInformation: {
          overallCoolingLoad: 5,
          overallHeatingLoad: 60,
          overallLightingLoad: 43,
          overallMechVentLoad: 2.3,
          pvSystemInstalledCapacity: 5,
        },

        incidentalGains: {
          roof: 5,
          wall: 60,
          openings: 43,
          floor: 2.3,
          plugLoads: 5,
        },
      },
    },
    {
      name: 'Hill Bay Central Bank',
      image: image2,
      address: '21 Hill Bay Boulevard, Rungapore 784398',
      useType: 'Office',
      gfa: 25949,
      avgOccupancy: 90,
      storey: 7,
      constructed: '1980-1990',
      greenBuildingRating: 'LEED Gold',
      buildingInfoLastEdited: '25/03/2020',
      energyPerformance: {
        breakDownConsumption: [
          { id: 'cooling', value: 15, color: '#636c2e' },
          { id: 'heating', value: 39, color: '#87972f' },
          { id: 'lighting', value: 28, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 11, color: '#c1cf74' },
          { id: 'others', value: 8, color: '#d5dfa3' }],
        breakDownCost: [
          { id: 'cooling', value: 22, color: '#636c2e' },
          { id: 'heating', value: 12, color: '#87972f' },
          { id: 'lighting', value: 39, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 10, color: '#d5dfa3' }],
        breakDownCO2Emissions: [
          { id: 'cooling', value: 20, color: '#636c2e' },
          { id: 'heating', value: 19, color: '#87972f' },
          { id: 'lighting', value: 37, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 9, color: '#d5dfa3' }],

        electricalSystemInformation: {
          overallCoolingLoad: 5,
          overallHeatingLoad: 60,
          overallLightingLoad: 43,
          overallMechVentLoad: 2.3,
          pvSystemInstalledCapacity: 5,
        },

        incidentalGains: {
          roof: 5,
          wall: 60,
          openings: 43,
          floor: 2.3,
          plugLoads: 5,
        },
      },
    },
    {
      name: 'People Square Middle',
      image: image3,
      address: 'People Square Middle, 18 Plus Street, Rungapore 239475',
      useType: 'Office',
      gfa: 25949,
      avgOccupancy: 90,
      storey: 7,
      constructed: '1980-1990',
      greenBuildingRating: 'LEED Gold',
      buildingInfoLastEdited: '25/03/2020',
      energyPerformance: {
        breakDownConsumption: [
          { id: 'cooling', value: 15, color: '#636c2e' },
          { id: 'heating', value: 39, color: '#87972f' },
          { id: 'lighting', value: 28, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 11, color: '#c1cf74' },
          { id: 'others', value: 8, color: '#d5dfa3' }],

        breakDownCost: [
          { id: 'cooling', value: 22, color: '#636c2e' },
          { id: 'heating', value: 12, color: '#87972f' },
          { id: 'lighting', value: 39, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 10, color: '#d5dfa3' }],

        breakDownCO2Emissions: [
          { id: 'cooling', value: 20, color: '#636c2e' },
          { id: 'heating', value: 19, color: '#87972f' },
          { id: 'lighting', value: 37, color: '#acbf42' },
          { id: 'mechanical ventilation', value: 16, color: '#c1cf74' },
          { id: 'others', value: 9, color: '#d5dfa3' }],

        electricalSystemInformation: {
          overallCoolingLoad: 5,
          overallHeatingLoad: 60,
          overallLightingLoad: 43,
          overallMechVentLoad: 2.3,
          pvSystemInstalledCapacity: 5,
        },

        incidentalGains: {
          roof: 5,
          wall: 60,
          openings: 43,
          floor: 2.3,
          plugLoads: 5,
        },
      },

    },
  ]

  const [generalBuildingInformation, setGeneralBuildingInformation] = useState(null)
  const isDisplayPerformanceFilter = useRecoilValue(isDisplayPerformanceFilterState)
  const setOriginalConsumptionBreakdown = useSetRecoilState(originalConsumptionBreakdownState)

  const getBuildingInfo = async () => {

    const idToken = await user.getIdToken()
    if (!isInValid) {
      setIsLoading(true)
      const tmp = await getBuildingById(id, moment(startTime).format('YYYY-MM-DD'), moment(endTime).format('YYYY-MM-DD'),
        idToken)
      setOriginalConsumptionBreakdown([...tmp?.consumptionBreakdown])
      setEnergyPerformanceGroupBy(groupBy)
      setGeneralBuildingInformation(tmp)

      setIsLoading(false)
    }
  }

  const handleApply = () => {
    getBuildingInfo().then()
  }

  useEffect(() => {
    if (id < 3) {
      setGeneralBuildingInformation(BuildingInfoDataArray[id - 1])
    } else {
      getBuildingInfo().then()
    }
    //  eslint-disable-next-line
  }, [])

  useEffect(() => {
    let _startTime = startDate
    let _endTime = endDate
    switch (groupBy) {
      case 'year':
        _startTime = selectStartYear(startYear)
        _endTime = selectEndYear(endYear)
        break
      case 'quarter':
        _startTime = selectStartQuarter(startYear, startQuarter)
        _endTime = selectEndQuarter(endYear, endQuarter)
        break
      case 'month':
        _startTime = selectStartMonth(startYear, startMonth)
        _endTime = selectEndMonth(endYear, endMonth)
        break
      case 'day':
      default:
        break
    }
    setStartTime(_startTime)
    setEndTime(_endTime)
    if (_startTime > _endTime) {
      setIsInValid(true)
    } else {
      setIsInValid(false)
    }
    //  eslint-disable-next-line
  }, [startMonth, startYear, startDate, startQuarter, endMonth, endYear, endDate, endQuarter, groupBy])

  //const BuildingInfoData = id < 3 ? BuildingInfoDataArray[id - 1] : null

  const { t } = useTranslation('buildingPerformance');

  const { path } = useRouteMatch()

  return (
    <>
      <Header/>
      {isLoading ? (
        <BuildingWrapper>
          <BuildingSkeleton/>
        </BuildingWrapper>) : (
        <>
          {generalBuildingInformation && (
            <BuildingWrapper>

              <BuildingInfo
                id={id}
                propId={generalBuildingInformation.prop.propId}
                name={generalBuildingInformation.prop.name}
                image={generalBuildingInformation.prop.photo}
                streetNumber={generalBuildingInformation.prop.streetNumber}
                streetName={generalBuildingInformation.prop.streetName}
                address={generalBuildingInformation.prop.streetAddress + ', ' + generalBuildingInformation.prop.city +
                ', ' +
                findCountryByCountryCode(generalBuildingInformation.prop.countryCode)?.name + ', ' +
                generalBuildingInformation.prop.postCode}
                city={generalBuildingInformation.prop.city}
                state={generalBuildingInformation.prop.state}
                postCode={generalBuildingInformation.prop.postCode}
                countryCode={generalBuildingInformation.prop.countryCode}
                useType={generalBuildingInformation.prop.useTypeName}
                tfa={generalBuildingInformation.prop.grossInteriorArea}
                tfaUnit={generalBuildingInformation.prop.grossInteriorAreaUnit}
                storey={generalBuildingInformation.prop.storeysAboveGround +
                generalBuildingInformation.prop.storeysBelowGround}
                constructed={generalBuildingInformation.prop.completionYear + ' - ' +
                (generalBuildingInformation.prop.completionYear + 10)}
                greenBuildingRating={generalBuildingInformation.prop.sustainabilityRatingSchemeName + ' - ' +
                generalBuildingInformation.prop.sustainabilityRatingName}
                email={generalBuildingInformation.prop.email}
                buildingInfoLastEdited={generalBuildingInformation.prop.updatedAt
                  ? printDateTime(generalBuildingInformation.prop.updatedAt, 'en-GB')
                  : printDateTime(generalBuildingInformation.prop.createdAt, 'en-GB')}
                totalOperatingHours={generalBuildingInformation.totalOperatingHours}
              />

              <BuildingHistoricalNav/>

              {isDisplayPerformanceFilter && (
                <FilterWrapper className="my-5 d-block justify-content-between ">
                  <GroupBy className="d-flex justify-content-start align-content-end mb-2">
                    <ChartType type={groupBy} onChange={handleGroupByChange}/>

                    <div>{isInValid && <ErrorMsg>{t('Start date should be greater than End date')}</ErrorMsg>}</div>
                  </GroupBy>

                  <div className="d-flex mb-2">

                    {groupBy === 'month' && (
                      <div className="d-flex">
                        <StartLabel className="">{t('Start')}</StartLabel>
                        <EuiSelect
                          compressed
                          fullWidth={false}
                          value={startMonth}
                          onChange={(e) => setStartMonth(e.target.value)}
                          options={shortMonthOptions()}
                        />
                        <EuiFieldNumber
                          compressed
                          placeholder="Start Year"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          max={moment().year()}
                          min={1960}
                        />

                        <EndLabel className="">{t('Start')}</EndLabel>
                        <EuiSelect
                          compressed
                          fullWidth={false}
                          onChange={(e) => setEndMonth(e.target.value)}
                          value={endMonth}
                          options={shortMonthOptions()}
                        />
                        <EuiFieldNumber
                          compressed
                          placeholder="End Year"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                          max={moment().year()}
                          min={1960}
                        />
                      </div>
                    )}

                    {groupBy === 'quarter' && (
                      <div className="d-flex">
                        <StartLabel className="">{t('Start')}</StartLabel>
                        <EuiSelect
                          compressed
                          fullWidth={false}
                          value={startQuarter}
                          onChange={(e) => setStartQuarter(e.target.value)}
                          options={quarterOptions()}
                        />
                        <EuiFieldNumber
                          compressed
                          placeholder="Start Year"
                          value={startYear}
                          onChange={(e) => setStartYear(e.target.value)}
                          max={moment().year()}
                          min={1960}
                        />

                        <EndLabel className="">{t('End')}</EndLabel>
                        <EuiSelect
                          compressed
                          fullWidth={false}
                          value={endQuarter}
                          onChange={(e) => setEndQuarter(e.target.value)}
                          options={quarterOptions()}
                        />
                        <EuiFieldNumber
                          compressed
                          placeholder="End Year"
                          value={endYear}
                          onChange={(e) => setEndYear(e.target.value)}
                          max={moment().year()}
                          min={1960}
                        />
                      </div>
                    )}

                    {groupBy === 'year' && (
                      <div className="d-flex">
                        <StartLabel className="">{t('Start')}</StartLabel>
                        <EuiFieldNumber
                          compressed
                          placeholder="Start Year"
                          onChange={(e) => setStartYear(e.target.value)}
                          value={startYear}
                          max={moment().year()}
                          min={1960}
                        />
                        <EndLabel className="">{t('End')}</EndLabel>
                        <EuiFieldNumber
                          compressed
                          placeholder="End Year"
                          onChange={(e) => setEndYear(e.target.value)}
                          value={endYear}
                          max={moment().year()}
                          min={1960}
                        />
                      </div>
                    )}

                    {groupBy === 'day' && (
                      <EuiDatePickerRange
                        startDateControl={
                          <EuiDatePicker
                            selected={startDate}
                            onChange={setStartDate}
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={endDate}
                            isInvalid={startDate > endDate}
                            dateFormat="DD/MM/YYYY"
                            aria-label="Start date"
                          />
                        }
                        endDateControl={
                          <EuiDatePicker
                            selected={endDate}
                            onChange={setEndDate}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="DD/MM/YYYY"
                            isInvalid={startDate > endDate}
                            aria-label="End date"
                          />
                        }
                      />)}
                    <div className="ms-3 d-flex">
                      <button disabled={isInValid} className="btn btn-primary" onClick={handleApply}>{t('Apply')}</button>
                    </div>
                  </div>
                </FilterWrapper>)}

              <Switch>
                <Route path={`${path}/energy-performance`}>
                  <EnergyPerformance electricConsumptions={generalBuildingInformation.electricConsumptions}
                                     electricConsumptionsFromHistorizedLogs={generalBuildingInformation.electricConsumptionsFromHistorizedLogs}
                                     prev12MonthsElectricityConsumptionsFromHistorizedLogs={generalBuildingInformation.prev12MonthsElectricityConsumptionsFromHistorizedLogs}
                                     prev24MonthsElectricityConsumptionsFromHistorizedLogs={generalBuildingInformation.prev24MonthsElectricityConsumptionsFromHistorizedLogs}
                                     energyPerformanceGroupBy={energyPerformanceGroupBy}
                                     overallEnergyConsumptionInformation={generalBuildingInformation.overallEnergyConsumptionInformation}
                                     annualCost={generalBuildingInformation.annualCost}
                                     annualConsumption={generalBuildingInformation.annualConsumption}
                                     annualCarbonEmissions={generalBuildingInformation.annualCarbonEmissions}
                                     lastMonthComparison={generalBuildingInformation.lastMonthComparison}
                                     annualCoolingSystemConsumption={generalBuildingInformation.annualCoolingSystemConsumption}
                                     annualHeatingSystemConsumption={generalBuildingInformation.annualHeatingSystemConsumption}
                                     annualMechanicalVentilationSystemConsumption={generalBuildingInformation.annualMechanicalVentilationSystemConsumption}
                                     annualLightingConsumption={generalBuildingInformation.annualLightingConsumption}
                                     pvSolarSystemLoad={generalBuildingInformation.pvSolarSystemLoad}
                                     periodOf12Month={generalBuildingInformation.periodOf12Month}
                                     consumptionBreakdown={generalBuildingInformation.consumptionBreakdown}
                                     costBreakdown={generalBuildingInformation.costBreakdown}
                                     co2EmissionsBreakdown={generalBuildingInformation.co2EmissionsBreakdown}
                                     incidentalGainsOtherInformation={generalBuildingInformation.incidentalGainsOtherInformation}
                  />
                </Route>
                <Route path={`${path}/comparison`}>
                  <Comparison data={{ buildingName: generalBuildingInformation.name, id: id }}/>
                </Route>
                <Route path={`${path}/improve`}>
                  <Improve consumptionBreakdown={generalBuildingInformation.consumptionBreakdown}
                           costBreakdown={generalBuildingInformation.consumptionBreakdown}
                           co2EmissionsBreakdown={generalBuildingInformation.consumptionBreakdown}
                           data={generalBuildingInformation.consumptionBreakdown}/>
                </Route>
                {/*<Route path={`${path}/equipment-asset-reliability/:equipmentId/:subBreakdownName`}>*/}
                {/*  <EquipmentAssetReliability />*/}
                {/*</Route>*/}
                <Route path={`${path}/asset-reliability`}>
                  <AssetReliability data={generalBuildingInformation.energyPerformance}/>
                </Route>
                <Redirect to={`${path}/energy-performance`}/>
              </Switch>

            </BuildingWrapper>
          )}
        </>)}
    </>
  )
}

export default Building

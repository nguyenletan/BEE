/* eslint-disable react-hooks/exhaustive-deps */
import {
  EuiAccordion,
  EuiFieldNumber,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiText,
  EuiTitle
} from '@elastic/eui'

import { EuiSelect } from '@elastic/eui';
import LightingFittingType, { getLightingFittingTypeImage, getLightingFittingTypeName } from 'reference-tables/LightingFittingType'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { calculateEnergyConsumption, formatNumber, replaceItemAtIndex } from 'Utilities'
import { differenceInCalendarWeeks } from 'date-fns'
import { useRecoilState } from 'recoil'
import { totalAnnualSavingState } from 'atoms'
import { calculateIRRValue } from 'IRR'

const Icon = styled.img`
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 0 15px;
`

const Item = styled.p`
  margin-bottom: 0 !important;
  padding: 0;
  line-height: 1.7em;
  margin-left: 1em;
  //font-size: 0.95em;
`

const LightingSubSystem = ({ subSystem }) => {

  const [energyConsumption, setEnergyConsumption] = useState(0)
  const [energyCost, setEnergyCost] = useState(0)
  const [emissions, setEmissions] = useState(0)
  const [investmentCost, setInvestmentCost] = useState(0)
  const [simplePayback, setSimplePayback] = useState(0)
  const [percentageOfLEDReplacement, setPercentageOfLEDReplacement] = useState(0)
  const [IRR, setIRR] = useState(0)
  const [costPerBulb, setCostPerBulb] = useState()
  const [numberOfBulbs, setNumberOfBulbs] = useState()
  const [wattRatingOfBulb, setWattRatingOfBulb] = useState()
  const [numberOfDaysPerWeek, setNumberOfDaysPerWeek] = useState(subSystem.numberOfDaysUsedPerWeek)
  const [numberOfHoursPerDay, setNumberOfHoursPerDay] = useState(subSystem.numberOfHoursUsedPerDay)
  const [totalAnnualSaving, setTotalAnnualSavingState] = useRecoilState(totalAnnualSavingState)

  useEffect(() => {

    if (wattRatingOfBulb === undefined || numberOfBulbs === undefined || costPerBulb === undefined) {
      return
    }

    const consumption = calculateEnergyConsumption(
      numberOfBulbs,
      wattRatingOfBulb,
      -differenceInCalendarWeeks(
        new Date(new Date().getFullYear(), 1, 1),
        new Date(new Date().getFullYear(), 12, 31),
      ),
      numberOfDaysPerWeek,
      numberOfHoursPerDay,
    ) + calculateEnergyConsumption(
      subSystem.numberOfBulbs - numberOfBulbs,
      subSystem.wattRatingOfBulb,
      -differenceInCalendarWeeks(
        new Date(new Date().getFullYear(), 1, 1),
        new Date(new Date().getFullYear(), 12, 31),
      ),
      subSystem.numberOfDaysUsedPerWeek,
      subSystem.numberOfHoursUsedPerDay)

    const energySavings = subSystem.energyConsumption - consumption
    const costSavings = subSystem.energyCost - (consumption * 0.023)
    const emissionsAvoided = consumption * 0.1
    const investmentCost = numberOfBulbs * costPerBulb
    const simplePayback = investmentCost / costSavings
    const _IRR = calculateIRRValue(-investmentCost, costSavings)
    const _percentageOfLEDReplacement = numberOfBulbs * 100 / subSystem.numberOfBulbs

    setEnergyConsumption(consumption)
    setEnergyCost(costSavings)
    setEmissions(emissionsAvoided)
    setInvestmentCost(investmentCost)
    setSimplePayback(simplePayback)
    setPercentageOfLEDReplacement(_percentageOfLEDReplacement)
    setIRR(_IRR)

    const index = totalAnnualSaving.findIndex((o) => o.id === subSystem.id)
    const newList = replaceItemAtIndex(totalAnnualSaving, index, {
      ...subSystem,
      //id: subSystem.id,
      energySavings: energySavings,
      costSavings: costSavings,
      emissionsAvoided: emissionsAvoided,
      investmentCost: investmentCost,
      simplePayback: simplePayback,
      IRR: _IRR,
      percentageOfLEDReplacement: _percentageOfLEDReplacement,
      numberOfReplacingBulbs: numberOfBulbs,
      costPerBulb: costPerBulb,
      numberOfOldBulbs: subSystem.numberOfBulbs,
    })

    setTotalAnnualSavingState(newList)
  }, [
    costPerBulb,
    numberOfBulbs,
    numberOfDaysPerWeek,
    numberOfHoursPerDay,
    subSystem.energyConsumption,
    subSystem.energyCost,
    subSystem.id,
    subSystem.numberOfBulbs,
    subSystem.numberOfDaysUsedPerWeek,
    subSystem.numberOfHoursUsedPerDay,
    subSystem.wattRatingOfBulb,
    wattRatingOfBulb])

  const onChanges = (e) => {
    switch (e.target.name) {
      case 'lightingFittingTypeId':
        console.log(e.target.value)

        break

      case 'numberOfBulbs':
        setNumberOfBulbs(+e.target.value)
        break
      case 'wattRatingOfBulb':
        setWattRatingOfBulb(+e.target.value)
        break
      case 'numberOfDaysPerWeek':
        setNumberOfDaysPerWeek(+e.target.value)
        break
      case 'numberOfHoursPerDay':
        setNumberOfHoursPerDay(+e.target.value)
        break
      case 'costPerBulb':
        setCostPerBulb(+e.target.value)
        break
      default:
        break
    }
  }

  const buttonContent = (data) => (
    <div>
      <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          <Icon src={getLightingFittingTypeImage(data.lightingFittingTypeId)}/>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiTitle size="xs">
            <h3>{data.title}</h3>
          </EuiTitle>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )

  return (

    <EuiAccordion
      id={subSystem.title + '_' + subSystem.id}
      buttonContent={buttonContent(subSystem)}
      paddingSize="s"
    >
      <EuiText size="s">
        <Item>
          Bulb: <span className="text-primary">{getLightingFittingTypeName(subSystem.lightingFittingTypeId)}</span>
        </Item>
        <Item>
          Number: <span className="text-primary">{subSystem.numberOfBulbs}</span>
        </Item>
        <Item>
          Watt Ratting (W): <span className="text-primary">{subSystem.wattRatingOfBulb}</span>
        </Item>
        <Item>
          Lumen Rating (lm): <span className="text-primary">{subSystem.lumensOfBulb}</span>
        </Item>
        {/*<Item>*/}
        {/*  Energy Consumption (kWh/Yr): <span className="text-primary">{formatNumber(subSystem.energyConsumption, 0)}</span>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  Energy Cost ($/Yr): <span className="text-primary">{formatNumber(subSystem.energyCost, 0)}</span>*/}
        {/*</Item>*/}
        {/*<Item>*/}
        {/*  Emissions (Tons/Yr): <span className="text-primary">{formatNumber(subSystem.emissions, 2)}</span>*/}
        {/*</Item>*/}
        <Item>
          Energy Consumption Savings (kWh/Yr): <span className="fw-bold text-primary">{energyConsumption !== 0
          ? formatNumber(subSystem.energyConsumption - energyConsumption, 0)
          : 0}</span>
        </Item>
        <Item>
          Energy Cost Savings ($/Yr): <span className="fw-bold text-primary">{energyCost !== 0 ? formatNumber(
          subSystem.energyCost - energyCost, 0) : 0}</span>
        </Item>
        <Item>
          Emissions Savings (Tons/Yr): <span className="fw-bold text-primary">{emissions !== 0 ? formatNumber(
          subSystem.emissions - emissions, 2) : 0}</span>
        </Item>
        <Item>
          Investment Cost ($): <span className="fw-bold text-primary">{investmentCost !== 0 ? formatNumber(
          investmentCost, 2) : 0}</span>
        </Item>
        <Item>
          Simple Payback ($): <span className="fw-bold text-primary">{simplePayback !== 0
          ? formatNumber(simplePayback, 2)
          : 0}</span>
        </Item>
        <Item>
          Internal Rate of Return: <span className="fw-bold text-primary">{IRR}</span>
        </Item>
        <Item>
          % Light Replacement: <span className="fw-bold text-primary">{formatNumber(percentageOfLEDReplacement, 2)}</span></Item>
      </EuiText>

      <EuiFormRow label="Replacement Bulb Type" className="mt-4">
        {/*<EuiFieldText compressed eadOnly value="LED"/>*/}
        <EuiSelect
          compressed
          options={LightingFittingType.map(t => {
              if (t.id === subSystem.id) return null
              return {
                value: t.id,
                text: t.name,
              }
            },
          )}
          name="lightingFittingTypeId"
          onChange={onChanges}
          value={{ value: "LED", text: "LED" }}
          aria-label="Use aria labels when no actual label is in use"
        />
      </EuiFormRow>
      <EuiFormRow label="Number Of Bulbs" className="mt-4">
        <EuiFieldNumber
          compressed
          placeholder="Number Of Bulbs"
          aria-label="Number Of Bulbs"
          value={numberOfBulbs}
          onChange={onChanges}
          name="numberOfBulbs"
        />
      </EuiFormRow>
      <EuiFormRow label="Watt Rating (W)" className="mt-4">
        <EuiFieldNumber
          compressed
          placeholder="Number Of Bulbs"
          aria-label="Number Of Bulbs"
          value={wattRatingOfBulb}
          onChange={onChanges}
          name="wattRatingOfBulb"
        />
      </EuiFormRow>
      <EuiFormRow label="Lumens Rating (lm)" className="mt-4">
        <EuiFieldNumber
          compressed
          placeholder="Lumens Rating (lm)"
          aria-label="Lumens Rating (lm)"
        />
      </EuiFormRow>
      <EuiFormRow label="Cost of Each Bulb ($)" className="mt-4">
        <EuiFieldNumber
          compressed
          value={costPerBulb}
          onChange={onChanges}
          name="costPerBulb"
          placeholder="Cost of Each Bulb ($)"
          aria-label="Cost of Each Bulb ($)"
        />
      </EuiFormRow>
      <EuiFormRow label="Number of Days Used Per Week" className="mt-4">
        <EuiFieldNumber
          compressed
          placeholder="Number of Days Used Per Week"
          aria-label="Number of Days Used Per Week"
          value={numberOfDaysPerWeek}
          onChange={onChanges}
          name="numberOfDaysPerWeek"
        />
      </EuiFormRow>
      <EuiFormRow label="Number of Hours Used Per Day" className="mt-4">
        <EuiFieldNumber
          compressed
          placeholder="Number of Hours Used Per Day"
          aria-label="Number of Hours Used Per Day"
          value={numberOfHoursPerDay}
          name="numberOfHoursPerDay"
          onChange={onChanges}
        />
      </EuiFormRow>

    </EuiAccordion>

)
}

export default LightingSubSystem
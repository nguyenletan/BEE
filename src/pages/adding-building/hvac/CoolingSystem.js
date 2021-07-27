import React from 'react'
import styled from 'styled-components'
import { Checkbox, Fade, FormControl, FormControlLabel, InputLabel, MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import CoolingSystemType from '../../../reference-tables/CoolingSystemType'
import ChillerEnergySourceType from '../../../reference-tables/ChillerEnergySourceType'
import CompressorType from '../../../reference-tables/CompressorType'
import { RefrigerantType, AbsorptionChillerRefrigerantType } from '../../../reference-tables/RefrigerantType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState } from 'recoil'
import { coolingSystemState } from '../../../atoms'
import { Controller } from 'react-hook-form'

const Title = styled.h4`
  font-size: 1.1rem;
`

const CoolingSystem = ({ control }) => {
  const classes = makeStyles((theme) => (MaterialFormStyle))()

  const [coolingSystem, setCoolingSystem] = useRecoilState(coolingSystemState)

  const [hasCoolingSystem, setHasCoolingSystem] = React.useState(coolingSystem.hasCoolingSystem)

  const [compressorTypeList, setCompressorTypeList] = React.useState(CompressorType)
  //const [absorptionChillerCompressorTypeList, setAbsorptionChillerCompressorTypeList] = React.useState(AbsorptionChillerCompressorType)
  const [chillerEnergySourceTypeList, setChillerEnergySourceTypeList] = React.useState(ChillerEnergySourceType)
  const [refrigerantTypeList, setRefrigerantTypeList] = React.useState(RefrigerantType)

  const onHasCoolingSystemChange = () => {
    setCoolingSystem({ ...coolingSystem, hasCoolingSystem: !hasCoolingSystem })
    setHasCoolingSystem(!hasCoolingSystem)
  }

  const onCoolingSystemTypeIdChange = (e) => {
    setCoolingSystem({ ...coolingSystem, coolingSystemTypeId: e.target.value })
    if (e.target.value === 4) {//'Split Unit AC'
      // compressor types : Reciprocating, Scroll, Rotary Vane
      setCompressorTypeList(
        CompressorType.filter(x => (x.name === 'Scroll' || x.name === 'Reciprocating' || x.name === 'Rotary Vane')))

      // energy source: Electricity
      setChillerEnergySourceTypeList(ChillerEnergySourceType.filter(x => x.name === 'Electricity'))

      // Refrigerant: no filter
      setRefrigerantTypeList(RefrigerantType)

    } else if (e.target.value === 1 || e.target.value === 2) {
      // compressor type: Centrifugal, Reciprocating, Scroll, Screw
      setCompressorTypeList(
        CompressorType.filter(
          x => (x.name === 'Scroll' || x.name === 'Reciprocating' || x.name === 'Centrifugal' || x.name === 'Screw')))

      // energy source: Electricity
      setChillerEnergySourceTypeList(ChillerEnergySourceType.filter(x => x.name === 'Electricity'))

      // Refrigerant: no filter
      setRefrigerantTypeList(RefrigerantType)

    } else if (e.target.value === 5) { ///'Absorption Chiller')
      // compressor type: null
      setCompressorTypeList(null)

      // energy source: Hot Water, Steam, Exhaust
      setChillerEnergySourceTypeList(
        ChillerEnergySourceType.filter(x => x.name === 'Hot Water' || x.name === 'Steam' || x.name === 'Exhaust'))

      // Refrigerant: Water-Ammonia, Water-Lithium Bromide
      setRefrigerantTypeList(AbsorptionChillerRefrigerantType)

    } else if (e.target.value === 3) { //District Cooling System
      // compressor type: null
      setCompressorTypeList(null)

      // energy source: Electricity
      setChillerEnergySourceTypeList(ChillerEnergySourceType.filter(x => x.name === 'Electricity'))

      // Refrigerant: []
      setRefrigerantTypeList(null)

    } else {
      setCompressorTypeList(CompressorType)
      setRefrigerantTypeList(RefrigerantType)
      setChillerEnergySourceTypeList(ChillerEnergySourceType)
    }
  }

  const onCompressorTypeIdChange = (e) => {
    setCoolingSystem({ ...coolingSystem, compressorTypeId: e.target.value })
  }

  const onRefrigerantTypeIdChange = (e) => {
    setCoolingSystem({ ...coolingSystem, refrigerantTypeId: e.target.value })
  }

  const onChillerEnergySourceTypeIdChange = (e) => {
    setCoolingSystem(
      { ...coolingSystem, chillerEnergySourceTypeId: e.target.value })
  }

  return (
    <>
      <Title>Cooling System Installed</Title>
      <FormControlLabel
        className="mb-3"
        control={
          <Checkbox
            name="hasCoolingSystem"
            color="primary"
            checked={hasCoolingSystem}
            onChange={onHasCoolingSystemChange}
          />
        }
        label="Yes"
      />

      {hasCoolingSystem && (
        <Fade in={hasCoolingSystem} timeout={500}>
          <div className="d-flex flex-column">

            <Controller
              name="coolingSystemTypeId"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="cooling-system-type-id-label">Cooling System Type</InputLabel>
                  <Select
                    labelId="cooling-system-type-id-label"
                    id="cooling-system-type-id-select"
                    value={coolingSystem.coolingSystemTypeId}
                    onChange={(e) => {
                      onChange(e)
                      onCoolingSystemTypeIdChange(e)
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {CoolingSystemType.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                  </Select>
                </FormControl>
              )}
              rules={{
                required: 'Cooling System Type is required',
              }}
            />

            {compressorTypeList && (
              <Controller
                name="compressorTypeId"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (

                  <FormControl className={classes.formControl}>
                    <InputLabel id="compressor-type-label">Compressor
                      Type
                    </InputLabel>
                    <Select
                      labelId="compressor-type-label"
                      id="compressor-type-select"
                      value={coolingSystem.compressorTypeId}
                      onChange={(e) => {
                        onChange(e)
                        onCompressorTypeIdChange(e)
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    >
                      {compressorTypeList.map((o) => (
                        <MenuItem
                          key={o.id}
                          value={o.id}
                        >
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                rules={{
                  required: 'Compressor Type is required',
                }}
              />)}

            {refrigerantTypeList && (
              <Controller
                name="refrigerantTypeId"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id="refrigerant-type-label">Refrigerant Type</InputLabel>
                    <Select
                      labelId="refrigerant-type-label"
                      id="refrigerant-type-select"
                      value={coolingSystem.refrigerantTypeId}
                      onChange={(e) => {
                        onChange(e)
                        onRefrigerantTypeIdChange(e)
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    >
                      {refrigerantTypeList.map((o) => (
                        <MenuItem
                          key={o.id}
                          value={o.id}
                        >
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                rules={{
                  required: 'Refrigerant Type is required',
                }}
              />)}

            {chillerEnergySourceTypeList && (
              <Controller
                name="chillerEnergySourceTypeId"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id="chiller-energy-label">Chiller Energy
                      Source
                    </InputLabel>
                    <Select
                      labelId="chiller-energy-label"
                      id="chiller-energy-select"
                      value={coolingSystem.chillerEnergySourceTypeId}
                      onChange={(e) => {
                        onChange(e)
                        onChillerEnergySourceTypeIdChange(e)
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    >
                      {chillerEnergySourceTypeList.map(
                        item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                    </Select>
                  </FormControl>
                )}
                rules={{
                  required: 'ChillerEnergy Source Type is required',
                }}
              />)}
          </div>
        </Fade>
      )}
    </>
  )
}

export default CoolingSystem

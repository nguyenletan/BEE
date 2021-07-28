import React from 'react'
import styled from 'styled-components'
import { Checkbox, Fade, FormControl, FormControlLabel, InputLabel, MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import { Controller } from 'react-hook-form'

import HeatingSystemType from '../../../reference-tables/HeatingSystemType'
import HeaterType from '../../../reference-tables/HeaterType'
import HeaterEnergySourceType from '../../../reference-tables/HeaterEnergySourceType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState } from 'recoil'
import { heatingSystemState } from '../../../atoms'

const Title = styled.h4`
  font-size: 1.1rem;
`

const HeatingSystem = ({ control }) => {
  const classes = makeStyles((theme) => (MaterialFormStyle))()

  const [heatingSystem, setHeatingSystem] = useRecoilState(heatingSystemState)

  const [hasHeatingSystem, setHasHeatingSystem] = React.useState(heatingSystem.hasHeatingSystem)

  const [energySourceType, setEnergySourceType] = React.useState(HeaterEnergySourceType)

  const onHasHeatingSystemChange = () => {
    setHeatingSystem({ ...heatingSystem, hasHeatingSystem: !hasHeatingSystem })
    setHasHeatingSystem(!hasHeatingSystem)
  }

  const onHeatingSystemTypeIdChange = (e) => {
    setHeatingSystem({ ...heatingSystem, heatingSystemTypeId: e.target.value })
  }

  const onHeaterTypeIdChange = (e) => {
    setHeatingSystem({ ...heatingSystem, heaterTypeId: e.target.value })
    if (e.target.value === 5) { //Central Boiler
      // Energy Source == [Natural Gas, Fuel Oil, Propane]
      setEnergySourceType(
        HeaterEnergySourceType.filter(x => x.name === 'Natural Gas' || x.name === 'Fuel Oil' || x.name === 'Propane'))
    } else if (e.target.value === 1 || e.target.value === 2) {
      // Energy Source == [Electricity]
      setEnergySourceType(HeaterEnergySourceType.filter(x => x.name === 'Electricity'))
    } else if (e.target.value === 6 || e.target.value === 3) {
      // Energy Source == [Geothermal Hot Water]
      setEnergySourceType(HeaterEnergySourceType.filter(x => x.name === 'Geothermal Hot Water'))
    } else if (e.target.value === 4) {
      // Energy Source == [District Hot Water]
      setEnergySourceType(HeaterEnergySourceType.filter(x => x.name === 'District Hot Water'))
    } else if (e.target.value === 7) {
      // Energy Source == [Natural Gas, Fuel Oil, Propane, Geothermal Hot Water]
      setEnergySourceType(HeaterEnergySourceType.filter(
        x => x.name === 'Natural Gas' || x.name === 'Fuel Oil' || x.name === 'Propane' || x.name === 'Geothermal Hot Water'))
    } else {
      setEnergySourceType(HeaterEnergySourceType)
    }
  }

  const onHeaterEnergySourceTypeIdChange = (e) => {
    setHeatingSystem(
      { ...heatingSystem, heaterEnergySourceTypeId: e.target.value })
  }

  return (
    <>
      <Title>Heating System Installed</Title>
      <FormControlLabel
        className="mb-3"
        control={
          <Checkbox
            name="checkedB"
            color="primary"
            checked={hasHeatingSystem}
            onChange={onHasHeatingSystemChange}
          />
        }
        label="Yes"
      />

      {hasHeatingSystem && (
        <Fade in={hasHeatingSystem} timeout={500}>

          <div className="d-flex flex-column">

            <Controller
              name="heatingSystemTypeId"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="heating-system-type-label">Heating System Type</InputLabel>
                  <Select
                    labelId="heating-system-type-label"
                    id="heating-system-type-select"
                    value={heatingSystem.heatingSystemTypeId}
                    onChange={(e) => {
                      onChange(e)
                      onHeatingSystemTypeIdChange(e)
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {HeatingSystemType.map((o) => (
                      <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              rules={{ required: 'Heating System Type is required' }}
            />

            <Controller
              name="heaterTypeId"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="heater-type-label">Heater Type</InputLabel>
                  <Select
                    labelId="heater-type-label"
                    id="heater-type-select"
                    value={heatingSystem.heaterTypeId}
                    onChange={(e) => {
                      onChange(e)
                      onHeaterTypeIdChange(e)
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {HeaterType.map((o) => (
                      <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              rules={{ required: 'Heater Type is required' }}
            />

            <Controller
              name="heaterEnergySourceTypeId"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="heater-energy-source-label">Heater Energy Source</InputLabel>
                  <Select
                    labelId="heater-energy-source-label"
                    id="heater-energy-source-select"
                    value={heatingSystem.heaterEnergySourceTypeId}
                    onChange={(e) => {
                      onChange(e)
                      onHeaterEnergySourceTypeIdChange(e)
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                  >
                    {energySourceType.map((o) => (
                      <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              rules={{ required: 'Heater Energy Source Type is required' }}
            />
          </div>
        </Fade>
      )}

    </>
  )
}

export default HeatingSystem

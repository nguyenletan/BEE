import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import HeatingSystemType from '../../../reference-tables/HeatingSystemType'
import HeaterType from '../../../reference-tables/HeaterType'
import HeaterEnergySourceType
  from '../../../reference-tables/HeaterEnergySourceType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState } from 'recoil'
import { heatingSystemState } from '../../../atoms'

const Title = styled.h4`
  font-size: 1.1rem;
`

const HeatingSystem = () => {

  const classes = makeStyles((theme) => (MaterialFormStyle))()

  const [heatingSystem, setHeatingSystem] = useRecoilState(heatingSystemState)

  const [hasHeatingSystem, setHasHeatingSystem] = React.useState(
    heatingSystem.hasHeatingSystem)

  const [heatingSystemTypeId, selectHeatingSystemTypeId] = useState(
    heatingSystem.heatingSystemTypeId ?? 0)

  const [heaterTypeId, selectHeaterTypeId] = useState(
    heatingSystem.heaterTypeId ?? 0)

  const [heaterEnergySourceTypeId, selectHeaterEnergySourceTypeId] = useState(
    heatingSystem.heaterEnergySourceTypeId ?? 0)

  const onHasHeatingSystemChange = () => {
    setHeatingSystem({ ...heatingSystem, hasHeatingSystem: !hasHeatingSystem })
    setHasHeatingSystem(!hasHeatingSystem)
  }

  const onHeatingSystemTypeIdChange = (e) => {
    selectHeatingSystemTypeId(e.target.value)
    setHeatingSystem({ ...heatingSystem, heatingSystemTypeId: e.target.value })
  }

  const onHeaterTypeIdChange = (e) => {
    selectHeaterTypeId(e.target.value)
    setHeatingSystem({ ...heatingSystem, heaterTypeId: e.target.value })
  }

  const onHeaterEnergySourceTypeIdChange = (e) => {
    selectHeaterEnergySourceTypeId(e.target.value)
    setHeatingSystem(
      { ...heatingSystem, heaterEnergySourceTypeId: e.target.value })
  }

  return (
    <>
      <Title>Heating System Installed</Title>
      <FormControlLabel
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
            <FormControl className={classes.formControl}>
              <InputLabel id="heating-system-type-label">Heating System
                Type</InputLabel>
              <Select
                labelId="heating-system-type-label"
                id="heating-system-type-select"
                value={heatingSystemTypeId}
                onChange={onHeatingSystemTypeIdChange}
              >
                {HeatingSystemType.map((o) => (
                  <MenuItem
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="heater-type-label">Heater Type</InputLabel>
              <Select
                labelId="heater-type-label"
                id="heater-type-select"
                value={heaterTypeId}
                onChange={onHeaterTypeIdChange}
              >
                {HeaterType.map((o) => (
                  <MenuItem
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="heater-energy-source-label">Heater Energy
                Source</InputLabel>
              <Select
                labelId="heater-energy-source-label"
                id="heater-energy-source-select"
                value={heaterEnergySourceTypeId}
                onChange={onHeaterEnergySourceTypeIdChange}
              >
                {HeaterEnergySourceType.map((o) => (
                  <MenuItem
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Fade>
      )}

    </>
  )
}

export default HeatingSystem
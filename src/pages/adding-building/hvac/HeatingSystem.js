import React from 'react'
import styled from 'styled-components'
import {
  Checkbox, Fade,
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

const Title = styled.h4`
  font-size: 1.1rem;
`



const HeatingSystem = () => {
  const [hasHeatingSystem, setHasHeatingSystem] = React.useState(false)

  const classes = makeStyles((theme) => (MaterialFormStyle))()

  return (
    <>
      <Title>Heating System Installed</Title>
      <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
            value={hasHeatingSystem}
            onChange={() => setHasHeatingSystem(!hasHeatingSystem)}
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
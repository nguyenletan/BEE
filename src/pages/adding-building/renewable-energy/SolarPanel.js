import React from 'react'
import styled from 'styled-components'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  TextField,
  Fade
} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import PVTechChoiceType from '../../../reference-tables/PVTechChoiceType'

const Title = styled.h4`
  font-size: 1.1rem;
`

const SolarPanel = () => {
  const [hasSolarPanel, setHasSolarPanel] = React.useState(false)

  const classes = MaterialFormStyle()

  return (
    <>
      <Title>Solar Panel Installed</Title>
      <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
            value={hasSolarPanel}
            onChange={() => setHasSolarPanel(!hasSolarPanel)}
          />
        }
        label="Yes"
      />

      {hasSolarPanel && (
        <Fade in={hasSolarPanel} timeout={500}>
          <div className="d-flex flex-column">

            <FormControl className={classes.formControl}>
              <TextField type="number" label="Installed Capacity (kWh)"/>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="tracking-type-label">Tracking Type</InputLabel>
              <Select
                labelId="tracking-type-label"
                id="tracking-type-select"
              >
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField type="number" label="Incline Angle"/>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField type="number" label="System Loss"/>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="pv-tech-choice-label">PV Tech Choice</InputLabel>
              <Select
                labelId="pv-tech-choice-type-label"
                id="pv-tech-choice-type-select"
              >
                {PVTechChoiceType.map((o) => (
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
              <InputLabel id="pv-system-type-label">PV System Type</InputLabel>
              <Select
                labelId="pv-system-type-label"
                id="pv-system-type-select"
              >
              </Select>
            </FormControl>
          </div>
        </Fade>
      )}
    </>
  )
}

export default SolarPanel
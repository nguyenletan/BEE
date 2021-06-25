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
import CoolingSystemType from '../../../reference-tables/CoolingSystemType'
import ChillerEnergySourceType
  from '../../../reference-tables/ChillerEnergySourceType'
import CompressorType from '../../../reference-tables/CompressorType'
import RefrigerantType from '../../../reference-tables/RefrigerantType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'

const Title = styled.h4`
  font-size: 1.1rem;
`

const CoolingSystem = () => {
  const [hasCoolingSystem, setHasCoolingSystem] = React.useState(false)

  const classes = MaterialFormStyle()

  const coolingSystemItems = CoolingSystemType.map(
    item => <MenuItem value={item.id}>{item.name}</MenuItem>)

  const ChillerEnergySourceTypeItems = ChillerEnergySourceType.map(
    item => <MenuItem value={item.id}>{item.name}</MenuItem>)

  return (
    <>
      <Title>Cooling System Installed</Title>
      <FormControlLabel
        control={
          <Checkbox
            name="checkedB"
            color="primary"
            value={hasCoolingSystem}
            onChange={() => setHasCoolingSystem(!hasCoolingSystem)}
          />
        }
        label="Yes"
      />

      {hasCoolingSystem && (
        <Fade in={hasCoolingSystem} timeout={500}>
          <div className="d-flex flex-column">
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Cooling System
              Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              {coolingSystemItems}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="compressor-type-label">Compressor Type</InputLabel>
            <Select
              labelId="compressor-type-label"
              id="compressor-type-select"
            >
              {CompressorType.map((o) => (
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
            <InputLabel id="refrigerant-type-label">Refrigerant
              Type</InputLabel>
            <Select
              labelId="refrigerant-type-label"
              id="refrigerant-type-select"
            >
              {RefrigerantType.map((o) => (
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
            <InputLabel id="chiller-energy-label">Chiller Energy
              Source</InputLabel>
            <Select
              labelId="chiller-energy-label"
              id="chiller-energy-select"

            >
              {ChillerEnergySourceTypeItems}
            </Select>
          </FormControl>
        </div>
        </Fade>
      )}
    </>
  )
}

export default CoolingSystem
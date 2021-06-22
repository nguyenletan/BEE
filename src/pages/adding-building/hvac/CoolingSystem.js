import React from 'react'
import styled from 'styled-components'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  makeStyles,
  MenuItem,
} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import CoolingSystemType from '../../../reference-tables/CoolingSystemType'
import ChillerEnergySourceType
  from '../../../reference-tables/ChillerEnergySourceType'

const Title = styled.h4`
  font-size: 1.1rem;
`

const CoolingSystem = () => {
  const [hasCoolingSystem, setHasCoolingSystem] = React.useState(false)

  const useStyles = makeStyles((theme) => ({
    formControl: {
      marginBottom: theme.spacing(2),
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }))

  const classes = useStyles()

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
            <InputLabel id="demo-simple-select-label">Chiller Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"

            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Chiller Energy
              Source</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"

            >
              {ChillerEnergySourceTypeItems}
            </Select>
          </FormControl>
        </div>
      )}
    </>
  )
}

export default CoolingSystem
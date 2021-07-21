import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem
} from '@material-ui/core'
import Select from '@material-ui/core/Select'
import CoolingSystemType from '../../../reference-tables/CoolingSystemType'
import ChillerEnergySourceType
  from '../../../reference-tables/ChillerEnergySourceType'
import CompressorType from '../../../reference-tables/CompressorType'
import RefrigerantType from '../../../reference-tables/RefrigerantType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState } from 'recoil'
import { coolingSystemState } from '../../../atoms'

const Title = styled.h4`
  font-size: 1.1rem;
`

const CoolingSystem = () => {
  const classes = makeStyles((theme) => (MaterialFormStyle))()

  const [coolingSystem, setCoolingSystem] = useRecoilState(coolingSystemState)

  const [hasCoolingSystem, setHasCoolingSystem] = React.useState(coolingSystem.hasCoolingSystem)

  const [coolingSystemTypeId, selectCoolingSystemTypeId] = useState(
    coolingSystem.coolingSystemTypeId ?? 0)

  const [compressorTypeId, selectCompressorTypeId] = useState(
    coolingSystem.compressorTypeId ?? 0)

  const [refrigerantTypeId, selectRefrigerantTypeId] = useState(
    coolingSystem.refrigerantTypeId ?? 0)

  const [chillerEnergySourceTypeId, selectChillerEnergySourceTypeId] = useState(
    coolingSystem.chillerEnergySourceTypeId ?? 0)

  const onHasCoolingSystemChange = () => {
    setCoolingSystem({ ...coolingSystem, hasCoolingSystem: !hasCoolingSystem })
    setHasCoolingSystem(!hasCoolingSystem)
  }

  const onCoolingSystemTypeIdChange = (e) => {
    selectCoolingSystemTypeId(e.target.value)
    setCoolingSystem({ ...coolingSystem, coolingSystemTypeId: e.target.value })
  }

  const onCompressorTypeIdChange = (e) => {
    selectCompressorTypeId(e.target.value)
    setCoolingSystem({ ...coolingSystem, compressorTypeId: e.target.value })
  }

  const onRefrigerantTypeIdChange = (e) => {
    selectRefrigerantTypeId(e.target.value)
    setCoolingSystem({ ...coolingSystem, refrigerantTypeId: e.target.value })
  }

  const onChillerEnergySourceTypeIdChange = (e) => {
    selectChillerEnergySourceTypeId(e.target.value)
    setCoolingSystem(
      { ...coolingSystem, chillerEnergySourceTypeId: e.target.value })
  }

  return (
    <>
      <Title>Cooling System Installed</Title>
      <FormControlLabel
        className='mb-2'
        control={
          <Checkbox
            name='hasCoolingSystem'
            color='primary'
            checked={hasCoolingSystem}
            onChange={onHasCoolingSystemChange}
          />
        }
        label='Yes'
      />

      {hasCoolingSystem && (
        <Fade in={hasCoolingSystem} timeout={500}>
          <div className='d-flex flex-column'>

            <FormControl className={classes.formControl}>
              <InputLabel id='cooling-system-type-id-label'>Cooling System
                Type
              </InputLabel>
              <Select
                labelId='cooling-system-type-id-label'
                id='cooling-system-type-id-select'
                value={coolingSystemTypeId}
                onChange={onCoolingSystemTypeIdChange}
              >
                {CoolingSystemType.map(
                  item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id='compressor-type-label'>Compressor
                Type
              </InputLabel>
              <Select
                labelId='compressor-type-label'
                id='compressor-type-select'
                value={compressorTypeId}
                onChange={onCompressorTypeIdChange}
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
              <InputLabel id='refrigerant-type-label'>Refrigerant
                Type
              </InputLabel>
              <Select
                labelId='refrigerant-type-label'
                id='refrigerant-type-select'
                value={refrigerantTypeId}
                onChange={onRefrigerantTypeIdChange}
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
              <InputLabel id='chiller-energy-label'>Chiller Energy
                Source
              </InputLabel>
              <Select
                labelId='chiller-energy-label'
                id='chiller-energy-select'
                value={chillerEnergySourceTypeId}
                onChange={onChillerEnergySourceTypeIdChange}
              >
                {ChillerEnergySourceType.map(
                  item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </Fade>
      )}
    </>
  )
}

export default CoolingSystem

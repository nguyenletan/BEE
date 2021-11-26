import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import CoolingSystemType from '../../../reference-tables/CoolingSystemType'
import ChillerEnergySourceType from '../../../reference-tables/ChillerEnergySourceType'
import CompressorType from '../../../reference-tables/CompressorType'
import { AbsorptionChillerRefrigerantType, RefrigerantType } from 'reference-tables/RefrigerantType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState } from 'recoil'
import { coolingSystemState } from 'atoms'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const Title = styled.h4`
  font-size: 1.1rem;
`

const CoolingSystem = ({ control, setValue }) => {
  const classes = makeStyles(() => (MaterialFormStyle))()
  const { t } = useTranslation(['buildingInput', 'common'])
  const [coolingSystem, setCoolingSystem] = useRecoilState(coolingSystemState)

  const [compressorTypeList, setCompressorTypeList] = React.useState(CompressorType)
  //const [absorptionChillerCompressorTypeList, setAbsorptionChillerCompressorTypeList] = React.useState(AbsorptionChillerCompressorType)
  const [chillerEnergySourceTypeList, setChillerEnergySourceTypeList] = React.useState(ChillerEnergySourceType)
  const [refrigerantTypeList, setRefrigerantTypeList] = React.useState(RefrigerantType)

  const onHasCoolingSystemChange = () => {
    setCoolingSystem({ ...coolingSystem, hasCoolingSystem: !coolingSystem.hasCoolingSystem })
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

  useEffect(() => {
    setValue(`coolingSystemTypeId`, coolingSystem.coolingSystemTypeId, {shouldValidate: true})
    setValue(`compressorTypeId`, coolingSystem.compressorTypeId, {shouldValidate: true})
    setValue(`refrigerantTypeId`, coolingSystem.refrigerantTypeId, {shouldValidate: true})
    setValue(`chillerEnergySourceTypeId`, coolingSystem.chillerEnergySourceTypeId, {shouldValidate: true})

  }, [
    coolingSystem.chillerEnergySourceTypeId,
    coolingSystem.compressorTypeId,
    coolingSystem.coolingSystemTypeId,
    coolingSystem.refrigerantTypeId,
    setValue])

  return (
    <>
      <Title>{t('Cooling System Installed')}</Title>
      <FormControlLabel
        className="mb-3"
        control={
          <Checkbox
            name="hasCoolingSystem"
            color="primary"
            checked={coolingSystem.hasCoolingSystem}
            onChange={onHasCoolingSystemChange}
          />
        }
        label={t("Yes")}
      />

      {coolingSystem.hasCoolingSystem && (
        <div className="d-flex flex-column">

          <Controller
            name="coolingSystemTypeId"
            control={control}
            render={({
              field: { onChange },
              fieldState: { error },
            }) => (
              <FormControl className={classes.formControl}>
                <InputLabel id="cooling-system-type-id-label" className={error && 'text-danger'}>
                  {t('Cooling System Type')}
                </InputLabel>
                <Select
                  labelId="cooling-system-type-id-label"
                  id="cooling-system-type-id-select"
                  value={coolingSystem.coolingSystemTypeId}
                  onChange={(e) => {
                    onChange(e)
                    onCoolingSystemTypeIdChange(e)
                  }}
                  error={!!error}
                >
                  {CoolingSystemType.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                </Select>
                {error && <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
              </FormControl>
            )}
            rules={{
              required: t('This field is required'),
            }}
          />

          {compressorTypeList && (
            <Controller
              name="compressorTypeId"
              control={control}
              render={({
                field: { onChange },
                fieldState: { error },
              }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="compressor-type-label" className={error && 'text-danger'}>
                    {t('Compressor Type')}
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
                  {error && <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
                </FormControl>
              )}
              rules={{
                required: t('This field is required'),
              }}
            />)}

          {refrigerantTypeList && (
            <Controller
              name="refrigerantTypeId"
              control={control}
              render={({
                field: { onChange },
                fieldState: { error },
              }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="refrigerant-type-label" className={error && 'text-danger'}>
                    {t('Refrigerant Type')}
                  </InputLabel>
                  <Select
                    labelId="refrigerant-type-label"
                    id="refrigerant-type-select"
                    value={coolingSystem.refrigerantTypeId}
                    onChange={(e) => {
                      onChange(e)
                      onRefrigerantTypeIdChange(e)
                    }}
                    error={!!error}
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
                  {error && <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
                </FormControl>
              )}
              rules={{
                required: t('This field is required'),
              }}
            />)}

          {chillerEnergySourceTypeList && (
            <Controller
              name="chillerEnergySourceTypeId"
              control={control}
              render={({
                field: { onChange },
                fieldState: { error },
              }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="chiller-energy-label" className={error && 'text-danger'}>
                    {t('Chiller Energy Source')}
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
                  >
                    {chillerEnergySourceTypeList.map(
                      item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
                  </Select>
                  {error &&
                  <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
                </FormControl>
              )}
              rules={{
                required: t('This field is required'),
              }}
            />)}
        </div>

      )}
    </>
  )
}

export default CoolingSystem

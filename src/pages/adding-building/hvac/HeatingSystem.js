import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Checkbox, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem } from '@material-ui/core'
import Select from '@material-ui/core/Select'
import { Controller } from 'react-hook-form'

import HeatingSystemType from '../../../reference-tables/HeatingSystemType'
import HeaterType from '../../../reference-tables/HeaterType'
import HeaterEnergySourceType from '../../../reference-tables/HeaterEnergySourceType'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState } from 'recoil'
import { heatingSystemState } from '../../../atoms'
import { useTranslation } from 'react-i18next'

const Title = styled.h4`
  font-size: 1.1rem;
`

const HeatingSystem = ({ control, setValue }) => {
  const classes = makeStyles(() => (MaterialFormStyle))()
  const { t } = useTranslation('buildingInput')
  const [heatingSystem, setHeatingSystem] = useRecoilState(heatingSystemState)

  const [energySourceType, setEnergySourceType] = React.useState(HeaterEnergySourceType)

  const onHasHeatingSystemChange = () => {
    setHeatingSystem({ ...heatingSystem, hasHeatingSystem: !heatingSystem.hasHeatingSystem })
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

  useEffect(() => {
    setValue(`heatingSystemTypeId`, heatingSystem.heatingSystemTypeId, { shouldValidate: true })
    setValue(`heaterTypeId`, heatingSystem.heaterTypeId, { shouldValidate: true })
    setValue(`heaterEnergySourceTypeId`, heatingSystem.heaterEnergySourceTypeId, { shouldValidate: true })
  }, [heatingSystem.heaterEnergySourceTypeId, heatingSystem.heaterTypeId, heatingSystem.heatingSystemTypeId, setValue])

  return (
    <>
      <Title>{t('Heating System Installed')}</Title>
      <FormControlLabel
        className="mb-3"
        control={
          <Checkbox
            name="checkedB"
            color="primary"
            checked={heatingSystem.hasHeatingSystem}
            onChange={onHasHeatingSystemChange}
          />
        }
        label={t('Yes')}
      />

      {heatingSystem.hasHeatingSystem && (

        <div className="d-flex flex-column">

          <Controller
            name="heatingSystemTypeId"
            control={control}
            render={({
              field: { onChange },
              fieldState: { error },
            }) => (
              <FormControl className={classes.formControl}>
                <InputLabel id="heating-system-type-label" className={error && 'text-danger'}>
                  {t('Heating System Type')}
                </InputLabel>
                <Select
                  labelId="heating-system-type-label"
                  id="heating-system-type-select"
                  value={heatingSystem.heatingSystemTypeId}
                  onChange={(e) => {
                    onChange(e)
                    onHeatingSystemTypeIdChange(e)
                  }}
                  error={!!error}
                >
                  {HeatingSystemType.map((o) => (
                    <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
              </FormControl>
            )}
            rules={{
              required: t('This field is required'),
            }}
          />

          <Controller
            name="heaterTypeId"
            control={control}
            render={({
              field: { onChange },
              fieldState: { error },
            }) => (
              <FormControl className={classes.formControl}>
                <InputLabel id="heater-type-label" className={error && 'text-danger'}>
                  {t('Heater Type')}
                </InputLabel>
                <Select
                  labelId="heater-type-label"
                  id="heater-type-select"
                  value={heatingSystem.heaterTypeId}
                  onChange={(e) => {
                    onChange(e)
                    onHeaterTypeIdChange(e)
                  }}
                  error={!!error}
                >
                  {HeaterType.map((o) => (
                    <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
              </FormControl>
            )}
            rules={{
              required: t('This field is required'),
            }}
          />

          <Controller
            name="heaterEnergySourceTypeId"
            control={control}
            render={({
              field: { onChange },
              fieldState: { error },
            }) => (
              <FormControl className={classes.formControl}>
                <InputLabel id="heater-energy-source-label" className={error && 'text-danger'}>
                  {t('Heater Energy Source')}
                </InputLabel>
                <Select
                  labelId="heater-energy-source-label"
                  id="heater-energy-source-select"
                  value={heatingSystem.heaterEnergySourceTypeId}
                  onChange={(e) => {
                    onChange(e)
                    onHeaterEnergySourceTypeIdChange(e)
                  }}
                  error={!!error}
                >
                  {energySourceType.map((o) => (
                    <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                  ))}
                </Select>
                {error &&
                <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
              </FormControl>
            )}
            rules={{
              required: t('Heater Energy Source Type is required'),
            }}
          />
        </div>
      )}
    </>
  )
}

export default HeatingSystem

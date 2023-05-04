/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import StepNav from '../step-nav/StepNav'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Box, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Slider, Typography, Grid } from '@mui/material'

import MaterialFormStyle from '../../../style/MaterialFormStyle'
import ExternalWindowType from '../../../reference-tables/ExternalWindowType'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { makeStyles } from '@mui/styles'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState, envelopFacadeState } from 'atoms'
import { useNavigate, useParams } from 'react-router-dom'
import RoofType from '../../../reference-tables/RoofType'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'AuthenticateProvider'
import { trackingUser } from 'api/UserAPI'

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const EnvelopFacade = () => {
  const classes = makeStyles(() => (MaterialFormStyle))()
  const { t } = useTranslation(['buildingInput', 'common'])
  const navigate = useNavigate()

  console.log('envelopFacade')
  const [envelopFacade, setEnvelopFacade] = useRecoilState(envelopFacadeState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const { handleSubmit, control, setValue } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
  })

  const onExternalWindowToWallRatioSliderChange = (event, newValue) => {
    setEnvelopFacade({ ...envelopFacade, externalWindowToWallRatio: newValue })
  }

  const onExternalWindowToWallRatioInputBlur = () => {
    if (envelopFacade.externalWindowToWallRatio < 0 || envelopFacade.externalWindowToWallRatio === '' ||
      envelopFacade.externalWindowToWallRatio === null) {
      setEnvelopFacade({ ...envelopFacade, externalWindowToWallRatio: 0 })
    } else if (envelopFacade.externalWindowToWallRatio > 1) {
      setEnvelopFacade({ ...envelopFacade, externalWindowToWallRatio: 1 })
    }
  }

  const onSubmit = () => {
    // console.log(data)
    setAddingBuildingProgressState(80)
    navigate(moveNextUrl)
  }

  const handleChange = (e) => {
    setEnvelopFacade({ ...envelopFacade, [e.target.name]: parseFloat(e.target.value) })
  }

  const { user } = useAuth()

  useEffect(() => {
    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'Envelop Facade - Adding Building', idToken)
    }
    tracking()
  }, [])

  useEffect(() => {
    setValue(`externalRoofInsulationTypeId`, envelopFacade.externalRoofInsulationTypeId, {shouldValidate: true})
    setValue(`externalWindowInsulationTypeId`, envelopFacade.externalWindowInsulationTypeId, {shouldValidate: true})
  }, [envelopFacade.externalRoofInsulationTypeId, envelopFacade.externalWindowInsulationTypeId, setValue])

  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 0.1,

    },
    {
      value: 0.2,

    },
    {
      value: 0.3,

    },
    {
      value: 0.4,

    },
    {
      value: 0.5,
      label: 0.5,
    },
    {
      value: 0.6,

    },
    {
      value: 0.7,

    },
    {
      value: 0.8,

    },
    {
      value: 0.9,

    },
    {
      value: 1,
      label: 1,
    },
  ]

  const { id } = useParams()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'
  const moveNextUrl = parentUrl + (id ? '/adding-building-successfully' : '/renewable-energy')

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="d-flex mt-5 mb-4">

        <Title>{t('New Building')}</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/lighting'}
          nextLink="/adding-building/renewable-energy"
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav/>

      <div className="row">
        <div className="col-12 col-lg-6 col-xxl-4">
          <Box component="div" mb={3}>
            <Typography gutterBottom>
              {t('External Window to Wall Ratio')}
            </Typography>
            <Grid container spacing={2} alignItems="flex-start">

              <Grid item xs>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  marks={marks}
                  value={envelopFacade.externalWindowToWallRatio}
                  onChange={onExternalWindowToWallRatioSliderChange}
                  aria-labelledby="input-slider"
                  valueLabelDisplay="auto"
                />
              </Grid>

              <Grid item>
                <Input
                  value={envelopFacade.externalWindowToWallRatio}
                  margin="dense"
                  name="externalWindowToWallRatio"
                  onChange={handleChange}
                  onBlur={onExternalWindowToWallRatioInputBlur}
                  inputProps={{
                    step: 0.01,
                    min: 0,
                    max: 1,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>

            </Grid>
          </Box>
          <Controller
            name={`externalRoofInsulationTypeId`}
            control={control}
            setValue={setValue}
            render={({
              field: { onChange },
              fieldState: { error },
            }) => (
              <FormControl className={classes.formControl}>
                <InputLabel id="external-roof-type-label" className={error && 'text-danger'}>{t('Roof Type')}</InputLabel>
                <Select
                  variant="standard"
                  id="external-roof-type-select"
                  labelId="external-roof-type-label"
                  error={!!error}
                  name="externalRoofInsulationTypeId"
                  onChange={(e) => {
                    onChange(e)
                    handleChange(e)
                  }}
                  value={envelopFacade.externalRoofInsulationTypeId}
                >
                  {RoofType.map((o) => (
                    <MenuItem
                      key={o.id}
                      value={o.id}
                    >
                      {t(o.name, {ns: "common"})}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
              </FormControl>
            )}
            rules={{
              required: t(`This field is required`),
            }}
          />
          <Controller
            name={`externalWindowInsulationTypeId`}
            control={control}
            setValue={setValue}
            render={({
              field: { onChange },
              fieldState: { error },
            }) => (
              <FormControl className={classes.formControl}>
                <InputLabel id="external-window-type-label" className={error && 'text-danger'}>
                  {t('External Window Insulation Type')}
                </InputLabel>
                <Select
                  id="external-window-type-select"
                  labelId="external-window-type-label"
                  name="externalWindowInsulationTypeId"
                  variant="standard"
                  onChange={(e) => {
                    onChange(e)
                    handleChange(e)
                  }}
                  error={!!error}
                  value={envelopFacade.externalWindowInsulationTypeId}
                >
                  {ExternalWindowType.map((o) => (
                    <MenuItem
                      key={o.id}
                      value={o.id}
                    >
                      {t(o.name, {ns: 'common'})}
                    </MenuItem>
                  ))}
                </Select>
                {error &&
                <FormHelperText className="text-danger">{t('This field is required')}</FormHelperText>}
              </FormControl>
            )}
            rules={{
              required: t(`This field is required`),
            }}
          />
        </div>

      </div>
    </form>
  )
}

export default EnvelopFacade

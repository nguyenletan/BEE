import React, { useEffect, useState } from 'react'
import StepNav from '../step-nav/StepNav'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Box, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, Slider, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import ExternalWindowType from '../../../reference-tables/ExternalWindowType'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { makeStyles } from '@material-ui/core/styles'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState, envelopFacadeState } from '../../../atoms'
import { Redirect, useParams } from 'react-router-dom'
import RoofType from '../../../reference-tables/RoofType'

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const EnvelopFacade = () => {
  const classes = makeStyles(() => (MaterialFormStyle))()

  const [envelopFacade, setEnvelopFacade] = useRecoilState(envelopFacadeState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isMovingNext, setIsMovingNext] = useState(false)

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
    setIsMovingNext(true)
  }

  const handleChange = (e) => {
    setEnvelopFacade({ ...envelopFacade, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setValue(`externalRoofInsulationTypeId`, envelopFacade.externalRoofInsulationTypeId)
    setValue(`externalWindowInsulationTypeId`, envelopFacade.externalWindowInsulationTypeId)
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
      {isMovingNext &&
      <Redirect to={moveNextUrl}/>}

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

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
              External Window to Wall Ratio
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
                <InputLabel id="external-roof-type-label" className={error && 'text-danger'}>Roof Type</InputLabel>
                <Select
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
                      {o.name}
                    </MenuItem>
                  ))}

                </Select>
                {error && <FormHelperText className="text-danger">The Roof Type is required</FormHelperText>}
              </FormControl>
            )}
            rules={{
              required: `The Roof Type is required`,
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
                  External Window Insulation Type
                </InputLabel>
                <Select
                  id="external-window-type-select"
                  labelId="external-window-type-label"
                  name="externalWindowInsulationTypeId"
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
                      {o.name}
                    </MenuItem>
                  ))}
                </Select>
                {error &&
                <FormHelperText className="text-danger">The External Window Insulation Type is required</FormHelperText>}
              </FormControl>
            )}
            rules={{
              required: `The External Window Insulation Type is required`,
            }}
          />
        </div>

      </div>
    </form>
  )
}

export default EnvelopFacade

import React, { useState } from 'react'
import StepNav from '../step-nav/StepNav'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import ExternalWallType from '../../../reference-tables/ExternalWallType'
import ExternalWindowType from '../../../reference-tables/ExternalWindowType'
import BackNextGroupButton from '../back-next-group-buttons/BackNextGroupButton'
import { makeStyles } from '@material-ui/core/styles'
import ExternalRoofType from '../../../reference-tables/ExternalRoofType'
import {
  DomesticGroundFloorInsulationType,
  NonDomesticGroundFloorInsulationType,
} from '../../../reference-tables/GroundFloorInsulationType'
import { useRecoilState } from 'recoil'
import {
  addingBuildingProgressState,
  envelopFacadeState,
} from '../../../atoms'
import { Redirect } from 'react-router-dom'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const EnvelopFacade = () => {
  const classes = makeStyles((theme) => (MaterialFormStyle))()

  const [envelopFacade, setEnvelopFacade] = useRecoilState(envelopFacadeState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isMovingNext, setIsMovingNext] = useState(false)

  const { handleSubmit } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      // buildingName: 'data?.buildingName',
      // postalCode:data?.postalCode,
      // address: data?.address,
      // city: data?.city,
      // countryCode: data?.countryCode,
      // state: data?.state
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const onExternalWindowToWallRatioSliderChange = (event, newValue) => {
    setEnvelopFacade({ ...envelopFacade, externalWindowToWallRatio: newValue })
  }

  const onExternalWindowToWallRatioInputBlur = () => {
    if (envelopFacade.externalWindowToWallRatio < 0) {
      setEnvelopFacade({ ...envelopFacade, externalWindowToWallRatio: 0 })
    } else if (envelopFacade.externalWindowToWallRatio > 1) {
      setEnvelopFacade({ ...envelopFacade, externalWindowToWallRatio: 1 })
    }
  }

  const onSubmit = (data) => {
    // console.log(data)
    setAddingBuildingProgressState(80)
    setIsMovingNext(true)
  }

  const onChange = (e) => {
    setEnvelopFacade({ ...envelopFacade, [e.target.name]: e.target.value })
  }

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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext &&
      <Redirect to="/adding-building/renewable-energy"/>}

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink="/adding-building/lighting"
          nextLink="/adding-building/renewable-energy"
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}/>

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
                  onChange={onChange}
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

          <FormControl className={classes.formControl}>
            <InputLabel id="external-roof-type-label">External Roof Insulation
              Type</InputLabel>
            <Select
              id="external-roof-type-select"
              labelId="external-roof-type-label"
              name="externalRoofInsulationTypeId"
              onChange={onChange}
              value={envelopFacade.externalRoofInsulationTypeId}
            >
              {ExternalRoofType.map((o) => (
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
            <InputLabel id="external-wall-type-label">External Wall Insulation
              Type</InputLabel>
            <Select
              id="external-wall-type-select"
              labelId="external-wall-type-label"
              name="externalWallInsulationTypeId"
              onChange={onChange}
              value={envelopFacade.externalWallInsulationTypeId}
            >
              {ExternalWallType.map((o) => (
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
            <InputLabel id="external-window-type-label">External Window
              Insulation Type</InputLabel>
            <Select
              id="external-window-type-select"
              labelId="external-window-type-label"
              name="externalWindowInsulationTypeId"
              onChange={onChange}
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
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="external-ground-floor-type-label">External Ground
              Floor
              Insulation Type</InputLabel>
            <Select
              id="external-ground-floor-type-select"
              labelId="external-ground-floor-type-label"
              name="externalGroundFloorInsulationTypeId"
              onChange={onChange}
              value={envelopFacade.externalGroundFloorInsulationTypeId}
            >
              <ListSubheader>Domestic/Residential (D)</ListSubheader>
              {DomesticGroundFloorInsulationType.map((o) => (
                <MenuItem
                  key={o.id}
                  value={o.id}
                >
                  {o.name}
                </MenuItem>
              ))}
              <ListSubheader>Non Domestic/Residential (N/D)</ListSubheader>
              {NonDomesticGroundFloorInsulationType.map((o) => (
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

      </div>
    </Form>
  )

}

export default EnvelopFacade
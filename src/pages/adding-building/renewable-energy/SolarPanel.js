import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { useRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import { Controller } from 'react-hook-form'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import { removeItemAtIndex, replaceItemAtIndex } from '../../../Utilities'
import { solarPanelSystemListState } from '../../../atoms'
import TrackingType from '../../../reference-tables/TrackingType'
import MountingType from '../../../reference-tables/MountingType'
import PVPanelType from '../../../reference-tables/PVPanelType'

const Title = styled.h6`

`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const Subtraction = styled.span`
  cursor: pointer;
  color: var(--bs-primary);
`
const Content = styled.div`

`
//
// const SpanId = styled.span`
//   color: var(--gray);
//   margin-left: .5em;
// `
const SolarPanel = ({ data, control, setValue }) => {
  const classes = makeStyles(() => (MaterialFormStyle))()

  const [solarSystemList, setSolarSystemList] = useRecoilState(
    solarPanelSystemListState)

  const [showInclineAngle, setShowInclineAngle] = React.useState(false)
  const [showOrientationAngle, setShowOrientationAngle] = React.useState(false)

  const handleInclineAngleSliderChange = (event, newValue) => {
    setInclineAngleValue(newValue)
  }

  const handleInclineAngleInputBlur = () => {
    if (data.inclineAngle < 0 || data.inclineAngle === '' || data.inclineAngle === null) {
      setInclineAngleValue(0)
    } else if (data.inclineAngle > 90) {
      setInclineAngleValue(90)
    }
  }

  const setOrientationAngleValue = (newValue) => {
    const index = solarSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(solarSystemList, index, {
      ...data,
      orientationAngle: newValue,
    })

    setSolarSystemList(newList)
  }

  const setInclineAngleValue = (newValue) => {
    const index = solarSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(solarSystemList, index, {
      ...data,
      inclineAngle: newValue,
    })

    setSolarSystemList(newList)
  }

  const setSystemLossValue = (newValue) => {
    const index = solarSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(solarSystemList, index, {
      ...data,
      systemLoss: newValue,
    })

    setSolarSystemList(newList)
  }

  const handleOrientationAngleSliderChange = (event, newValue) => {
    setOrientationAngleValue(newValue)
  }

  const handleOrientationAngleInputBlur = () => {
    if (data.orientationAngle < -180 || data.orientationAngle === '' || data.orientationAngle === null) {
      setOrientationAngleValue(-180)
    } else if (data.orientationAngle > 180) {
      setOrientationAngleValue(180)
    }
  }

  const handleSystemLossValueSliderChange = (event, newValue) => {
    setSystemLossValue(newValue)
  }

  const handleSetSystemLossValueInputBlur = () => {
    if (data.systemLoss < 0 || data.systemLoss === '' || data.systemLoss === null) {
      setSystemLossValue(0)
    } else if (data.systemLoss > 100) {
      setSystemLossValue(100)
    }
  }

  const handleChange = (e) => {
    const index = solarSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(solarSystemList, index, {
      ...data,
      [e.target.name]: e.target.value,
    })

    setSolarSystemList(newList)
  }

  useEffect(() => {
    if (data.trackingTypeId === 1) {
      setShowInclineAngle(true)
      setShowOrientationAngle(true)
    } else if (data.trackingTypeId === 2) {
      setShowInclineAngle(true)
      setShowOrientationAngle(false)
    } else if (data.trackingTypeId === 3) {
      setShowInclineAngle(false)
      setShowOrientationAngle(true)
    } else {
      setShowInclineAngle(false)
      setShowOrientationAngle(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.trackingTypeId])

  useEffect(() => {
    setValue(`installedCapacity${data.id}`, data.installedCapacity)
    setValue(`trackingTypeId${data.id}`, data.trackingTypeId)
    setValue(`pv-tech-choice-label${data.id}`, data.pvTechChoiceId)
    setValue(`mountingTypeId${data.id}`, data.mountingTypeId)
  }, [data.id, data.installedCapacity, data.mountingTypeId, data.pvTechChoiceId, data.trackingTypeId, setValue])

  const onRemoveItem = () => {
    const index = solarSystemList.findIndex(
      (listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(solarSystemList, index)
    setSolarSystemList(newList)
  }
  return (

    <div className="px-4 py-3 border rounded shadow-sm">
      <Header>
        <Title>{data.title}</Title>
        <Subtraction title="Remove Item" onClick={onRemoveItem}>
          <i className="bi bi-dash-lg"/>
        </Subtraction>
      </Header>
      <Content>

        <Controller
          name={`installedCapacity${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <TextField
                type="number"
                label="Installed Capacity (kWp)"
                name={`installedCapacity`}
                value={data.installedCapacity}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
                error={!!error}
                helperText={error ? error.message : null}
              />
            </FormControl>
          )}
          rules={{
            required: `The Installed Capacity is required`,
            min: { value: 0, message: 'The value should be >= 0' },
          }}
        />

        <Controller
          name={`trackingTypeId${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`tracking-type-label${data.id}`} className={error && 'text-danger'}>Tracking Type</InputLabel>
              <Select
                labelId={`tracking-type-label${data.id}`}
                name="trackingTypeId"
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
                error={!!error}
                value={data.trackingTypeId}
              >
                {TrackingType.map((o) => (
                  <MenuItem
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText className="text-danger">The Tracking Type is required</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: `The Tracking Type is required`,
          }}
        />

        {showInclineAngle && <Box component="div" mb={1} mt={2}>
          <Typography gutterBottom color="primary">Incline Angle (degrees from horizontal)</Typography>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs>
              <Slider
                min={0}
                max={90}
                marks={[
                  {
                    value: 0,
                    label: 0,
                  },
                  {
                    value: 45,
                    label: 45,
                  },
                  {
                    value: 90,
                    label: 90,
                  }]}
                step={1}
                value={data.inclineAngle}
                onChange={handleInclineAngleSliderChange}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item>
              <Input
                value={data.inclineAngle}
                margin="dense"
                name="inclineAngle"
                onChange={handleChange}
                onBlur={handleInclineAngleInputBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 90,
                  type: 'number',
                }}
              />
            </Grid>
          </Grid>
        </Box>}

        {showOrientationAngle && <Box component="div" mb={1} mt={2}>
          <Typography gutterBottom color="primary">Orientation Angle (degrees from South)</Typography>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs>
              <Slider
                min={-180}
                max={180}
                marks={[
                  {
                    value: -180,
                    label: -180,
                  },
                  {
                    value: 0,
                    label: 0,
                  },
                  {
                    value: 180,
                    label: 180,
                  }]}
                step={1}
                value={data.orientationAngle}
                onChange={handleOrientationAngleSliderChange}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item>
              <Input
                value={data.orientationAngle}
                margin="dense"
                name="orientationAngle"
                onChange={handleChange}
                onBlur={handleOrientationAngleInputBlur}
                inputProps={{
                  step: 1,
                  min: -180,
                  max: 180,
                  type: 'number',
                }}
              />
            </Grid>
          </Grid>
        </Box>}

        <Box component="div" mb={1} mt={2}>
          <Typography gutterBottom color="primary">System Loss (%)</Typography>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs>
              <Slider
                min={0}
                max={100}
                marks={[
                  {
                    value: 0,
                    label: 0,
                  },
                  {
                    value: 50,
                    label: 50,
                  },
                  {
                    value: 100,
                    label: 100,
                  },
                ]}
                step={1}
                value={data.systemLoss}
                onChange={handleSystemLossValueSliderChange}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item>
              <Input
                value={data.systemLoss}
                name="systemLoss"
                margin="dense"
                onChange={handleChange}
                onBlur={handleSetSystemLossValueInputBlur}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: 'number',
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Controller
          name={`pvTechChoiceId${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`pv-tech-choice-label${data.id}`} className={error && 'text-danger'}>
                P.V. Panel Type
              </InputLabel>
              <Select
                labelId={`pv-tech-choice-label${data.id}`}
                name="pvTechChoiceId"
                value={data.pvTechChoiceId}
                error={!!error}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
              >
                {PVPanelType.map((o) => (
                  <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
                ))}
              </Select>
              {error && <FormHelperText className="text-danger">The Tracking Type is required</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: `The P.V. Panel Type is required`,
          }}
        />

        <Controller
          name={`mountingTypeId${data.id}`}
          control={control}
          setValue={setValue}
          render={({
            field: { onChange },
            fieldState: { error },
          }) => (
            <FormControl className={classes.formControl}>
              <InputLabel id={`mounting-type-label${data.id}`} className={error && 'text-danger'}>
                Mounting Type
              </InputLabel>
              <Select
                labelId={`mounting-type-label${data.id}`}
                name="mountingTypeId"
                value={data.mountingTypeId}
                onChange={(e) => {
                  onChange(e)
                  handleChange(e)
                }}
              >
                {MountingType.map((o) => (
                  <MenuItem
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </MenuItem>
                ))}
              </Select>
              {error && <FormHelperText className="text-danger">The Mounting Type is required</FormHelperText>}
            </FormControl>
          )}
          rules={{
            required: `The Mounting Type is required`,
          }}
        />
      </Content>
    </div>

  )
}

export default SolarPanel

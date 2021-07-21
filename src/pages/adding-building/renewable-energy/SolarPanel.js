import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Box,
  Fade,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Slider,
  TextField,
  Typography
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { useRecoilState } from 'recoil'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'

import MaterialFormStyle from '../../../style/MaterialFormStyle'
import PVTechChoiceType from '../../../reference-tables/PVTechChoiceType'
import { removeItemAtIndex, replaceItemAtIndex } from '../../../Utilities'
import { solarPanelSystemListState } from '../../../atoms'
import TrackingType from '../../../reference-tables/TrackingType'
import MountingType from '../../../reference-tables/MountingType'

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

const SpanId = styled.span`
  color: var(--gray);
  margin-left: .5em;
`
const SolarPanel = ({ data }) => {
  const classes = makeStyles((theme) => (MaterialFormStyle))()

  const [solarSystemList, setSolarSystemList] = useRecoilState(
    solarPanelSystemListState)

  const [showInclineAngle, setShowInclineAngel] = React.useState(false)
  const [showOrientationAngle, setShowOrientationAngle] = React.useState(false)

  const handleInclineAngleSliderChange = (event, newValue) => {
    setInclineAngleValue(newValue)
  }

  const handleInclineAngleInputBlur = () => {
    if (data.inclineAngle < 0) {
      setInclineAngleValue(0)
    } else if (data.inclineAngle > 90) {
      setInclineAngleValue(90)
    }
  }

  const setOrientationAngleValue = (newValue) => {
    const index = solarSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(solarSystemList, index, {
      ...data,
      orientationAngle: newValue
    })

    setSolarSystemList(newList)
  }

  const setInclineAngleValue = (newValue) => {
    const index = solarSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(solarSystemList, index, {
      ...data,
      inclineAngle: newValue
    })

    setSolarSystemList(newList)
  }

  const setSystemLossValue = (newValue) => {
    const index = solarSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(solarSystemList, index, {
      ...data,
      systemLoss: newValue
    })

    setSolarSystemList(newList)
  }

  const handleOrientationAngleSliderChange = (event, newValue) => {
    setOrientationAngleValue(newValue)
  }

  const handleOrientationAngleInputBlur = () => {
    if (data.orientationAngle < -180) {
      setOrientationAngleValue(-180)
    } else if (data.orientationAngle > 180) {
      setOrientationAngleValue(180)
    }
  }

  const handleSystemLossValueSliderChange = (event, newValue) => {
    setSystemLossValue(newValue)
  }

  const handleSetSystemLossValueInputBlur = () => {
    if (data.systemLoss < 0) {
      setSystemLossValue(0)
    } else if (data.systemLoss > 100) {
      setSystemLossValue(100)
    }
  }

  const onChange = (e) => {
    const index = solarSystemList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(solarSystemList, index, {
      ...data,
      [e.target.name]: e.target.value
    })

    setSolarSystemList(newList)
  }

  useEffect(() => {
    if (data.trackingTypeId === 1) {
      setShowInclineAngel(true)
      setShowOrientationAngle(true)
    } else if (data.trackingTypeId === 2) {
      setShowInclineAngel(true)
      setShowOrientationAngle(false)
    } else if (data.trackingTypeId === 3) {
      setShowInclineAngel(false)
      setShowOrientationAngle(true)
    } else {
      setShowInclineAngel(false)
      setShowOrientationAngle(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.trackingTypeId])

  const onRemoveItem = () => {
    const index = solarSystemList.findIndex(
      (listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(solarSystemList, index)
    setSolarSystemList(newList)
  }
  return (
    <Fade in timeout={500}>
      <Paper elevation={3} className='px-4 py-3'>
        <Header>
          <Title>{data.title}<SpanId>{data.id}</SpanId></Title>
          <Subtraction title='Remove Item' onClick={onRemoveItem}><i
            className='bi bi-dash-lg'
                                                                  />
          </Subtraction>
        </Header>
        <Content>

          <FormControl className={classes.formControl}>
            <TextField
              type='number'
              label='Installed Capacity (kWp)'
              name='installedCapacity'
              value={data.installedCapacity}
              onChange={onChange}
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id='tracking-type-label'>Tracking Type</InputLabel>
            <Select
              labelId='tracking-type-label'
              id='tracking-type-select'
              name='trackingTypeId'
              onChange={onChange}
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
          </FormControl>

          {showInclineAngle && <Box component='div' mb={1} mt={2}>
            <Typography gutterBottom color='primary'>Incline Angle</Typography>
            <Grid container spacing={2} alignItems='flex-start'>
              <Grid item xs>
                <Slider
                  min={0}
                  max={90}
                  marks={[
                    {
                      value: 0,
                      label: 0
                    },
                    {
                      value: 45,
                      label: 45
                    },
                    {
                      value: 90,
                      label: 90
                    }]}
                  step={1}
                  value={data.inclineAngle}
                  onChange={handleInclineAngleSliderChange}
                  valueLabelDisplay='auto'
                />
              </Grid>
              <Grid item>
                <Input
                  value={data.inclineAngle}
                  margin='dense'
                  name='inclineAngle'
                  onChange={onChange}
                  onBlur={handleInclineAngleInputBlur}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 90,
                    type: 'number'
                  }}
                />
              </Grid>
            </Grid>
          </Box>}

          {showOrientationAngle && <Box component='div' mb={1} mt={2}>
            <Typography gutterBottom color='primary'>Orientation
              Angle
            </Typography>
            <Grid container spacing={2} alignItems='flex-start'>
              <Grid item xs>
                <Slider
                  min={-180}
                  max={180}
                  marks={[
                    {
                      value: -180,
                      label: -180
                    },
                    {
                      value: 0,
                      label: 0
                    },
                    {
                      value: 180,
                      label: 180
                    }]}
                  step={1}
                  value={data.orientationAngle}
                  onChange={handleOrientationAngleSliderChange}
                  valueLabelDisplay='auto'
                />
              </Grid>
              <Grid item>
                <Input
                  value={data.orientationAngle}
                  margin='dense'
                  name='orientationAngle'
                  onChange={onChange}
                  onBlur={handleOrientationAngleInputBlur}
                  inputProps={{
                    step: 1,
                    min: -180,
                    max: 180,
                    type: 'number'
                  }}
                />
              </Grid>
            </Grid>
          </Box>}
          <Box component='div' mb={1} mt={2}>
            <Typography gutterBottom color='primary'>System Loss
              (%)
            </Typography>
            <Grid container spacing={2} alignItems='flex-start'>
              <Grid item xs>
                <Slider
                  min={0}
                  max={100}
                  marks={[
                    {
                      value: 0,
                      label: 0
                    },
                    {
                      value: 50,
                      label: 50
                    },
                    {
                      value: 100,
                      label: 100
                    }
                  ]}
                  step={1}
                  value={data.systemLoss}
                  onChange={handleSystemLossValueSliderChange}
                  valueLabelDisplay='auto'
                />
              </Grid>
              <Grid item>
                <Input
                  value={data.systemLoss}
                  name='systemLoss'
                  margin='dense'
                  onChange={onChange}
                  onBlur={handleSetSystemLossValueInputBlur}
                  inputProps={{
                    step: 1,
                    min: 0,
                    max: 100,
                    type: 'number'
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <FormControl className={classes.formControl}>
            <InputLabel id='pv-tech-choice-label'>PV Tech Choice</InputLabel>
            <Select
              labelId='pv-tech-choice-type-label'
              id='pv-tech-choice-type-select'
              name='pvTechChoiceId'
              value={data.pvTechChoiceId}
              onChange={onChange}
            >
              {PVTechChoiceType.map((o) => (
                <MenuItem key={o.id} value={o.id}>{o.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id='mounting-type-label'>Mounting Type</InputLabel>
            <Select
              labelId='mounting-type-label'
              id='mounting-type-select'
              name='mountingTypeId'
              value={data.mountingTypeId}
              onChange={onChange}
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
          </FormControl>
        </Content>
      </Paper>
    </Fade>

  )
}

export default SolarPanel

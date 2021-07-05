import React from 'react'
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
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Select from '@material-ui/core/Select'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import PVTechChoiceType from '../../../reference-tables/PVTechChoiceType'
import { removeItemAtIndex } from '../../../Utilities'
import { useRecoilState } from 'recoil'
import { solarPanelSystemListState } from '../../../atoms'
import Grid from '@material-ui/core/Grid'
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
  const [solarSystemList, setSolarSystemList] = useRecoilState(
    solarPanelSystemListState)
  const classes = makeStyles((theme) => (MaterialFormStyle))()

  const [inclineAngleValue, setInclineAngleValue] = React.useState(0)

  const handleInclineAngleSliderChange = (event, newValue) => {
    setInclineAngleValue(newValue)
  }

  const handleInclineAngleInputChange = (event) => {
    setInclineAngleValue(
      event.target.value === '' ? '' : Number(event.target.value))
  }

  const handleInclineAngleInputBlur = () => {
    if (inclineAngleValue < 0) {
      setInclineAngleValue(0)
    } else if (inclineAngleValue > 90) {
      setInclineAngleValue(90)
    }
  }

  const [orientationAngleValue, setOrientationAngleValue] = React.useState(0)

  const handleOrientationAngleSliderChange = (event, newValue) => {
    setOrientationAngleValue(newValue)
  }

  const handleOrientationAngleInputChange = (event) => {
    setOrientationAngleValue(
      event.target.value === '' ? '' : Number(event.target.value))
  }

  const handleOrientationAngleInputBlur = () => {
    if (orientationAngleValue < -180) {
      setOrientationAngleValue(-180)
    } else if (orientationAngleValue > 180) {
      setOrientationAngleValue(180)
    }
  }

  const [systemLossValue, setSystemLossValue] = React.useState(14)

  const handleSystemLossValueSliderChange = (event, newValue) => {
    setSystemLossValue(newValue)
  }

  const handleSystemLossValueInputChange = (event) => {
    setSystemLossValue(
      event.target.value === '' ? '' : Number(event.target.value))
  }

  const handleSetSystemLossValueInputBlur = () => {
    if (systemLossValue < 0) {
      setSystemLossValue(0)
    } else if (systemLossValue > 100) {
      setSystemLossValue(100)
    }
  }

  const onRemoveItem = () => {
    const index = solarSystemList.findIndex(
      (listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(solarSystemList, index)
    setSolarSystemList(newList)
  }
  return (

    <Fade in={true} timeout={500}>
      <Paper elevation={3} className="px-4 py-3">
        <Header>
          <Title>{data.title}<SpanId>{data.id}</SpanId></Title>
          <Subtraction title="Remove Item" onClick={onRemoveItem}><i
            className="bi bi-dash-lg"/></Subtraction>
        </Header>
        <Content>

          <FormControl className={classes.formControl}>
            <TextField type="number" label="Installed Capacity (kWh)"/>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="tracking-type-label">Tracking Type</InputLabel>
            <Select
              labelId="tracking-type-label"
              id="tracking-type-select"
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
          <Box component="div" mb={1} mt={2}>
            <Typography gutterBottom color="primary">Incline Angle</Typography>
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
                  value={typeof inclineAngleValue === 'number'
                    ? inclineAngleValue
                    : 0}
                  onChange={handleInclineAngleSliderChange}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item>
                <Input
                  value={inclineAngleValue}
                  margin="dense"
                  onChange={handleInclineAngleInputChange}
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
          </Box>
          <Box component="div" mb={1} mt={2}>
            <Typography gutterBottom color="primary">Orientation
              Angle</Typography>
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
                  value={typeof orientationAngleValue === 'number'
                    ? orientationAngleValue
                    : 0}
                  onChange={handleOrientationAngleSliderChange}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item>
                <Input
                  value={orientationAngleValue}
                  margin="dense"
                  onChange={handleOrientationAngleInputChange}
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
          </Box>
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
                  value={typeof systemLossValue === 'number'
                    ? systemLossValue
                    : 0}
                  onChange={handleSystemLossValueSliderChange}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item>
                <Input
                  value={systemLossValue}
                  margin="dense"
                  onChange={handleSystemLossValueInputChange}
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
          <FormControl className={classes.formControl}>
            <InputLabel id="pv-tech-choice-label">PV Tech Choice</InputLabel>
            <Select
              labelId="pv-tech-choice-type-label"
              id="pv-tech-choice-type-select"
            >
              {PVTechChoiceType.map((o) => (
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
            <InputLabel id="mounting-type-label">Mounting Type</InputLabel>
            <Select
              labelId="mounting-type-label"
              id="mounting-type-select"
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
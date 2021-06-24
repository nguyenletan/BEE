import React from 'react'
import { Link } from 'react-router-dom'
import StepNav from '../step-nav/StepNav'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import ExternalWallType from '../../../reference-tables/ExternalWallType'
import ExternalWindowType from '../../../reference-tables/ExternalWindowType'

const Form = styled.form`

`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const EnvelopFacade = () => {
  const classes = MaterialFormStyle()

  const onSubmit = (data) => {
    // console.log(data)
    // console.log(image)
  }

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

  const [value, setValue] = React.useState(0.7)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value))
  }

  const handleBlur = () => {
    if (value < 0) {
      setValue(0)
    } else if (value > 1) {
      setValue(1)
    }
  }

  const marks = [
    {
      value: 0,
      label: 0
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
      label: 0.5
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
      label: 1
    },
  ]

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <div className="form-group ms-auto">
          <Link to="/adding-building/search-building">
            <button type="button"
                    className="btn btn-outline-primary me-1">&lt; Back
            </button>
          </Link>
          <Link to="/adding-building/electricity-consumption">
            <button type="submit"
                    className="btn btn-primary">Next &gt;</button>
          </Link>
        </div>
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
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item>
                <Input
                  value={value}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
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
            >
              <MenuItem>External Roof Type1</MenuItem>
              <MenuItem>External Roof Type2</MenuItem>
              <MenuItem>External Roof Type3</MenuItem>

            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel id="external-wall-type-label">External Wall Insulation
              Type</InputLabel>
            <Select
              id="external-wall-type-select"
              labelId="external-wall-type-label"
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
            <InputLabel id="external-ground-type-label">External Ground
              Insulation Type</InputLabel>
            <Select
              id="external-ground-type-select"
              labelId="external-ground-type-label"
            >
              <MenuItem>External Ground Insulation Type 1</MenuItem>
              <MenuItem>External Ground Insulation Type 2</MenuItem>
              <MenuItem>External Ground Insulation Type 3</MenuItem>
            </Select>
          </FormControl>

        </div>

      </div>
    </Form>
  )

}

export default EnvelopFacade
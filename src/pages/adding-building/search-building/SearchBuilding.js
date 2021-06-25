import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { getLatLngFromAddress } from '../../../Utilities'
import { BuildingInformationContext } from '../AddingBuilding'
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api'
import { Redirect } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Form } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'

import Countries, { findCountryByCountryCode } from '../../../reference-tables/Country'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper, Select,
  TextField,
} from '@material-ui/core'
import MaterialFormStyle from '../../../style/MaterialFormStyle'

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 1em;
`

const SearchBuilding = () => {
  const mapStyles = {
    height: '493px',
    width: '100%',
  }

  const divStyle = {
    width: 'auto',
    maxWidth: '180px',
    height: 'auto',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: '#303246',
    color: '#F9F3F2',
    padding: '10px',
    marginLeft: '-82px',
    marginTop: '-100px',
    borderRadius: '10px',
    opacity: 0.8,
  }

  const classes = MaterialFormStyle()

  const [searchValue, setSearchValue] = useState('')

  const [isMovingNext, setIsMovingNext] = useState(false)

  const [buildingInformationContext, setBuildingInformationContext] = useContext(
    BuildingInformationContext)

  const onSearch = async () => {
    console.log(searchValue)
    const result = await getLatLngFromAddress(searchValue?.value?.description)

    let information = {
      buildingName: searchValue?.value?.structured_formatting?.main_text,
      address: '',
      city: '',
      state: '',
      countryCode: '',
      suburb: '',
      postalCode: '',
      location: result?.results[0]?.geometry?.location,
      formatted_address: result?.results[0]?.formatted_address,
    }
    for (let item of result?.results[0]?.address_components) {
      if (item.types.includes('street_number') ||
        item.types.includes('route')) {
        information.address += item.long_name + ' '
      } else if (item.types.includes('postal_town') ||
        item.types.includes('locality')) {
        information.city += item.long_name
      } else if (item.types.includes('country')) {
        const country = findCountryByCountryCode(item.short_name)
        information.countryCode = country.alpha2Code

      } else if (item.types.includes('postal_code')) {
        information.postalCode += item.long_name
      } else if (item.types.includes('administrative_area_level_1')) {
        information.state += item.long_name
      } else if (item.types.includes('administrative_area_level_2')) {
        information.suburb += item.long_name
      }

    }

    setBuildingInformationContext(information)

    setValue('address', information?.address, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('city', information?.city, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('state', information?.state, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('countryCode', information?.countryCode, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('postalCode', information?.postalCode, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('buildingName', information?.buildingName, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const DropdownIndicator = (props) => {
    return (
      <div {...props}/>
    )
  }

  const NoOptionsMessage = props => {
    return (
      <div content="Custom NoOptionsMessage Component"
           className="text-secondary px-2 py-1">
        <span {...props}>No suggestion</span>
      </div>
    )
  }

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
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
    spaceUsageGFA: [{}],
  })

  const onSubmit = (data) => {
    console.log(data)
    console.log(buildingInformationContext)
    setBuildingInformationContext({ ...buildingInformationContext, ...data })
    setIsMovingNext(true)
  }

  return (
    <>

      <Title>Search Online</Title>

      {isMovingNext && <Redirect to="/adding-building/general-information"/>}

      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="row">

            <div className="form-group col-12 col-lg-12 ms-0">
              <label htmlFor="building-name">Enter Building Name or
                Address</label>
              <div className="d-flex">
                <div className="w-75 me-1">
                  <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    debounce={300}
                    minLengthAutocomplete={1}
                    selectProps={{
                      components: { DropdownIndicator, NoOptionsMessage },
                      isMulti: false,
                      isClearable: true,
                      searchValue,
                      onChange: setSearchValue,
                      placeholder: 'Building name or Address',

                    }}
                  />
                </div>
                <Button variant="contained" color="primary" onClick={onSearch}>
                  Search
                </Button>

              </div>
            </div>

          </div>

          {buildingInformationContext &&
          <div className="row mt-3 mb-5">
            <div className="col-12 col-lg-12">
              {/*<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>*/}
              <Paper elevation={3}>
                <GoogleMap mapContainerStyle={mapStyles} zoom={18}
                           center={buildingInformationContext.location}>
                  <OverlayView position={buildingInformationContext.location}
                               mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div
                      style={divStyle}>{buildingInformationContext.formatted_address}</div>
                  </OverlayView>
                  <Marker
                    position={buildingInformationContext.location}
                    title={searchValue}
                    zIndex={1}>
                  </Marker>
                </GoogleMap>
                {/*</LoadScript>*/}
              </Paper>
            </div>
          </div>
          }
        </div>

        {buildingInformationContext &&
        <div className="col-12 col-lg-5">

          <Form onSubmit={handleSubmit(onSubmit)}>

            <h5 className="text-primary">Is the information correct?</h5>

            <Button type="submit" variant="contained"
                    color="primary" className="mb-3 mt-2">Yes</Button>

            <FormControl className={classes.formControl}>
              <Controller
                name="buildingName"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Building Name"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Building Name required' }}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <Controller
                control={control}
                name="address"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Address"
                    aria-describedby="Address"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
                rules={{ required: 'Building Name required' }}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <Controller
                name="postalCode"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    label="Postal Code"
                    aria-describedby="Postal Code"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <Controller
                name="city"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    aria-describedby="City"
                    label="City"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </FormControl>

            <FormControl className={classes.formControl}>
              <Controller
                name="state"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    aria-describedby="State"
                    label="State"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </FormControl>


            <Controller
              name="country"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select labelId="country-label">
                    {Countries.map((o) => (
                      <MenuItem
                        key={o.alpha2Code}
                        value={o.alpha2Code}
                        onChange={onChange}
                      >
                        {o.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Form>

        </div>}
      </div>
    </>
  )
}

export default SearchBuilding
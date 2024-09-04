import React, { useEffect, useState, useMemo } from 'react'
import styled from '@emotion/styled'
import { getLatLngFromAddress } from 'Utilities'
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Controller, useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { useTranslation } from 'react-i18next'
import { useAuth } from 'AuthenticateProvider'
import { Button, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material'

import Countries, { findCountryByCountryCode } from '../../../reference-tables/Country'
import StepNav from '../step-nav/StepNav'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { addingBuildingProgressState, generalBuildingInformationState } from 'atoms'
import { trackingUser } from 'api/UserAPI'

const Title = styled.h2`
  color: ${props => props.theme.palette.primary.main};
  font-weight: 500;
  margin-bottom: 0;
`

const FormControlStyled = styled(FormControl)`
  width: 100%;
  margin-bottom: 1rem;
`

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

const SearchBuilding = () => {
  const { t } = useTranslation('buildingInput')
  const { user } = useAuth()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const [generalBuildingInformation, setGeneralBuildingInformation] = useRecoilState(generalBuildingInformationState)
  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(addingBuildingProgressState)
  const [isShowTheMap, setIsShowTheMap] = useState(false)

  const { control, handleSubmit, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: {},
  })

  const setValueToForm = (information) => {
    Object.entries(information).forEach(([key, value]) => setValue(key, value))
  }

  const onSearch = async () => {
    if (!searchValue?.value?.description) return

    const result = await getLatLngFromAddress(searchValue.value.description)
    if (!result?.results?.[0]) return

    const information = parseAddressComponents(result.results[0])
    setGeneralBuildingInformation({ ...generalBuildingInformation, ...information })
    setValueToForm(information)
    setIsShowTheMap(true)
  }

  const parseAddressComponents = (result) => {
    const information = {
      buildingName: searchValue?.value?.structured_formatting?.main_text,
      address: '',
      city: '',
      state: '',
      countryCode: '',
      suburb: '',
      postalCode: '',
      location: result.geometry?.location,
      formatted_address: result.formatted_address,
      streetNumber: result.formatted_address,
    }

    result.address_components.forEach(component => {
      const { long_name, short_name, types } = component
      if (types.includes('street_number')) information.streetNumber = long_name
      if (types.includes('route')) information.streetName = long_name
      if (types.includes('street_number') || types.includes('route')) information.address += long_name + ' '
      if (types.includes('postal_town') || types.includes('locality')) information.city += long_name
      if (types.includes('country')) information.countryCode = findCountryByCountryCode(short_name).alpha2Code
      if (types.includes('postal_code')) information.postalCode += long_name
      if (types.includes('administrative_area_level_1')) information.state += long_name
      if (types.includes('administrative_area_level_2')) information.suburb += long_name
    })

    return information
  }

  useEffect(() => {
    setValueToForm(generalBuildingInformation)
    const tracking = async () => {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'SearchBuilding', idToken)
    }
    tracking()
  }, [])

  const onSubmit = (data) => {
    setGeneralBuildingInformation({ ...generalBuildingInformation, ...data })
    setAddingBuildingProgressState(5)
    navigate('/adding-building/general-information')
  }

  const DropdownIndicator = useMemo(() => props => <div {...props} />, [])
  const NoOptionsMessage = useMemo(() => props => (
    <div className="text-secondary px-2 py-1">
      <span {...props}>No suggestion</span>
    </div>
  ), [])

  return (
    <>
      <div className="d-flex mt-5 mb-4">
        <Title>{t('Search Online')}</Title>
        <BackNextGroupButton
          noNextLink={true}
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />
      </div>

      <StepNav />

      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="row">
            <div className="form-group col-12 col-lg-12 ms-0">
              <label htmlFor="building-name">{t('Enter Building Name or Address')}</label>
              <div className="d-flex">
                <div className="w-75 me-1">
                  <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    debounce={300}
                    minLengthAutocomplete={1}
                    selectProps={{
                      components: {
                        DropdownIndicator,
                        NoOptionsMessage,
                      },
                      isMulti: false,
                      isClearable: true,
                      searchValue,
                      onChange: setSearchValue,
                      placeholder: t('Building Name or Address'),
                    }}
                  />
                </div>
                <Button variant="contained" color="primary" onClick={onSearch}>
                  {t('Search')}
                </Button>
              </div>
            </div>
          </div>

          {isShowTheMap && (
            <div className="row mt-3 mb-5">
              <div className="col-12 col-lg-12">
                <div className="shadow-sm rounded">
                  <GoogleMap mapContainerStyle={mapStyles} zoom={18} center={generalBuildingInformation.location}>
                    <OverlayView position={generalBuildingInformation.location} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                      <div style={divStyle}>{generalBuildingInformation.formatted_address}</div>
                    </OverlayView>
                    <Marker position={generalBuildingInformation.location} title={searchValue} zIndex={1}></Marker>
                  </GoogleMap>
                </div>
              </div>
            </div>
          )}
        </div>

        {isShowTheMap && (
          <div className="col-12 col-lg-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h5 className="text-primary">{t('Is the information correct?')}</h5>

              <Button type="submit" variant="contained" color="primary" className="mb-3 mt-2">
                {t('Yes')}
              </Button>

              <FormControlStyled>
                <Controller
                  name="buildingName"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      variant="standard"
                      label={t('Building Name')}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </FormControlStyled>

              <FormControlStyled>
                <Controller
                  name="streetNumber"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      variant="standard"
                      label={t('Building Number')}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </FormControlStyled>

              <FormControlStyled>
                <Controller
                  name="streetName"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      variant="standard"
                      label={t('Street Name')}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </FormControlStyled>

              <FormControlStyled>
                <Controller
                  control={control}
                  name="address"
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      variant="standard"
                      label={t('Address')}
                      aria-describedby="Address"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </FormControlStyled>

              <FormControlStyled>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      variant="standard"
                      label={t('Post Code')}
                      aria-describedby="Postal Code"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </FormControlStyled>

              <FormControlStyled>
                <Controller
                  name="city"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      variant="standard"
                      aria-describedby="City"
                      label={t('City')}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </FormControlStyled>

              <FormControlStyled>
                <Controller
                  name="state"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      variant="standard"
                      aria-describedby="State"
                      label={t('State')}
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                />
              </FormControlStyled>

              <Controller
                name="countryCode"
                control={control}
                render={({ field }) => (
                  <FormControlStyled>
                    <InputLabel id="country-label">{t('Country')}</InputLabel>
                    <NativeSelect labelId="country-label" name="countryCode" value={field.value} {...field}>
                      {Countries.map((o) => (
                        <option key={o.alpha2Code} value={o.alpha2Code}>
                          {o.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControlStyled>
                )}
              />
            </form>
          </div>
        )}
      </div>
    </>
  )
}

export default SearchBuilding

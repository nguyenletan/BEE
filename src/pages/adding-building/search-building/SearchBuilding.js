import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getLatLngFromAddress } from 'Utilities'
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import { Controller, useForm } from 'react-hook-form'

import Countries, { findCountryByCountryCode } from '../../../reference-tables/Country'
import { Button, FormControl, InputLabel, NativeSelect, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'

import MaterialFormStyle from '../../../style/MaterialFormStyle'
import StepNav from '../step-nav/StepNav'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState, generalBuildingInformationState } from 'atoms'
import { useTranslation } from 'react-i18next'
import { trackingUser } from 'api/UserAPI'
import { useAuth } from 'AuthenticateProvider'

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
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

  const { t } = useTranslation('buildingInput')
  const { user } = useAuth()
  const navigate = useNavigate()
  const classes = makeStyles(() => (MaterialFormStyle))()

  const [searchValue, setSearchValue] = useState('')

  const [generalBuildingInformation, setGeneralBuildingInformation] = useRecoilState(
    generalBuildingInformationState)
  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [isShowTheMap, setIsShowTheMap] = useState(false)

  const setValueToForm = (information) => {
    setValue('streetNumber', information?.streetNumber)
    setValue('streetName', information?.streetName)
    setValue('address', information?.address)
    setValue('city', information?.city)
    setValue('state', information?.state)
    setValue('countryCode', information?.countryCode)
    setValue('postalCode', information?.postalCode)
    setValue('buildingName', information?.buildingName)
  }

  const onSearch = async () => {
    const result = await getLatLngFromAddress(searchValue?.value?.description)

    //console.log(result)

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
      streetNumber: result?.results[0]?.formatted_address,
      // address_components: result?.results[0]?.address_components,
    }
    for (let item of result?.results[0]?.address_components) {
      if(item.types.includes('street_number')) {
        information.streetNumber = item.long_name
      }
      if(item.types.includes('route')) {
        information.streetName = item.long_name
      }
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

    setGeneralBuildingInformation({ ...generalBuildingInformation, ...information })
    setValueToForm(information)
    setIsShowTheMap(true)
  }

  useEffect(() => {
    setValueToForm(generalBuildingInformation)

    async function tracking() {
      const idToken = await user.getIdToken()
      trackingUser(user.uid, 'SearchBuilding', idToken)
    }
    tracking()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    spaceUsageGFA: [{}],
  })

  const onSubmit = (data) => {
    // console.log(data)
    // console.log(generalBuildingInformation)
    setGeneralBuildingInformation({ ...generalBuildingInformation, ...data })
    setAddingBuildingProgressState(5)
    navigate('/adding-building/general-information')
  }

  return (
    <>
      <div className="d-flex mt-5 mb-4">

        <Title>{t('Search Online')}</Title>

        <BackNextGroupButton
          noNextLink={true}
          //nextLink="/adding-building/general-information"
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav/>

      <div className="row">
        <div className="col-12 col-lg-7">
          <div className="row">

            <div className="form-group col-12 col-lg-12 ms-0">
              <label htmlFor="building-name">
                {t('Enter Building Name or Address')}</label>
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

          {isShowTheMap &&
          <div className="row mt-3 mb-5">
            <div className="col-12 col-lg-12">

              <div className="shadow-sm rounded">
                {/*<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>*/}
                <GoogleMap mapContainerStyle={mapStyles} zoom={18}
                           center={generalBuildingInformation.location}>
                  <OverlayView position={generalBuildingInformation.location}
                               mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                    <div
                      style={divStyle}>{generalBuildingInformation.formatted_address}</div>
                  </OverlayView>
                  <Marker
                    position={generalBuildingInformation.location}
                    title={searchValue}
                    zIndex={1}>
                  </Marker>
                </GoogleMap>
                {/*</LoadScript>*/}
              </div>
            </div>
          </div>
          }
        </div>

        {isShowTheMap &&
        <div className="col-12 col-lg-5">

          <form onSubmit={handleSubmit(onSubmit)}>

            <h5 className="text-primary">{t('Is the information correct?')}</h5>

            <Button type="submit" variant="contained"
                    color="primary" className="mb-3 mt-2">{t('Yes')}</Button>

            <FormControl className={classes.formControl}>
              <Controller
                name="buildingName"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="standard"
                    label={t("Building Name")}
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
                name="streetNumber"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="standard"
                    label={t("Building Number")}
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
                name="streetName"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="standard"
                    label={t("Street Name")}
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
                control={control}
                name="address"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="standard"
                    label={t("Address")}
                    aria-describedby="Address"
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
                name="postalCode"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    variant="standard"
                    label={t("Post Code")}
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
                    variant="standard"
                    aria-describedby="City"
                    label={t("City")}
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
                    variant="standard"
                    aria-describedby="State"
                    label={t("State")}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </FormControl>

            <Controller
              name="countryCode"
              control={control}
              render={({ field }) => (
                <FormControl className={classes.formControl}>
                  <InputLabel id="country-label">{t('Country')}</InputLabel>
                  <NativeSelect
                    labelId="country-label"
                    name="countryCode"
                    value={field.value}
                    {...field}
                  >
                    {Countries.map((o) => (
                      <option
                        key={o.alpha2Code}
                        value={o.alpha2Code}
                      >
                        {o.name}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              )}
            />
          </form>

        </div>}
      </div>
    </>
  )
}

export default SearchBuilding
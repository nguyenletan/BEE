import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import MaterialFormStyle from '../../../style/MaterialFormStyle'
import cameraImg from '../../../assets/images/camera.jpg'
import { Controller, useForm } from 'react-hook-form'
import { SustainabilityRatingScheme } from 'reference-tables/GreenBuildingRatingSystem'
import { Redirect, useParams } from 'react-router-dom'
import BackNextGroupButton from '../../../components/BackNextGroupButton'
import StepNav from '../step-nav/StepNav'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import Countries from '../../../reference-tables/Country'
import UseType from '../../../reference-tables/UseType'
import { useRecoilState } from 'recoil'
import { addingBuildingProgressState, generalBuildingInformationState } from 'atoms'
import { makeStyles } from '@material-ui/core/styles'
import Orientation from '../../../reference-tables/Orientation'
import Period from '../../../reference-tables/Period'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'


const UploadImage = styled.div`
  width: 400px;
  margin: 0;
  border: 1px solid var(--bs-secondary);
`

const Image = styled.img`
  width: 400px;
  height: 250px;
  object-fit: cover;
`

const LeftCol = styled.div`
  max-height: calc(100vh - 333px);
  overflow: auto;
`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`

const GeneralInformation = () => {
  //const complexityWeight = 15

  const [generalBuildingInformation, setGeneralBuildingInformation] = useRecoilState(
    generalBuildingInformationState)

  const [addingBuildingProgress, setAddingBuildingProgressState] = useRecoilState(
    addingBuildingProgressState)

  const [latestYearForRefurbishmentOrExtension, setLatestYearForRefurbishmentOrExtension] = React.useState(
    generalBuildingInformation.latestYearForRefurbishmentOrExtension
      ? `${generalBuildingInformation.latestYearForRefurbishmentOrExtension}/01/01`
      : null,
    // new Date("2014-08-18T21:11:54")
  )

  const onHasMajorRefurbishmentOrExtensionsDoneChange = () => {
    setGeneralBuildingInformation({
      ...generalBuildingInformation,
      hasMajorRefurbishmentOrExtensionsDone: !generalBuildingInformation.hasMajorRefurbishmentOrExtensionsDone,
    })
  }

  const onLatestYearForRefurbishmentOrExtensionChange = (date) => {
    setLatestYearForRefurbishmentOrExtension(date)
    setGeneralBuildingInformation({
      ...generalBuildingInformation,
      latestYearForRefurbishmentOrExtension: date.getFullYear(),
    })
  }

  const classes = makeStyles(() => (MaterialFormStyle))()

  const [isMovingNext, setIsMovingNext] = useState(false)

  const { i18n } = useTranslation();

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
  })

  const handleChangeBuildingPhoto = (e) => {
    e.preventDefault()
    //const formData = new FormData()
    //formData.append('image', image.raw)

    if (e.target.files.length) {
      let reader = new FileReader()
      const file = e.target.files[0]
      reader.readAsDataURL(file)
      // on reader load something...
      reader.onload = () => {
        // Make a fileInfo Object
        const base64Image = reader.result
        //.replace('data:image/png;base64,', '')
        // .replace('data:image/jpg;base64,', '')
        // .replace('data:image/jpeg;base64,', '');

        // setImage({
        //   preview: URL.createObjectURL(e.target.files[0]),
        //   raw: base64Image,
        // })

        setGeneralBuildingInformation({
          ...generalBuildingInformation,
          buildingPhoto: base64Image,
        })
      }
    }
  }

  const onInputChange = (name, value) => {
    setGeneralBuildingInformation({ ...generalBuildingInformation, [name]: value })
  }

  useEffect(() => {
    setValue('address', generalBuildingInformation?.address, {shouldValidate: true})
    setValue('streetName', generalBuildingInformation?.streetName, {shouldValidate: true})
    setValue('streetNumber', generalBuildingInformation?.streetNumber, {shouldValidate: true})
    setValue('city', generalBuildingInformation?.city, {shouldValidate: true})
    setValue('state', generalBuildingInformation?.state, {shouldValidate: true})
    setValue('countryCode', generalBuildingInformation?.countryCode, {shouldValidate: true})
    setValue('postalCode', generalBuildingInformation?.postalCode, {shouldValidate: true})
    setValue('buildingName', generalBuildingInformation?.buildingName, {shouldValidate: true})
    setValue('constructionPeriodValue', generalBuildingInformation?.constructionPeriodValue, {shouldValidate: true})
    setValue('useTypeId', generalBuildingInformation?.useTypeId, {shouldValidate: true})
    setValue('buildingOrientedId', generalBuildingInformation?.buildingOrientedId, {shouldValidate: true})
    // setValue('sustainabilityRatingSchemeId', generalBuildingInformation?.sustainabilityRatingSchemeId)
    // setValue('sustainabilityRatingId', generalBuildingInformation?.sustainabilityRatingId)
    setValue('storeysAboveGround', generalBuildingInformation?.storeysAboveGround, {shouldValidate: true})
    setValue('storeysBelowGround', generalBuildingInformation?.storeysBelowGround, {shouldValidate: true})
    setValue('grossInteriorArea', generalBuildingInformation?.grossInteriorArea, {shouldValidate: true})
    setValue('netUsableArea', generalBuildingInformation?.netUsableArea, {shouldValidate: true})
    setValue('avgInternalFloorToCeilingHeight', generalBuildingInformation?.avgInternalFloorToCeilingHeight, {shouldValidate: true})
    setValue('latestYearForRefurbishmentOrExtension', generalBuildingInformation?.latestYearForRefurbishmentOrExtension, {shouldValidate: true})
    setValue('buildingPhoto', generalBuildingInformation?.buildingPhoto)
  }, [generalBuildingInformation, setValue])

  useEffect(() => {
    if (generalBuildingInformation !== null &&
      generalBuildingInformation?.sustainabilityRatingSchemeId !== null) {

      setSustainabilityRating(SustainabilityRatingScheme.filter(
        item => item.id.toString() ===
          generalBuildingInformation?.sustainabilityRatingSchemeId?.toString())[0]?.ratingLevels)
    }
  }, [generalBuildingInformation, generalBuildingInformation?.sustainabilityRatingSchemeId])

  const [sustainabilityRating, setSustainabilityRating] = useState(
    SustainabilityRatingScheme[0].ratingLevels)


  const { id } = useParams()
  const parentUrl = id ? `/editing-building/${id}` : '/adding-building'
  const moveNextUrl = parentUrl + (id ? '/activity' : '/activity')

  const onSubmit = () => {
    //setGeneralBuildingInformation({ ...generalBuildingInformation, ...data })
    if(!id) {
      setAddingBuildingProgressState(25)
    }
    setIsMovingNext(true)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext && <Redirect to={moveNextUrl}/>}

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <BackNextGroupButton
          backLink={parentUrl + '/search-building'}
          nextLink={'/adding-building/activity'}
          progressValue={addingBuildingProgress}
          isDisabledSave={addingBuildingProgress < 100}
        />

      </div>

      <StepNav/>

      <div className="row">
        <LeftCol className="col-12 col-lg-8 ">

          <div className="row">

            <div className="col-12 col-lg-6">

              <Controller
                name="buildingName"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField
                      label="Building Name"
                      value={generalBuildingInformation?.buildingName}
                      onChange={(e) => {
                        onChange(e)
                        onInputChange('buildingName', e.target.value)
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  </FormControl>
                )}
                // rules={{
                //   validate: () => {
                //     return getValues("firstName") === "bill";
                //   }
                // }}
                rules={{ required: 'Building Name is required' }}
              />

            </div>

            <div className="col-12 col-lg-6">

              <Controller
                name="buildingOrientedId"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id="building-orientation-label" className={error && 'text-danger'}>
                      Building Orientation
                    </InputLabel>
                    <Select labelId="building-orientation-label"
                            value={generalBuildingInformation?.buildingOrientedId}
                            onChange={(e) => {
                              onChange(e)
                              onInputChange('buildingOrientedId',
                                e.target.value)
                            }}
                            error={!!error}>
                      {Orientation.map((o) => (
                        <MenuItem
                          key={o.id}
                          value={o.id}
                        >
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText className="text-danger">The Building Orientation is required</FormHelperText>}
                  </FormControl>
                )}
                rules={{ required: 'The Building Orientation is required' }}
              />

            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6">

              <Controller
                name="street-number"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField type="text"
                               id="street-number"
                               label="Street Number"
                               value={generalBuildingInformation?.streetNumber}
                               onChange={(e) => {
                                 onChange(e)
                                 onInputChange('streetNumber', e.target.value)
                               }}
                               error={!!error}
                               helperText={error ? error.message : null}
                    />
                  </FormControl>
                )}
                rules={{ required: 'Street Number is required' }}
              />

            </div>

          </div>

          <div className="row">
            <div className="col-12 col-lg-6">

              <Controller
                name="street-name"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField type="text"
                               id="street-name"
                               label="Street Name"
                               value={generalBuildingInformation?.streetName}
                               onChange={(e) => {
                                 onChange(e)
                                 onInputChange('streetName', e.target.value)
                               }}
                               error={!!error}
                               helperText={error ? error.message : null}
                    />
                  </FormControl>
                )}
                rules={{ required: 'Street Name is required' }}
              />

            </div>

          </div>

          <div className="row">
            <div className="col-12 col-lg-6">

              <Controller
                name="address"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField type="text"
                               id="address"
                               label="Address"
                               value={generalBuildingInformation?.address}
                               onChange={(e) => {
                                 onChange(e)
                                 onInputChange('address', e.target.value)
                               }}
                               error={!!error}
                               helperText={error ? error.message : null}
                    />
                  </FormControl>
                )}
                rules={{ required: 'Address is required' }}
              />

            </div>

            <div className="col-12 col-lg-6">

              <Controller
                name="sustainabilityRatingSchemeId"
                control={control}
                render={({
                  field: { onChange },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id="sustainability-rating-scheme-label">Sustainability
                      Rating Scheme</InputLabel>
                    <Select id="sustainability-rating-scheme"
                            labelId="sustainability-rating-scheme-label"
                            value={generalBuildingInformation?.sustainabilityRatingSchemeId || ''}
                            onChange={(e) => {
                              onChange(e)
                              onInputChange(
                                'sustainabilityRatingSchemeId',
                                e.target.value)
                            }}
                    >
                      {SustainabilityRatingScheme.map((o) => (
                        <MenuItem
                          key={o.id}
                          value={o.id}
                        >
                          {o.shortName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6">
              <Controller
                name="postalCode"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField type="text"
                               label="Postal Code"
                               id="postal-code"
                               value={generalBuildingInformation?.postalCode}
                               onChange={(e) => {
                                 onChange(e)
                                 onInputChange('postalCode',
                                   e.target.value)
                               }}
                               error={!!error}
                               helperText={error ? error.message : null}
                               aria-describedby="Postal Code"
                    />
                  </FormControl>
                )}
                rules={{ required: 'Postal Code is required' }}
              />
            </div>
            <div className="form-group col-12 col-lg-6">
              <Controller
                name="sustainabilityRatingId"
                control={control}
                render={({
                  field: { onChange },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id="sustainability-rating-label">
                      Sustainability Rating</InputLabel>
                    <Select id="sustainability-rating-select"
                            labelId="sustainability-rating-label"
                            value={generalBuildingInformation?.sustainabilityRatingId || ''}
                            onChange={(e) => {
                              onChange(e)
                              onInputChange('sustainabilityRatingId',
                                e.target.value)
                            }}
                    >
                      {sustainabilityRating.map((o) => (
                        <MenuItem
                          key={o.id}
                          value={o.id}
                        >
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />

            </div>

          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <Controller
                name="city"
                control={control}
                render={({
                  field: { onChange },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField type="text"
                               id="city-select"
                               aria-describedby="City"
                               label="City"
                               value={generalBuildingInformation?.city}
                               onChange={(e) => {
                                 onChange(e)
                                 onInputChange('city', e.target.value)
                               }}
                    />
                  </FormControl>
                )}
              />
            </div>
            <div className="form-group col-12 col-lg-6">
              <Controller
                name="storeysAboveGround"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField type="number"
                               id="storeys-above-ground"
                               aria-describedby="Storeys Above Ground"
                               label="Storeys Above Ground"
                               value={generalBuildingInformation?.storeysAboveGround}
                               onChange={(e) => {
                                 onChange(e)
                                 onInputChange('storeysAboveGround',
                                   e.target.value)
                               }}
                               min={0}
                               error={!!error}
                               helperText={error ? error.message : null}
                    />
                  </FormControl>
                )}
                rules={{
                  min: { value: 0, message: 'The value should be > -1' },
                  required: 'Storeys Above Ground is required',
                }}
              />

            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6">
              <Controller
                name="state"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField type="text"
                               id="state"
                               aria-describedby="State"
                               label="State"
                               value={generalBuildingInformation?.state}
                               onChange={(e) => {
                                 onChange(e)
                                 onInputChange('state',
                                   e.target.value)
                               }}
                               error={!!error}
                               helperText={error ? error.message : null}
                    />
                  </FormControl>
                )}
              />
            </div>
            <div className="col-12 col-lg-6">
              <Controller
                name="storeysBelowGround"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <TextField type="number"
                               id="storeys-below-ground"
                               aria-describedby="Storeys Below Ground"
                               label="Storeys Below Ground"
                               value={generalBuildingInformation?.storeysBelowGround}
                               onChange={(e) => {
                                 onChange(e)
                                 onInputChange('storeysBelowGround',
                                   e.target.value)
                               }}
                               error={!!error}
                               helperText={error ? error.message : null}
                    />
                  </FormControl>
                )}
                rules={{
                  min: { value: 0, message: 'The value should be > -1' },
                  required: 'Storeys Below Ground is required',
                }}
              />
            </div>
          </div>

          <div className="row">

            <div className="form-group col-12 col-lg-6">
              <Controller
                name="countryCode"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel className={error && 'text-danger'} id="country-code-label">
                      Country
                    </InputLabel>
                    <Select id="country-code"
                            labelId="country-code-label"
                            value={generalBuildingInformation?.countryCode}
                            onChange={(e) => {
                              onChange(e)
                              onInputChange('countryCode',
                                e.target.value)
                            }}
                            error={!!error}
                    >
                      {Countries.map((o) => (
                        <MenuItem
                          key={o.alpha2Code}
                          value={o.alpha2Code}
                        >
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText className="text-danger">The Country Code is required</FormHelperText>}
                  </FormControl>
                )}
                rules={{ required: 'The Country Code is required' }}
              />
            </div>
            <div
              className="d-flex justify-content-start mb-3 col-12 col-lg-6">
              <Controller
                name="grossInteriorArea"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <TextField type="number"
                             id="gross-interior-area"
                             aria-describedby="Total Floor Area Gross"
                             placeholder="Total Floor Area Gross "
                             label="Total Floor Area Gross "
                             className={classes.valueUnit}
                             value={generalBuildingInformation.grossInteriorArea}
                             onChange={(e) => {
                               onChange(e)
                               onInputChange('grossInteriorArea',
                                 e.target.value)
                             }}
                             error={!!error}
                             helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  min: { value: 0, message: 'The value should be >= 0' },
                  required: 'Total Floor Area Gross is required',
                }}
              />
              <Controller
                name="grossInteriorAreaUnit"
                control={control}
                render={({
                  field: { onChange },
                }) => (
                  <FormControl className={classes.smallFormControl}>
                    <InputLabel id="gross-interior-area-unit-label"/>
                    <Select id="gross-interior-area-unit-select"
                            labelId="gross-interior-area-unit-label"
                            className={classes.unit}
                            defaultValue="m2"
                            value={generalBuildingInformation.grossInteriorAreaUnit}
                            onChange={(e) => {
                              onChange(e)
                              onInputChange('grossInteriorAreaUnit',
                                e.target.value)
                            }}
                    >
                      <MenuItem value="m2">m<sup>2</sup></MenuItem>
                      <MenuItem value="ft2">ft<sup>2</sup></MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </div>

          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <Controller
                name="constructionPeriodValue"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id="construction-period-label" className={error && 'text-danger'}>
                      Construction Period
                    </InputLabel>
                    <Select id="construction-period"
                            label="construction-period-label"
                            value={generalBuildingInformation?.constructionPeriodValue}
                            onChange={(e) => {
                              onChange(e)
                              onInputChange('constructionPeriodValue',
                                e.target.value)
                            }}
                            error={!!error}
                    >
                      {Period.map((o) => (
                        <MenuItem
                          key={o.id}
                          value={o.value}
                        >
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText className="text-danger">The Construction Period is required</FormHelperText>}
                  </FormControl>
                )}
                rules={{ required: 'The Construction Period is required' }}
              />
            </div>
            <div
              className="col-12 col-lg-6 d-flex justify-content-start mb-3">
              <Controller
                name="netUsableArea"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (

                  <TextField type="number"
                             id="net-usable-area"
                             aria-describedby="Total Net Usable Area "
                             placeholder="Total Net Usable Area"
                             label="Total Net Usable Area"
                             className={classes.valueUnit}
                             value={generalBuildingInformation?.netUsableArea}
                             onChange={(e) => {
                               onChange(e)
                               onInputChange('netUsableArea',
                                 e.target.value)
                             }}
                             error={!!error}
                             helperText={error ? error.message : null}
                  />

                )}
                rules={{
                  min: { value: 0, message: 'The value should be > -1' },
                  required: 'The Total Net Usable Area is required',
                }}
              />

              <Controller
                name="netUsableAreaUnit"
                control={control}
                render={({
                  field: { onChange },
                }) => (

                  <FormControl className={classes.smallFormControl}>
                    <InputLabel id="net-usable-area-unit-label"/>
                    <Select id="net-usable-area-unit-select"
                            labelId="net-usable-area-unit-label"
                            className={classes.unit}
                            value={generalBuildingInformation?.netUsableAreaUnit}
                            onChange={(e) => {
                              onChange(e)
                              onInputChange('netUsableAreaUnit',
                                e.target.value)
                            }}
                            defaultValue="m2">
                      <MenuItem value="m2">m<sup>2</sup></MenuItem>
                      <MenuItem value="ft2">ft<sup>2</sup></MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </div>

          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <Controller
                name="useTypeId"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (
                  <FormControl className={classes.formControl}>
                    <InputLabel id="use-type-label" className={error && 'text-danger'}>
                      Use Type
                    </InputLabel>
                    <Select id="use-type"
                            labelId="use-type-label"
                            value={generalBuildingInformation?.useTypeId}
                            onChange={(e) => {
                              onChange(e)
                              onInputChange('useTypeId',
                                e.target.value)
                            }}
                            error={!!error}
                    >
                      {UseType.map((o) => (
                        <MenuItem
                          key={o.id}
                          value={o.id}
                        >
                          {o.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {error && <FormHelperText className="text-danger">The Use Type is required</FormHelperText>}
                  </FormControl>
                )}
                rules={{ required: 'The Use Type is required' }}
              />
            </div>
            <div
              className="col-12 col-lg-6 d-flex justify-content-start mb-3">
              <Controller
                name="avgInternalFloorToCeilingHeight"
                control={control}
                render={({
                  field: { onChange },
                  fieldState: { error },
                }) => (

                  <TextField type="number"
                             id="avg-internal-floor-to-ceiling-height"
                             aria-describedby="Avg. Internal Floor to Ceiling Height"
                             placeholder="Avg. Internal Floor to Ceiling Height"
                             className={classes.valueUnit}
                             label="Avg. Internal Floor to Ceiling Height"
                             value={generalBuildingInformation?.avgInternalFloorToCeilingHeight || ''}
                             onChange={(e) => {
                               onChange(e)
                               onInputChange(
                                 'avgInternalFloorToCeilingHeight',
                                 e.target.value)
                             }}
                             error={!!error}
                             helperText={error ? error.message : null}
                  />
                )}
                rules={{
                  min: { value: 0, message: 'The value should be > -1' },
                  required: 'Avg. Internal Floor to Ceiling Height is required',
                }}
              />
              <Controller
                name="avgInternalFloorToCeilingHeightUnit"
                control={control}
                render={({
                  field: { onChange }
                }) => (

                  <FormControl className={classes.smallFormControl}>
                    <InputLabel
                      id="avg-internal-floor-to-ceiling-height-unit-label"/>
                    <Select
                      id="avg-internal-floor-to-ceiling-height-unit-select"
                      labelId="avg-internal-floor-to-ceiling-height-unit-label"
                      className={classes.unit}
                      value={generalBuildingInformation?.avgInternalFloorToCeilingHeightUnit}
                      onChange={(e) => {
                        onChange(e)
                        onInputChange(
                          'avgInternalFloorToCeilingHeightUnit',
                          e.target.value)
                      }}
                      defaultValue="m">
                      <MenuItem value="m">m</MenuItem>
                      <MenuItem value="ft">ft</MenuItem>
                    </Select>
                  </FormControl>

                )}
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <Controller
                name="hasMajorRefurbishmentOrExtensionsDone"
                control={control}
                render={({
                  field: { onChange }
                }) => (
                  <div className="form-group">
                    <label className="form-label d-block mb-0">Has Major Refurbishment or Extensions Done?</label>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={generalBuildingInformation.hasMajorRefurbishmentOrExtensionsDone}
                          onChange={(e) => {
                            onChange(e)
                            onHasMajorRefurbishmentOrExtensionsDoneChange(e)
                          }}
                          color="primary"
                        />
                      }
                      label="Yes"
                    />
                  </div>
                )}
              />
            </div>

            {generalBuildingInformation.hasMajorRefurbishmentOrExtensionsDone === true && (
              <div className="col-12 col-lg-6 d-flex justify-content-start mb-3">
                <Controller
                  name="latestYearForRefurbishmentOrExtension"
                  control={control}
                  render={({
                    field: { onChange },
                    fieldState: { error },
                  }) => (
                    <FormControl className={classes.formControl}>
                      <label className={error && 'text-danger'}>Latest Year for Refurbishment or Extension</label>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent="flex-start">
                          <KeyboardDatePicker
                            maxDate={Date()}
                            variant="inline"
                            openTo="year"
                            views={['year']}
                            value={latestYearForRefurbishmentOrExtension}
                            onChange={(date) => {
                              onChange(date)
                              onLatestYearForRefurbishmentOrExtensionChange(date)
                            }}
                            error={!!error}
                            helperText={error ? error.message : null}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  )}
                  rules={{
                    required: 'Latest Year for Refurbishment or Extension is required',
                  }}
                />
              </div>
            )}

          </div>

        </LeftCol>

        <div className="col-12 col-lg-4">
          <h5>Building photo</h5>
          <UploadImage>
            <label htmlFor="upload-button" title="Upload image"
                   className="w-100 h-100 d-flex overflow-hidden m-0 cursor-pointer">
              <Image src={generalBuildingInformation.buildingPhoto ?? cameraImg} alt="upload"/>
            </label>
          </UploadImage>
          <input
            type="file"
            id="upload-button"
            className="d-none"
            onChange={handleChangeBuildingPhoto}
          />
          <Controller
            name="buildingPhoto"
            control={control}
            render={({
              field: { onChange },
            }) => (
              <input
                type="hidden"
                className="d-none"
                value={generalBuildingInformation.buildingPhoto}
                onChange={(e) => {
                  onChange(e)
                  handleChangeBuildingPhoto(e)
                }}
              />
            )}
          />
          <label className="mt-3 btn btn-primary border shadow"
                 htmlFor="upload-button"
                 title="Upload image">Upload photo</label>
        </div>
      </div>


    </form>
  )
}

export default GeneralInformation
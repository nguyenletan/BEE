import React, { useContext, useEffect, useState } from 'react'
import { ErrorMsg } from '../../login/LoginStyle'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import cameraImg from '../../../assets/images/camera.jpg'
import { Link, Redirect } from 'react-router-dom'

import Countries from '../../../reference-tables/Country'
import { BuildingInformationContext } from '../AddingBuilding'
import UseType from '../../../reference-tables/UseType'
import StepNav from '../step-nav/StepNav'
import { SustainabilityRatingScheme } from '../../../reference-tables/GreenBuildingRatingSystem'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import MaterialFormStyle from '../../../style/MaterialFormStyle'

const Form = styled.form`

`

// const Input = styled.input`
//   border-radius: 0.2em;
//   border-color: #7b7b7b;
// `
//
// const Select = styled.select`
//   border-radius: 0.2em;
//   border-color: #7b7b7b;
// `

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
  max-height: calc(100vh - 265px);
  overflow: auto;
`

const Title = styled.h2`
  color: var(--bs-primary);
  font-weight: 500;
  margin-bottom: 0;
`


const GeneralInformationFrom = ({ data }) => {
  const classes = MaterialFormStyle()
  const oriented = [
    { id: 0, name: 'North' },
    { id: 1, name: 'North East' },
    { id: 2, name: 'East' },
    { id: 3, name: 'South East' },
    { id: 4, name: 'South' },
    { id: 5, name: 'South West' },
    { id: 6, name: 'West' },
    { id: 7, name: 'North west' },
  ]

  const period = [
    { id: 0, name: '2021-Now', value: '2021' },
    { id: 1, name: '2011-2020', value: '2011' },
    { id: 2, name: '2001-2010', value: '2001' },
    { id: 3, name: '1991-2000', value: '1991' },
    { id: 4, name: '1981-1990', value: '1981' },
    { id: 5, name: '1971-1980', value: '1971' },
    { id: 6, name: '1960-1970', value: '1960' },
  ]

  const [isMovingNext, setIsMovingNext] = useState(false)

  const [image, setImage] = useState({ preview: cameraImg, raw: '' })

  const handleChange = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image.raw)

    if (e.target.files.length) {
      let reader = new FileReader()
      const file = e.target.files[0]
      reader.readAsDataURL(file)
      // on reader load something...
      reader.onload = () => {
        // Make a fileInfo Object
        // const base64Image = reader.result.replace('data:image/png;base64,', '')
        // .replace('data:image/jpg;base64,', '')
        // .replace('data:image/jpeg;base64,', '');
        setImage({
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],

        })
      }
    }
  }

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
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

  const [buildingInformationContext, setBuildingInformationContext] = useContext(
    BuildingInformationContext)

  useEffect(() => {

    setValue('address', data?.address, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('city', data?.city, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('state', data?.state, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('countryCode', data?.countryCode, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('postalCode', data?.postalCode, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('buildingName', data?.buildingName, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [data, setValue])

  const [sustainabilityRating, setSustainabilityRating] = useState(
    SustainabilityRatingScheme[0].ratingLevels)
  const onRatingSchemeChange = (e) => {
    setSustainabilityRating(SustainabilityRatingScheme.filter(
      item => item.id.toString() ===
        e.target.value.toString())[0]?.ratingLevels)
  }

  const onSubmit = (data) => {
    // console.log(data)
    // console.log(image)

    if (image.raw) {
      let reader = new FileReader()
      reader.readAsDataURL(image.raw)
      // on reader load something...
      reader.onload = () => {
        data.buildingPhoto = reader.result
        // Make a fileInfo Object
        // const base64Image = reader.result.replace('data:image/png;base64,', '')
        // .replace('data:image/jpg;base64,', '')
        // .replace('data:image/jpeg;base64,', '');
      }
    }

    setBuildingInformationContext({ ...buildingInformationContext, ...data })
    setIsMovingNext(true)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext && <Redirect to="/adding-building/activity"/>}

      <div className="d-flex mt-5 mb-4">

        <Title>New Building</Title>

        <div className="form-group ms-auto">
          <Link to="/adding-building/search-building">
            <Button variant="contained" color="default"
                    className="me-2">&lt; Back
            </Button>
          </Link>
          <Link to="/adding-building/activity"><Button variant="contained"
                                                       color="primary">Next &gt;</Button></Link>
        </div>
      </div>

      <StepNav/>

      <div className="row">
        <LeftCol className="col-12 col-lg-8 ">

          <div className="row">

            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <TextField type="text"
                           id="building-name"
                           aria-describedby="Building Name"
                           placeholder="Building Name"
                           label="Building Name"
                           {...register('buildingName', {
                             required: true,
                             maxLength: 100,
                           })}/>
              </FormControl>
              {errors?.buildingName?.type === 'required' &&
              <ErrorMsg>Building Name is required</ErrorMsg>}
              {errors?.buildingName?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>

            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <InputLabel id="building-orientation-label">Building
                  Orientation</InputLabel>
                <Select labelId="building-orientation-label"
                        {...register('buildingOriented')}>
                  {oriented.map((o) => (
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

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <TextField type="text"
                           className="form-control"
                           id="address"
                           aria-describedby="Address"
                           label="Address"

                           {...register('address', {
                             required: true,
                             maxLength: 100,
                           })}/>
              </FormControl>
              {errors?.address?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>

            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <InputLabel id="sustainability-rating-scheme-label">Sustainability
                  Rating Scheme</InputLabel>
                <Select id="sustainability-rating-scheme"
                        labelId="sustainability-rating-scheme-label"
                        onChange={onRatingSchemeChange}>
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
            </div>

          </div>

          <div className="row">
            <div className="col-12 col-lg-6">
              <FormControl className={classes.formControl}>

                <TextField type="number"
                           label="Postal Code"
                           id="postal-code"
                           aria-describedby="Postal Code"
                           {...register('postalCode', {
                             required: false,
                             maxLength: 10,
                           })}/>

              </FormControl>
              {errors?.postalCode?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <InputLabel id="sustainability-rating-label">Sustainability
                  Rating</InputLabel>
                <Select id="sustainability-rating-select"
                        labelId="sustainability-rating-label"
                        {...register(
                          'sustainabilityRating')}>
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
            </div>

          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <TextField type="text"
                           className="form-control"
                           id="city-select"
                           aria-describedby="City"
                           label="City"
                           {...register('city', {
                             required: false,
                             maxLength: 100,
                           })}/>
              </FormControl>
              {errors?.city?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <TextField type="text"
                           className="form-control"
                           id="storeys-above-ground"
                           aria-describedby="Storeys Above Ground"
                           label="Storeys Above Ground"
                           {...register('storeysAboveGround', {
                             required: true,
                             pattern: /^[0-9.,]+$/i,
                             maxLength: 100,
                           })}/>
              </FormControl>
              {errors?.storeysAboveGround?.type === 'required' &&
              <ErrorMsg>Storeys Above Ground is required</ErrorMsg>}
              {errors?.storeysAboveGround?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
              {errors?.storeysAboveGround?.type === 'pattern' &&
              <ErrorMsg>Only Number</ErrorMsg>}
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <TextField type="text"
                           className="form-control"
                           id="state"
                           aria-describedby="State"
                           label="State"
                           {...register('state', {
                             required: false,
                             maxLength: 100,
                           })}/>
              </FormControl>
              {errors?.state?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <TextField type="number"
                           id="storeys-below-ground"
                           aria-describedby="Storeys Below Ground"
                           label="Storeys Below Ground"
                           {...register('storeysBelowGround', {
                             required: true,
                             pattern: /^[0-9.,]+$/i,
                             maxLength: 100,
                           })}/>
              </FormControl>
              {errors?.storeysBelowGround?.type === 'required' &&
              <ErrorMsg>Storeys Below Ground is required</ErrorMsg>}
              {errors?.storeysBelowGround?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
              {errors?.storeysBelowGround?.type === 'pattern' &&
              <ErrorMsg>Only Number</ErrorMsg>}
            </div>
          </div>

          <div className="row">

            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <InputLabel id="country-code-label">Country</InputLabel>
                <Select id="country-code"
                        labelId="country-code-label"
                        {...register('countryCode')}>
                  {Countries.map((o) => (
                    <MenuItem
                      key={o.alpha2Code}
                      value={o.alpha2Code}
                    >
                      {o.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.country?.type === 'required' &&
              <ErrorMsg>Country Code is required</ErrorMsg>}
              {errors?.country?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>
            <div className="d-flex justify-content-start mb-3 col-12 col-lg-6">
              <TextField type="text"
                         id="gross-interior-area"
                         aria-describedby="Gross Interior Area"
                         placeholder="Gross Interior Area"
                         label="Gross Interior Area"
                         className={classes.valueUnit}
                         {...register('grossInteriorArea', {
                           required: true,
                           pattern: /^[0-9.,]+$/i,
                           maxLength: 100,
                         })}/>
              <FormControl className={classes.smallFormControl}>
                <InputLabel id="gross-interior-area-unit-label"/>
                <Select id="gross-interior-area-unit-select"
                        labelId="gross-interior-area-unit-label"
                        className={classes.unit}
                        defaultValue="m2">
                  <MenuItem value="m2">m<sup>2</sup></MenuItem>
                  <MenuItem value="ft2">ft<sup>2</sup></MenuItem>
                </Select>
              </FormControl>
              {errors?.grossInteriorArea?.type === 'required' &&
              <ErrorMsg>Gross Interior Area is required</ErrorMsg>}
              {errors?.grossInteriorArea?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
              {errors?.grossInteriorArea?.type === 'pattern' &&
              <ErrorMsg>Only Number</ErrorMsg>}
            </div>


          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <InputLabel id="construction-period-label">Construction
                  Period</InputLabel>
                <Select id="construction-period"
                        label="construction-period-label"
                        {...register('construction-period')}>
                  {period.map((o) => (
                    <MenuItem
                      key={o.id}
                      value={o.value}
                    >
                      {o.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.constructionPeriod?.type === 'required' &&
              <ErrorMsg>Construction Period is required</ErrorMsg>}
              {errors?.constructionPeriod?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-start mb-3">
              <TextField type="number"
                         id="net-usable-area"
                         aria-describedby="Net Usable Area"
                         placeholder="Net Usable Area"
                         label="Net Usable Area"
                         className={classes.valueUnit}
                         {...register('netUsableArea', {
                           required: true,
                           pattern: /^[0-9.,]+$/i,
                           maxLength: 100,
                         })}/>
              <FormControl className={classes.smallFormControl}>
                <InputLabel id="net-usable-area-unit-label"/>
                <Select id="net-usable-area-unit-select"
                        labelId="net-usable-area-unit-label"
                        className={classes.unit}
                        defaultValue="m2">
                  <MenuItem value="m2">m<sup>2</sup></MenuItem>
                  <MenuItem value="ft2">ft<sup>2</sup></MenuItem>
                </Select>
              </FormControl>
              {errors?.netUsableArea?.type === 'required' &&
              <ErrorMsg>Net Usable Area is required</ErrorMsg>}
              {errors?.netUsableArea?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
              {errors?.netUsableArea?.type === 'pattern' &&
              <ErrorMsg>Only Number</ErrorMsg>}
            </div>

          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <FormControl className={classes.formControl}>
                <InputLabel id="use-type-label">Use Type</InputLabel>
                <Select id="use-type"
                        labelId="use-type-label"
                        {...register('useType')}>
                  {UseType.map((o) => (
                    <MenuItem
                      key={o.id}
                      value={o.name}
                    >
                      {o.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors?.useType?.type === 'required' &&
              <ErrorMsg>Use Type is required</ErrorMsg>}
              {errors?.useType?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-start mb-3">
              <TextField type="number"
                         id="avg-internal-floor-to-ceiling-height"
                         aria-describedby="Avg. Internal Floor to Ceiling Height"
                         placeholder="Avg. Internal Floor to Ceiling Height"
                         className={classes.valueUnit}
                         label="Avg. Internal Floor to Ceiling Height"
                         {...register('avgInternalFloorToCeilingHeight', {
                           required: true,
                           pattern: /^[0-9.,]+$/i,
                           maxLength: 100,
                         })}/>
              <FormControl className={classes.smallFormControl}>
                <InputLabel
                  id="avg-internal-floor-to-ceiling-height-unit-label"/>
                <Select id="avg-internal-floor-to-ceiling-height-unit-select"
                        labelId="avg-internal-floor-to-ceiling-height-unit-label"
                        className={classes.unit}
                        defaultValue="m">
                  <MenuItem value="m">m</MenuItem>
                  <MenuItem value="ft">ft</MenuItem>
                </Select>
              </FormControl>
              {errors?.avgInternalFloorToCeilingHeight?.type === 'required' &&
              <ErrorMsg>Avg. Internal Floor to Ceiling Height is
                required</ErrorMsg>}
              {errors?.avgInternalFloorToCeilingHeight?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
              {errors?.avgInternalFloorToCeilingHeight?.type === 'pattern' &&
              <ErrorMsg>Only Number</ErrorMsg>}
            </div>
          </div>

        </LeftCol>

        <div className="col-12 col-lg-4">
          <h5>Building photo</h5>
          <UploadImage>
            <label htmlFor="upload-button" title="Upload image"
                   className="w-100 h-100 d-flex overflow-hidden m-0 cursor-pointer">
              <Image src={image.preview} alt="upload"/>
            </label>
          </UploadImage>
          <input
            type="file"
            id="upload-button"
            className="d-none"
            onChange={handleChange}
          />
          <label className="mt-3 btn btn-primary border shadow"
                 htmlFor="upload-button"
                 title="Upload image">Upload photo</label>
        </div>
      </div>


    </Form>
  )
}

export default GeneralInformationFrom
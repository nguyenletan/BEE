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


const Form = styled.form`

`

const Input = styled.input`
  border-radius: 0.2em;
  border-color: #7b7b7b;
`

const Select = styled.select`
  border-radius: 0.2em;
  border-color: #7b7b7b;
`

const UploadImage = styled.div`
  width: 400px;
  margin: 0;
  border: 1px solid var(--secondary);
`

const Image = styled.img`
  width: 400px;
  height: 250px;
  object-fit: cover;
`

const LeftCol = styled.div`
  max-height: calc(100vh - 245px);
  overflow: auto;
`


const Title = styled.h2`
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 0;
`

const ComplexLabel =  styled.label`
  display: flex;
  justify-content: start;
  .form-check {
    margin-left: 1em;
    color: var(--primary);
  }
`


const GeneralInformationFrom = ({ data }) => {
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
      let reader = new FileReader();
      const file = e.target.files[0];
      reader.readAsDataURL(file);
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
      };
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

  const onSubmit = (data) => {
    // console.log(data)
    // console.log(image)

    if(image.raw) {
      let reader = new FileReader();
      reader.readAsDataURL(image.raw);
      // on reader load something...
      reader.onload = () => {
        data.buildingPhoto = reader.result
        // Make a fileInfo Object
        // const base64Image = reader.result.replace('data:image/png;base64,', '')
        // .replace('data:image/jpg;base64,', '')
        // .replace('data:image/jpeg;base64,', '');
      };
    }

    setBuildingInformationContext({...buildingInformationContext, ...data})
    setIsMovingNext(true)
    console.log(data)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {isMovingNext && <Redirect to="/adding-building/activity"/>}

      <div className="d-flex">

        <Title>New Building</Title>

        <div className="form-group ml-auto r">
          <Link to="/adding-building/search-building">
            <button type="button" className="btn btn-outline-primary mr-1">&lt; Back
            </button>
          </Link>
          <button type="submit"
                  className="btn btn-primary">Next &gt;</button>
        </div>
      </div>

      <StepNav activePositon={0}/>

      <div className="row">
        <LeftCol className="col-12 col-lg-8 ">

          <div className="row">

            <div className="form-group col-12 col-lg-6">
              <label htmlFor="building-name">Building Name</label>
              <Input type="text"
                     style={{ border: errors.test ? '1px solid red' : '' }}
                     className="form-control"
                     id="building-name"
                     aria-describedby="Building Name"
                     placeholder="Building Name"
                     {...register('buildingName', {
                       required: true,
                       maxLength: 100,
                     })}/>
              {errors?.buildingName?.type === 'required' &&
              <ErrorMsg>Building Name is required</ErrorMsg>}
              {errors?.buildingName?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>

            <div className="form-group col-12 col-lg-6">
              <label htmlFor="building-orientation">Building
                Orientation</label>
              <Select className="form-select" {...register('buildingOriented')}>
                {oriented.map((o) => (
                  <option
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="address">Address</label>
              <Input type="text"
                     className="form-control"
                     id="address"
                     aria-describedby="Address"
                     placeholder="Address"
                     autocomplete="off"
                     {...register('address', {
                       required: true,
                       maxLength: 100,
                     })}/>
              {errors?.address?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>

            <div className="form-group col-12 col-lg-6">
              <label htmlFor="sustainability-rating-scheme">Sustainability Rating Scheme</label>
              <Select id="sustainability-rating-scheme" className="form-select" {...register("sustainabilityRatingSchema")}>
                {oriented.map((o) => (
                  <option
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
            </div>

          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="postal-code">Postal Code</label>
              <Input type="text"
                     inputMode="numeric"
                     className="form-control"
                     id="postal-code"
                     aria-describedby="Postal Code"
                     placeholder="Postal Code"
                     autocomplete="off"
                     {...register('postalCode', {
                       required: false,
                       maxLength: 10,
                     })}/>
              {errors?.postalCode?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="sustainability-rating">Sustainability
                Rating</label>
              <Select id="sustainability-rating" className="form-select" {...register("sustainabilityRating")}>
                {oriented.map((o) => (
                  <option
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
            </div>

          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="city">City</label>
              <Input type="text"
                     className="form-control"
                     id="city"
                     aria-describedby="City"
                     placeholder="City"
                     autocomplete="off"
                     {...register('city', {
                       required: false,
                       maxLength: 100,
                     })}/>
              {errors?.city?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="storeys-above-ground">Storeys Above Ground</label>
              <Input type="text"
                     className="form-control"
                     id="storeys-above-ground"
                     aria-describedby="Storeys Above Ground"
                     placeholder="Storeys Above Ground"
                     autocomplete="off"
                     {...register('storeysAboveGround', {
                       required: true,
                       pattern: /^[0-9.,]+$/i,
                       maxLength: 100,
                     })}/>
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
              <label htmlFor="state">State</label>
              <Input type="text"
                     className="form-control"
                     id="state"
                     aria-describedby="State"
                     placeholder="State"
                     autocomplete="off"
                     {...register('state', {
                       required: false,
                       maxLength: 100,
                     })}/>
              {errors?.state?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="storeys-below-ground">Storeys Below Ground</label>
              <Input type="text"
                     className="form-control"
                     inputMode="decimal"
                     id="storeys-below-ground"
                     aria-describedby="Storeys Below Ground"
                     placeholder="Storeys Below Ground"
                     autocomplete="off"
                     {...register('storeysBelowGround', {
                       required: true,
                       pattern: /^[0-9.,]+$/i,
                       maxLength: 100,
                     })}/>
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
              <label htmlFor="country-code">Country</label>
              <Select id="country-code" className="form-select"
                      {...register('countryCode')}>
                {Countries.map((o) => (
                  <option
                    key={o.alpha2Code}
                    value={o.alpha2Code}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
              {errors?.country?.type === 'required' &&
              <ErrorMsg>Country Code is required</ErrorMsg>}
              {errors?.country?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <ComplexLabel htmlFor="gross-interior-area">
                <span>Gross Interior Area</span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gross-interior-area-unit"
                         id="gross-interior-area-m" checked/>
                  <label className="form-check-label"
                         htmlFor="gross-interior-area-m">m<sup>2</sup></label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gross-interior-area-unit"
                         id="gross-interior-area-ft"/>
                  <label className="form-check-label"
                         htmlFor="gross-interior-area-ft">ft<sup>2</sup></label>
                </div>
              </ComplexLabel>
              <Input type="text"
                     className="form-control"
                     id="gross-interior-area"
                     aria-describedby="Gross Interior Area"
                     placeholder="Gross Interior Area"
                     autocomplete="off"
                     inputMode="decimal"
                     {...register('grossInteriorArea', {
                       required: true,
                       pattern: /^[0-9.,]+$/i,
                       maxLength: 100,
                     })}/>
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
              <label htmlFor="construction-period">Construction Period</label>
              <Select id="construction-period" className="form-select" {...register('construction-period')}>
                {period.map((o) => (
                  <option
                    key={o.id}
                    value={o.value}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
              {errors?.constructionPeriod?.type === 'required' &&
              <ErrorMsg>Construction Period is required</ErrorMsg>}
              {errors?.constructionPeriod?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <ComplexLabel htmlFor="net-usable-area"><span>Net Usable Area</span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="net-usable-area-unit"
                         id="net-usable-area-unit-m" checked />
                  <label className="form-check-label"
                         htmlFor="net-usable-area-unit-m">m<sup>2</sup></label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="net-usable-area-unit"
                         id="net-usable-area-unit-ft"/>
                  <label className="form-check-label"
                         htmlFor="net-usable-area-unit-ft">ft<sup>2</sup></label>
                </div>
              </ComplexLabel>
              <Input type="text"
                     className="form-control"
                     inputMode="decimal"
                     id="net-usable-area"
                     aria-describedby="Net Usable Area"
                     placeholder="Net Usable Area"
                     autocomplete="off"
                     {...register('netUsableArea', {
                       required: true,
                       pattern: /^[0-9.,]+$/i,
                       maxLength: 100,
                     })}/>
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
              <label htmlFor="use-type">Use Type</label>
              <Select id="use-type" className="form-select" {...register('useType')}>
                {UseType.map((o) => (
                  <option
                    key={o.id}
                    value={o.name}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
              {errors?.useType?.type === 'required' &&
              <ErrorMsg>Use Type is required</ErrorMsg>}
              {errors?.useType?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <ComplexLabel htmlFor="avg-internal-floor-to-ceiling-height"><span>Avg.
                Internal Floor to Ceiling Height</span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="avg-internal-floor-to-ceiling-height-unit"
                         id="avg-internal-floor-to-ceiling-height-unit-m" checked/>
                  <label className="form-check-label"
                         htmlFor="avg-internal-floor-to-ceiling-height-unit-m">m<sup>2</sup></label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="avg-internal-floor-to-ceiling-height-unit"
                         id="avg-internal-floor-to-ceiling-height-unit-ft"/>
                  <label className="form-check-label"
                         htmlFor="avg-internal-floor-to-ceiling-height-unit-ft">ft<sup>2</sup></label>
                </div>
              </ComplexLabel>
              <Input type="text"
                     className="form-control"
                     inputMode="decimal"
                     id="avg-internal-floor-to-ceiling-height"
                     aria-describedby="Avg. Internal Floor to Ceiling Height"
                     placeholder="Avg. Internal Floor to Ceiling Height"
                     autocomplete="off"
                     {...register('avgInternalFloorToCeilingHeight', {
                       required: true,
                       pattern: /^[0-9.,]+$/i,
                       maxLength: 100,
                     })}/>
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
          <label className="mt-3 btn btn-primary" htmlFor="upload-button"
                 title="Upload image">Upload photo</label>
        </div>
      </div>


    </Form>
  )
}

export default GeneralInformationFrom
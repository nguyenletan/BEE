import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { getLatLngFromAddress } from '../../../Utilities'
import { BuildingInformationContext } from '../AddingBuilding'
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api'
import { Redirect } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { ErrorMsg } from '../../login/LoginStyle'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Countries, { findCountryByCountryCode } from '../../../reference-tables/Country'

const Title = styled.h2`
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 1em;
`

const SearchButton = styled.button`

`

const Input = styled.input`
  border-radius: 0.2em;
  border-color: #7b7b7b;
`

const SearchButtonText = styled.span`
  color: var(--white);
`

const Select = styled.select`
  border-radius: 0.2em;
  border-color: #7b7b7b;
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
    spaceUsageGFA : [{

    }]
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

            <div className="form-group col-12 col-lg-12 ml-0">
              <label htmlFor="building-name">Enter Building Name or
                Address</label>
              <div className="d-flex">
                <div className="w-75 mr-1">
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
                <SearchButton type="button"
                              onClick={onSearch}
                              className="btn btn-primary"><SearchButtonText>Search</SearchButtonText></SearchButton>
              </div>
            </div>

          </div>

          {buildingInformationContext &&
          <div className="row mt-3 mb-5">
            <div className="col-12 col-lg-12">
              {/*<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>*/}
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
            </div>
          </div>
          }
        </div>

        {buildingInformationContext &&
        <div className="col-12 col-lg-5">
          <Form onSubmit={handleSubmit(onSubmit)}>

            <h5 className="text-primary">Is the information correct?</h5>

            <button type="submit" className="btn btn-primary btn-md mb-4">Yes
            </button>

            <div className="form-group">
              <label htmlFor="building-name">Building Name</label>
              <Input type="text"
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

            <div className="form-group">
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
              {errors?.address?.type === 'required' &&
              <ErrorMsg>Address is required</ErrorMsg>}
              {errors?.address?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>

            <div className="form-group">
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
              {errors?.postalCode?.type === 'required' &&
              <ErrorMsg>Postal Code is required</ErrorMsg>}
              {errors?.postalCode?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>

            <div className="form-group">
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

            <div className="form-group">
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

            <div className="form-group">
              <label htmlFor="country-code">Country</label>
              <Select id="country" className="form-select" {...register('countryCode')}>
                {Countries.map((o) => (
                  <option
                    key={o.alpha2Code}
                    value={o.alpha2Code}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
            </div>

          </Form>
        </div>}
      </div>
    </>
  )
}

export default SearchBuilding
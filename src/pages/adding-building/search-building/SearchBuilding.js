import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { getLatLngFromAddress } from '../../../Utilities'
import { BuildingInformationContext } from '../AddingBuilding'
import { GoogleMap, Marker, OverlayView } from '@react-google-maps/api'
import { Link } from 'react-router-dom'
import GooglePlacesAutocomplete  from 'react-google-places-autocomplete'

export const SearchButton = styled.button`
  border-radius: 0.2rem;
`

export const Input = styled.input`
  border-radius: 0.2em;
  border-color: #7b7b7b;
`

export const SearchButtonText = styled.span`
  color: var(--white);
`

const SearchBuilding = () => {
  const mapStyles = {
    height: '500px',
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

  const [buildingInformationContext, setBuildingInformationContext] = useContext(
    BuildingInformationContext)
  console.log(buildingInformationContext)


  const onSearch = async () => {
    console.log(searchValue)
    const result = await getLatLngFromAddress(searchValue?.value?.description)

    let information = {
      buildingName: searchValue?.value?.structured_formatting?.main_text,
      address: '',
      city: '',
      state: '',
      country: '',
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
        information.country += item.long_name
      } else if (item.types.includes('postal_code')) {
        information.postalCode += item.long_name
      } else if (item.types.includes('administrative_area_level_1')) {
        information.state += item.long_name
      } else if (item.types.includes('administrative_area_level_2')) {
        information.suburb += item.long_name
      }

    }
    console.log(information)
    setBuildingInformationContext(information)
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

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="form-group col-12 col-lg-12">
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
      </div>

      <div className="row">
        <div className="col-8"> {buildingInformationContext &&
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

        {buildingInformationContext && <div className="col-4">
          <h2 className="text-primary">Is it your building?</h2>
          <Link to="adding-building/general-information">
            <button className="btn btn-primary btn-md">Next ></button>
          </Link>
        </div>}
      </div>
    </>
  )
}

export default SearchBuilding
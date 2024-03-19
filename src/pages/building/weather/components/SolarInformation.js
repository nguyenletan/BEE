import React, {useEffect} from 'react';
import {get15DayForecastWeather} from '../../../../api/WeatherAPI';
import {getWeatherIcon} from '../../../../WeatherIcons';
import {EuiAccordion, EuiPanel} from '@elastic/eui';
import styled from 'styled-components';
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
} from '@react-google-maps/api';
import {number} from 'prop-types';

const Wrapper = styled.section`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const H5 = styled.h5`
  font-weight: 700;
  margin-bottom: .25em;
`;

const H4 = styled.h4`
  font-weight: 700;
  font-size: 1.1em;
`;

const Information = styled.div`
  display: flex;
  width: 300px;
  gap: 20px;
  padding: 10px;
  justify-content: space-between;
  align-items: flex-start;
`;

const Description = styled.p`
  font-size: 0.85em;
`;

const SolarInformation = (props) => {
  const {lat, lon, buildingGeneralInfo} = props;
  const mapStyles = {
    height: '493px',
    width: '100%',
  }

  const divStyle = {
    width: 'auto',
    maxWidth: '180px',
    minWidth: '80px',
    height: 'auto',
    minHeight: '50px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: '#303246',
    color: '#F9F3F2',
    padding: '10px',
    marginLeft: '0px',
    marginTop: '0px',
    borderRadius: '10px',
    opacity: 0.8,
  }

  const [weatherInfo, setWeatherInfo] = React.useState({});

  useEffect(() => {

    if (lat && lon) {
      // get15DayForecastWeather(lat, lon).then((res) => {
      //   setWeatherInfo(res);
      //   console.log(res);
      // });
    }
  }, [lat, lon]);

  const buttonContent = (
      <div className="d-flex align-items-center">
        {weatherInfo && weatherInfo?.days && weatherInfo?.days.length > 0 && (
            <img className="me-3"
                 src={getWeatherIcon(weatherInfo?.days[1].icon)}
                 alt={weatherInfo?.days[1].icon}
                 width="32px"/>)}
        <H4 className="font-bold">Solar Information</H4>

      </div>
  );

  console.log('lat, lon: ', lat, lon)
  console.log('typeof lat ', typeof lat)
  //40.72601909999999 -74.00157540000001
  //40.72601909999999 -74.00157540000001

  return (

      <EuiAccordion initialIsOpen={true} className="mb-5"
                    buttonContent={buttonContent}>
        <EuiPanel color="subdued">

          <Wrapper>
            {/*<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>*/}
            {  lat  &&  lon  &&(
             <GoogleMap mapContainerStyle={mapStyles} zoom={20}
                         center={{lat: +lat, lng: +lon}}>
                <OverlayView position={{lat: +lat, lng: +lon}}
                             mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                  <div
                      style={divStyle}>{buildingGeneralInfo.name}</div>
                </OverlayView>
                <Marker
                    position={{lat: lat, lng: lon}}
                    title={'searchValue'}
                    zIndex={1}>
                </Marker>
            </GoogleMap>)}
            {/*</LoadScript>*/}
          </Wrapper>
        </EuiPanel>
      </EuiAccordion>
  );
};
export default SolarInformation;

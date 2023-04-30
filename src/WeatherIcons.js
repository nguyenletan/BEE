import clearDay from './assets/images/weather/clear-day.svg'
import clearNight from './assets/images/weather/clear-night.svg'
import cloudy from './assets/images/weather/cloudy.svg'
import fog from './assets/images/weather/fog.svg'
import hail from './assets/images/weather/hail.svg'
import partlyCloudyDay from './assets/images/weather/partly-cloudy-day.svg'
import partlyCloudyNight from './assets/images/weather/partly-cloudy-night.svg'
import rain from './assets/images/weather/rain.svg'
import rainSnow from './assets/images/weather/rain-snow.svg'
import rainSnowShowersDay from './assets/images/weather/rain-snow-showers-day.svg'
import rainSnowShowersNight from './assets/images/weather/rain-snow-showers-night.svg'
import showersDay from './assets/images/weather/showers-day.svg'
import showersNight from './assets/images/weather/showers-night.svg'
import sleet from './assets/images/weather/sleet.svg'
import snow from './assets/images/weather/snow.svg'
import snowShowersDay from './assets/images/weather/snow-showers-day.svg'
import snowShowersNight from './assets/images/weather/snow-showers-night.svg'
import thunder from './assets/images/weather/thunder.svg'
import thunderRain from './assets/images/weather/thunder-rain.svg'
import thunderShowersDay from './assets/images/weather/thunder-showers-day.svg'
import thunderShowersNight from './assets/images/weather/thunder-showers-night.svg'
import wind from './assets/images/weather/wind.svg'


//import snowIcon from './assets/snow.png';

export const getWeatherIcon = (weather) => {
  console.log(weather)
  switch (weather) {
    case 'clear-day':
      return clearDay
    case 'clear-night':
      return clearNight
    case 'cloudy':
      return cloudy
    case 'fog':
      return fog
    case 'hail':
      return hail
    case 'partly-cloudy-day':
      return partlyCloudyDay
    case 'partly-cloudy-night':
      return partlyCloudyNight
    case 'rain':
      return rain
    case 'rain-snow':
      return rainSnow
    case 'rain-snow-showers-day':
      return rainSnowShowersDay
    case 'rain-snow-showers-night':
      return rainSnowShowersNight
    case 'showers-day':
      return showersDay
    case 'showers-night':
      return showersNight
    case 'sleet':
      return sleet
    case 'snow':
      return snow
    case 'snow-showers-day':
      return snowShowersDay
    case 'snow-showers-night':
      return snowShowersNight
    case 'thunder':
      return thunder
    case 'thunder-rain':
      return thunderRain
    case 'thunder-showers-day':
      return thunderShowersDay
    case 'thunder-showers-night':
      return thunderShowersNight
    case 'wind':
      return wind
    default:
      return null

  }
}

export const showerRainSvg = () => {

  return (
    <svg data-v-3cdad65e="" width="50px" height="50px" viewBox="0 0 148 148" className="owm-weather-icon">
      <path
        d="M79.92 95.53l.422-1.131a2.172 2.172 0 10-4.067-1.523l-.422 1.133a2.171 2.171 0 104.067 1.521M67.17 51.652c.517 0 1.023.046 1.517.115a12.517 12.517 0 01-.277-2.597c0-6.85 5.555-12.4 12.404-12.4 6.664 0 12.084 5.26 12.372 11.852a7.407 7.407 0 014.991-1.93 7.44 7.44 0 017.44 7.44c0 .938-.181 1.832-.496 2.655a8.81 8.81 0 011.738-.173 8.68 8.68 0 110 17.36H67.17c-6.165 0-11.161-4.995-11.161-11.16 0-6.163 4.996-11.162 11.161-11.162"
        fill="#3b3c40"></path>
      <path
        d="M45.702 61.724c.612 0 1.207.055 1.8.136a14.629 14.629 0 01-.33-3.078c0-8.126 6.587-14.714 14.713-14.714 7.907 0 14.336 6.24 14.68 14.061a8.782 8.782 0 015.918-2.291 8.829 8.829 0 018.827 8.828c0 1.111-.215 2.17-.589 3.149a10.393 10.393 0 012.06-.206c5.687 0 10.299 4.61 10.299 10.299 0 5.687-4.612 10.3-10.3 10.3H45.702c-7.312 0-13.243-5.93-13.243-13.242 0-7.313 5.93-13.242 13.243-13.242"
        fill="#efefed"></path>
      <path
        d="M74.418 110.243l1.48-3.961a1.514 1.514 0 00-.89-1.954l-1.226-.459a1.518 1.518 0 00-1.951.89l-1.48 3.964a1.515 1.515 0 00.889 1.952l1.226.458a1.517 1.517 0 001.952-.89M65.423 101.228l1.783-4.765a1.515 1.515 0 00-.89-1.953l-1.226-.458a1.515 1.515 0 00-1.952.889l-1.784 4.766a1.516 1.516 0 00.89 1.952l1.226.459a1.518 1.518 0 001.953-.89M62.733 108.422l.274-.73a2.171 2.171 0 10-4.07-1.523l-.272.732a2.171 2.171 0 104.068 1.52M57.757 89.471l.722-1.935a2.171 2.171 0 10-4.068-1.52l-.724 1.935a2.173 2.173 0 001.272 2.794 2.176 2.176 0 002.798-1.274M52.753 102.849l1.782-4.764a1.52 1.52 0 00-.89-1.954l-1.226-.459a1.515 1.515 0 00-1.951.89l-1.784 4.766a1.516 1.516 0 00.889 1.952l1.226.458a1.516 1.516 0 001.954-.89"
        fill="#3b3c40"></path>
    </svg>
  )
}


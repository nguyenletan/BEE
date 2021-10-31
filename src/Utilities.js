import coolingImg from './assets/images/cooling.svg'
import openingsImg from './assets/images/openings.svg'
import lightingImg from './assets/images/lighting.svg'
import heatingImg from './assets/images/heating.svg'
import wallImg from './assets/images/wall.svg'
import mechVentImg from './assets/images/mechanical-ventilation.svg'
import { addMonths, eachWeekOfInterval, lastDayOfMonth, lastDayOfQuarter, startOfQuarter } from 'date-fns'
import moment from 'moment'

export const getCurrentColor = (type) => {
  switch (type) {
    case 'A':
      return '#478D58'
    case 'B':
      return '#63AE62'
    case 'C':
      return '#AACC72'
    case 'D':
      return '#F0EA6F'
    case 'E':
      return '#ecb75f'
    case 'F':
      return '#df7f4f'
    case 'G':
      return '#d94545'
    default:
      return '#fff'
  }
}

export const getPotentialColor = (type) => {
  switch (type) {
    case 'A':
      return '#93d2f0'
    case 'B':
      return '#63bcf2'
    case 'C':
      return '#52a8d9'
    case 'D':
      return '#3c82c6'
    case 'E':
      return '#c4c4c4'
    case 'F':
      return '#a9a9a9'
    case 'G':
      return '#8b8b8b'
    default:
      return '#fff'
  }
}

export const getColorPattern = (lv) => {
  if (lv === 0) {
    return ['#636c2e', '#87972f', '#acbf42', '#c1cf74', '#d5dfa3']
  }

  // return ['#064E3B', '#065F46', '#047857', '#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5', '#ECFDF5']

  return [
    '#3D511B',
    '#95C34A',
    '#4A6321',
    '#A7CD69',
    '#567426',
    '#B9D787',
    '#63852C',
    '#CBE1A6',
    '#7DA838',
    '#D4E7B5',
    '#DDECC5']

}

export const getLikelihoodTitle = (value) => {
  switch (value) {
    case 1:
      return 'Rare'
    case 2:
      return 'Unlikely'
    case 3:
      return 'Possible'
    case 4:
      return 'Likely'
    case 5:
      return 'Almost Certain'
    default:
      return ''
  }
}

export const getImpactTitle = (value) => {
  switch (value) {
    case 1:
      return 'Negligible'
    case 2:
      return 'Minor'
    case 3:
      return 'Moderate'
    case 4:
      return 'Major'
    case 5:
      return 'Critical'
    default:
      return ''
  }
}

export const getSubSystemIcon = (subSystem) => {
  let imgSrc
  let width

  switch (subSystem) {
    case 'Cooling':
      imgSrc = coolingImg
      width = 30
      break
    case 'Openings':
      imgSrc = openingsImg
      width = 45
      break
    case 'Lighting':
      imgSrc = lightingImg
      width = 25
      break
    case 'Heating':
      imgSrc = heatingImg
      width = 20
      break
    case 'Walls':
      imgSrc = wallImg
      width = 40
      break
    case 'Mechanical Ventilation':
      imgSrc = mechVentImg
      width = 40
      break
    default:
      imgSrc = ''
      width = 25
      break
  }
  return {
    imgSrc: imgSrc,
    width: width,
  }
}

export const replaceAll = (str, replaceWith = '+') => {
  const searchRegExp = /\s/g
  if (str) {
    return str.replace(searchRegExp, replaceWith)
  }
  return ''
}

export const getLatLngFromAddress = async (address) => {
  const googleMapAPIEndPoint = 'https://maps.googleapis.com/maps/api/geocode/json'
  let location = null
  const url = googleMapAPIEndPoint + '?address=' + address + '&key=' + process.env.REACT_APP_GOOGLE_API_KEY
  await fetch(url).then(response => response.json()).then(data => {
    console.log(data)
    location = data
    return true
  })
  return location
}

export const getPlaceDetail = async (placeId) => {
  const googleMapAPIEndPoint = 'https://maps.googleapis.com/maps/api/place/details/json'
  let placeDetail = null
  const url = googleMapAPIEndPoint + '?place_id=' + placeId + '&fields=name,rating,formatted_phone_number&key=' +
    process.env.REACT_APP_GOOGLE_API_KEY
  await fetch(url, {
    mode: 'cors',
  }).then(response => response.json()).then(data => {
    console.log(data)
    placeDetail = data
    return true
  })
  return placeDetail
}

export const removeItemAtIndex = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export const replaceItemAtIndex = (arr, index, newValue) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

export const getPrevMonthYear = (month, year) => {
  let tmp = new Date(`${year}/${month + 1}/01`)
  tmp = addMonths(tmp, -1)
  return {
    month: tmp.getMonth(),
    year: tmp.getFullYear(),
  }
}

export const getNextMonthYear = (month, year) => {
  let tmp = new Date(`${year}/${month + 1}/01`)
  tmp = addMonths(tmp, 1)
  return {
    month: tmp.getMonth(),
    year: tmp.getFullYear(),
  }
}

export const printDateTime = (dateString, localeString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(localeString) + ' ' + date.toLocaleTimeString(localeString)
}

export const formatNumber = (num, decimal = 2, unit = '') => {
  if (num && typeof num === 'number') {
    return (
      num.toFixed(decimal) // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      + ' ' + unit
    ) // use . as a separator
  }
  return '---'
}

export const years = (from, to) => {
  const result = []
  for (let i = to; i >= from; i--) {
    result.push(i)
  }
  return result
}

export const quarters = () => {
  return ['Q1', 'Q2', 'Q3', 'Q4']
}

export const months = () => {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

export const getMonthName = (month) => {
  switch (month) {
    case 1:
      return 'Jan'
    case 2:
      return 'Feb'
    case 3:
      return 'Mar'
    case 4:
      return 'Apr'
    case 5:
      return 'May'
    case 6:
      return 'Jun'
    case 7:
      return 'Jul'
    case 8:
      return 'Aug'
    case 9:
      return 'Sep'
    case 10:
      return 'Oct'
    case 11:
      return 'Nov'
    case 12:
      return 'Dec'
    default:
      return 'Error'
  }
}

export const shortMonthOptions = () => {
  return [
    {
      value: 1,
      text: 'Jan',
    },
    {
      value: 2,
      text: 'Feb',
    },
    {
      value: 3,
      text: 'Mar',
    },
    {
      value: 4,
      text: 'Apr',
    },
    {
      value: 5,
      text: 'May',
    },
    {
      value: 6,
      text: 'Jun',
    },
    {
      value: 7,
      text: 'Jul',
    },
    {
      value: 8,
      text: 'Aug',
    },
    {
      value: 8,
      text: 'Sep',
    },
    {
      value: 10,
      text: 'Oct',
    },
    {
      value: 11,
      text: 'Nov',
    },
    {
      value: 12,
      text: 'Dec',
    },
  ]
}

export const quarterOptions = () => {
  return [
    {
      value: 1,
      text: 'Q1',
    },
    {
      value: 2,
      text: 'Q2',
    },
    {
      value: 3,
      text: 'Q3',
    },
    {
      value: 4,
      text: 'Q4',
    },
  ]
}

export const weekOptions = (year) => {
  const weeks = eachWeekOfInterval({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31),
  }, { weekStartsOn: 1 })
  return weeks.map((w, index) => {
      return {
        value: index + 1,
        text: 'week' + (index + 1) + ` (${moment(w).format('D MMM YYYY')})`,
      }
    },
  )

}

export const selectStartYear = (year) => {
  return new Date(year + '-01-01')
}

export const selectEndYear = (year) => {
  return new Date(year + '-12-31')
}

export const selectStartQuarter = (year, quarter) => {
  const month = quarter * 3
  return startOfQuarter(
    new Date(year + '-' + month + '-01'),
  )
}

export const selectEndQuarter = (year, quarter) => {
  const month = quarter * 3

  return lastDayOfQuarter(
    new Date(year + '-' + month + '-01'),
  )
}

export const selectStartMonth = (year, month) => {
  return new Date(year + '-' + month + '-01')
}

export const selectEndMonth = (year, month) => {
  return lastDayOfMonth(
    new Date(year + '-' + month + '-01'),
  )
}

export const calculatePrevDay = (
  value,
  index,
  prev12MonthsElectricityConsumptionsFromHistorizedLogs,
  electricConsumptionsFromHistorizedLogs) => {

  if (index >= 1) {
    return value - electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay[index - 1].value
  } else {
    return value -
      prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
      1].value
  }
}

export const calculateDayLastWeek = (
  value,
  index,
  prev12MonthsElectricityConsumptionsFromHistorizedLogs,
  electricConsumptionsFromHistorizedLogs) => {

  if (index >= 7) {
    return value - electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay[index - 7].value
  } else {
    return value -
      prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay.length -
      index].value
  }
}

export const calculateAverageSameDayInLast4Week = (
  value,
  index,
  prev12MonthsElectricityConsumptionsFromHistorizedLogs,
  electricConsumptionsFromHistorizedLogs) => {

  console.log(electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay)

  if (index >= 21) {
    return (value + electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay[index - 7].value
      + electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay[index - 14].value
      + electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay[index - 21].value) / 4
  } else {
    const mergeArray = [
      ...prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay,
      ...electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay]
    const newIndex = index + prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByDay.length
    return (value + mergeArray[newIndex - 7].value + mergeArray[newIndex - 14].value + mergeArray[newIndex - 21].value) / 3
  }
}

export const calculateSameThingLastYear = (
  value,
  index,
  prev12MonthsElectricityConsumptionsFromHistorizedLogs,
  electricConsumptionsFromHistorizedLogs,
  energyPerformanceGroupBy) => {
  switch (energyPerformanceGroupBy) {
    case 'year':
      if (index >= 1) {
        return value - electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 1].value
      } else {
        return value - prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index].value
      }
    case 'quarter':
      if (index >= 4) {
        return value - electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter[index - 4].value
      } else {
        return value - prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter[index].value
      }
    case 'month':
    default:
      if (index >= 12) {
        return value - electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth[index - 12].value
      } else {
        return value - prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth[index].value
      }
  }

}

// Year: Average of previous 2 years
export const calculateSameThingLastPeriod = (
  value,
  index,
  prev12MonthsElectricityConsumptionsFromHistorizedLogs,
  electricConsumptionsFromHistorizedLogs,
  energyPerformanceGroupBy) => {

  switch (energyPerformanceGroupBy) {
    case 'year':
      return 0
    // if (index >= 2) {
    //   return value - (electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 1].value +
    //     electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 2].value) / 2
    // } else {
    //   if (index >= 1) {
    //     return value - (electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 1].value +
    //       prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //       1].value) / 2
    //   } else {
    //     return value - (
    //       prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //       1].value +
    //       prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //       2].value) / 2
    //   }
    // }
    case 'quarter':
      if (index > 0) {
        return value - electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter[index - 1].value
      } else {
        return value -
          prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter.length -
          1].value
      }
    case 'month':
    default:
      if (index > 0) {
        return value - electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth[index - 1].value
      } else {
        return value -
          prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth.length -
          1].value
      }
  }

}

// Year: Average of previous 3 years
export const calculate12MonthPeriod = (
  value,
  index,
  prev24MonthsElectricityConsumptionsFromHistorizedLogs,
  prev12MonthsElectricityConsumptionsFromHistorizedLogs,
  electricConsumptionsFromHistorizedLogs,
  energyPerformanceGroupBy) => {

  let mergeArray, idx

  switch (energyPerformanceGroupBy) {
    case 'year':

      // mergeArray = [
      //   ...prev24MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear,
      //   ...prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear,
      //   ...electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear]
      //
      // const groupByYear = Object.entries(_.groupBy(mergeArray, 'year'))
      //
      // console.log(groupByYear)
      return 0
    // if (index >= 3) {
    //   return value - (electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 1].value +
    //     electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 2].value +
    //     electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 2].value
    //   ) / 3
    // } else {
    //   if (index >= 2) {
    //     return value - (electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 1].value +
    //       electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 2].value +
    //       prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //       1].value) / 3
    //   } else {
    //     if (index >= 1) {
    //       return value - (electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[index - 1].value +
    //         prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //         1].value +
    //         prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //         -2].value) / 3
    //     }
    //     return value - (
    //       prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //       1].value +
    //       prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //       2].value +
    //       prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear[prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByYear.length -
    //       3].value) / 3
    //   }
    // }
    case 'quarter':
      mergeArray = [
        ...prev24MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter,
        ...prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter,
        ...electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter]
      idx = index +
        prev24MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter.length +
        prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByQuarter.length

      let sumCurrent4Quarter = 0
      for (let i = idx; i > idx - 4 && i >= 0; i--) {
        sumCurrent4Quarter += mergeArray[i].value
      }
      let sumPrev4Month = 0
      for (let i = idx; i > idx - 8 && i >= 0; i--) {
        sumPrev4Month += mergeArray[i].value
      }
      return sumCurrent4Quarter - sumPrev4Month

    case 'month':
    default:
      mergeArray = [
        ...prev24MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth,
        ...prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth,
        ...electricConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth]
      idx = index +
        prev24MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth.length +
        prev12MonthsElectricityConsumptionsFromHistorizedLogs.electricConsumptionGroupByMonth.length

      let sumCurrent12Month = 0
      for (let i = idx; i > idx - 12 && i >= 0; i--) {
        sumCurrent12Month += mergeArray[i].value
      }

      let sumPrev12Month = 0
      for (let i = idx; i > idx - 24 && i >= 0; i--) {
        sumPrev12Month += mergeArray[i].value
      }
      return sumCurrent12Month - sumPrev12Month

  }

}

export const formatDate = (date) => {
  return moment(date).format('D MMM YYYY')
}

export const getTheTimeDifference = (datetime1, datetime2, measurement='days') => {
  return moment(datetime1).diff(datetime2, measurement)
}

export const deepClone = (source) => {
  return JSON.parse(JSON.stringify(source))
}
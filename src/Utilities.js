import coolingImg from './assets/images/cooling.svg'
import openingsImg from './assets/images/openings.svg'
import lightingImg from './assets/images/lighting.svg'
import heatingImg from './assets/images/heating.svg'
import wallImg from './assets/images/wall.svg'



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
  switch (type){
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
    default:
      imgSrc = ''
      width = 25
      break
  }
  return {
    imgSrc: imgSrc,
    width: width
  }

}
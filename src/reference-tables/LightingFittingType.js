import LEDImage from '../assets/images/LED.webp'
import compactFluorescentLampImage from '../assets/images/compact-fluorescent-lamp.webp'
import fluorescentTubeImage from '../assets/images/fluorescent-tube.webp'

const LightingFittingType = [
  {
    id: 1,
    name: 'LED',
  },
  {
    id: 2,
    name: 'Compact Fluorescent Lamp',
  },
  {
    id: 3,
    name: 'Fluorescent T5 Tube',
  },
  {
    id: 4,
    name: 'Fluorescent T8 Tube',
  },
  {
    id: 5,
    name: 'Fluorescent T12 Tube',
  },
  {
    id: 6,
    name: 'Others',
  },
]

export const getLightingFittingTypeName = (id) => {
  for (let item of LightingFittingType) {
    if (item.id === id) {
      return item.name
    }
  }
}

export const getLightingFittingTypeImage = (id) => {
  switch (id) {
    case 1:
      return LEDImage
    case 2:
      return compactFluorescentLampImage
    case 3:
    case 4:
    case 5:
      return fluorescentTubeImage
    default:
      return null
  }
}

export default LightingFittingType

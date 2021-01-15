

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
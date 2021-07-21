import React from 'react'
import BreakDown from '../../../../components/BreakDown'

const MaintenanceBudget = ({ data }) => {
  return (
    <BreakDown
      title='Maintenance Budget'
      startAngle={-0}
      data={data}
      innerRadius={0.88}
      isCenteredPercentage
      marginRight='0px'
      hasDescription
    />
  )
}

export default MaintenanceBudget

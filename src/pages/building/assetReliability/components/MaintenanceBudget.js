import React from 'react'
import BreakDown from '../../../../components/BreakDown'
import { useTranslation } from 'react-i18next'

const MaintenanceBudget = ({ data }) => {
  const { t } = useTranslation('assetReliability')
  return (
    <BreakDown
      title={t('Maintenance Budget')}
      startAngle={-0}
      data={data}
      innerRadius={0.58}
      isCenteredPercentage
      marginRight='0px'
      hasDescription
      hasArcLabels={false}
    />
  )
}

export default MaintenanceBudget

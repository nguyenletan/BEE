import React, { useEffect, useState } from 'react'
import BreakDown from '../../../../components/BreakDown'
import { useTranslation } from 'react-i18next'
import { deepClone } from 'Utilities'

const MaintenanceBudget = ({ data }) => {
  const { t, i18n } = useTranslation('assetReliability')

  const [dataSource, setDataSource] = useState(data)

  useEffect(() => {

    const tmp = deepClone(data)

    for(let item of tmp) {
      item.id = t(item.id)
    }


    setDataSource(tmp)

  }, [data, i18n.language, t])

  return (
    <BreakDown
      title={t('Maintenance Budget')}
      startAngle={-0}
      data={dataSource}
      innerRadius={0.58}
      isCenteredPercentage
      marginRight='0px'
      hasDescription
      hasArcLabels={false}
    />
  )
}

export default MaintenanceBudget

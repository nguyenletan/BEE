import React, { useContext } from 'react'

import GeneralInformationFrom from './GeneralInformationFrom'
import { BuildingInformationContext } from '../AddingBuilding'



const GeneralInformation = () => {

  const [buildingInformationContext] = useContext(BuildingInformationContext);

  return (
      <GeneralInformationFrom data={buildingInformationContext}/>
  )
}

export default GeneralInformation
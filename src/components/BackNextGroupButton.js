import React from 'react'
import Progress from './Progress'
import { Button } from '@material-ui/core'
import { ArrowBack, ArrowForward, DoneAll, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import {
  buildingActivityState,
  coolingSystemState,
  electricityConsumptionListState,
  envelopFacadeState,
  generalBuildingInformationState,
  heatingSystemState,
  lightingSubSystemListState,
  solarPanelSystemListState,
  spaceUsageGFAListState,
} from '../atoms'
import { createBuilding } from '../api/BuildidingAPI'
import { useAuth } from '../AuthenticateProvider'

const BackNextGroupButton = ({
  backLink,
  nextLink,
  progressValue,
  isDisabledSave,
  noNextLink,
  isInDoneStep,
  // submitFunc,
}) => {
  const generalBuildingInformation = useRecoilValue(
    generalBuildingInformationState)

  const buildingActivity = useRecoilValue(buildingActivityState)

  const spaceUsageGFAList = useRecoilValue(spaceUsageGFAListState)
  const lightingSubSystemList = useRecoilValue(lightingSubSystemListState)
  const solarPanelSystemList = useRecoilValue(solarPanelSystemListState)
  const electricityConsumptionList = useRecoilValue(
    electricityConsumptionListState)
  const coolingSystem = useRecoilValue(coolingSystemState)
  const heatingSystem = useRecoilValue(heatingSystemState)
  const envelopFacade = useRecoilValue(envelopFacadeState)

  // const [setSavingMessage] = useState(null)

  //const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(isDisabledSave || progressValue < 100)

  const { user } = useAuth()

  const onSave = async (e) => {
    const submitData = {
      generalBuildingInformation: generalBuildingInformation,
      buildingActivity: buildingActivity,
      spaceUsageGFAList: spaceUsageGFAList,
      lightingSubSystemList: lightingSubSystemList,
      solarPanelSystemList: solarPanelSystemList,
      electricityConsumptionList: electricityConsumptionList,
      coolingSystem: coolingSystem,
      heatingSystem: heatingSystem,
      envelopFacade: envelopFacade,
    }
    const idToken = await user.getIdToken()
    const message = await createBuilding(submitData, idToken)
    console.log(message)
    // setSavingMessage(message)
  }

  return (
    <>
      {/* {savingMessage && <Message text={savingMessage}/>} */}
      {
        isInDoneStep === true ? (
          <div className="d-flex ms-auto align-items-center">
            {progressValue !== undefined && <Progress value={progressValue}/>}
            {backLink && <Link to={backLink}>
              <Button
                startIcon={<ArrowBack/>}
                variant="contained"
                color="default"
                className="me-2"
              >Back
              </Button>
            </Link>}
            <Link to="/portfolio">
              <Button
                endIcon={<DoneAll/>} variant="contained" color="primary"
                className="me-2"
              >Done
              </Button>
            </Link>
          </div>) : (

          <div className="d-flex ms-auto align-items-center">

            {progressValue !== undefined && <Progress value={progressValue}/>}

            <Button
              onClick={onSave}
              type="submit"
              size="medium"
              startIcon={<Save/>}
              variant="contained"
              disabled={isDisabledSave}
              color="primary" className="me-5"
            >Save
            </Button>

            {backLink && <Link to={backLink}>
              <Button
                startIcon={<ArrowBack/>} variant="contained"
                color="default"
                className="me-2"
              >Back
              </Button>
            </Link>}

            {!noNextLink &&
            <Button
              type="submit" endIcon={<ArrowForward/>} variant="contained"
              color="primary"
            >Next
            </Button>}

          </div>
        )
      }
    </>
  )
}

export default BackNextGroupButton

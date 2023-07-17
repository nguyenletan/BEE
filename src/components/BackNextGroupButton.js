/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Progress from './Progress'
import { Button, CircularProgress } from '@mui/material'
import { ArrowBack, ArrowForward, DoneAll, Save } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import {
  buildingActivityState,
  coolingSystemState,
  electricityConsumptionListState,
  heatConsumptionListState,
  envelopFacadeState,
  generalBuildingInformationState,
  heatingSystemState,
  lightingSubSystemListState,
  solarPanelSystemListState,
  spaceUsageGFAListState,
} from 'atoms'
import { createBuilding, updateBuilding } from 'api/BuildidingAPI'
import { useAuth } from 'AuthenticateProvider'
import { useTranslation } from 'react-i18next'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const popupStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
}

const loadingStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  p: 3,
}

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

  const heatConsumptionList = useRecoilValue(
      heatConsumptionListState)

  const coolingSystem = useRecoilValue(coolingSystemState)
  const heatingSystem = useRecoilValue(heatingSystemState)
  const envelopFacade = useRecoilValue(envelopFacadeState)

  // const [setSavingMessage] = useState(null)

  //const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(isDisabledSave || progressValue < 100)

  const { user } = useAuth()
  const { id } = useParams()
  const { t } = useTranslation('buildingInput')

  const [isOpenSavingPopup, setIsOpenSavingPopup] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const onSave = async (e) => {
    const submitData = {
      generalBuildingInformation: generalBuildingInformation,
      buildingActivity: buildingActivity,
      spaceUsageGFAList: spaceUsageGFAList,
      lightingSubSystemList: lightingSubSystemList,
      solarPanelSystemList: solarPanelSystemList,
      electricityConsumptionList: electricityConsumptionList,
      heatConsumptionList: heatConsumptionList,

      coolingSystem: coolingSystem,
      heatingSystem: heatingSystem,
      envelopFacade: envelopFacade,
    }
    const idToken = await user.getIdToken()
    setIsOpenSavingPopup(true)
    setIsSaving(true)
    const message = id
      ? await updateBuilding(id, submitData, idToken)
      : await createBuilding(submitData, idToken)
    setIsSaving(false)


    //setSavingMessage(message)
  }

  const handleClosePopup = (e) => {
    setIsOpenSavingPopup(false)
  }

  const Popup = ({ title, description }) => (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpenSavingPopup}
      onClose={handleClosePopup}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >

      {!isSaving ? <Box sx={popupStyle}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          <Button onClick={handleClosePopup}>Close</Button>
        </Box> :

        <Box sx={loadingStyle}><CircularProgress size="8rem"
                                                 color="success"/></Box>}
      {/*<CircularProgress size="8rem" color="success"/>*/}
    </Modal>
  )

  return (
    <>
      {/* {savingMessage && <Message text={savingMessage}/>} */}

      <Popup title="Your building has been saved"/>
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
              >{t('Back')}
              </Button>
            </Link>}
            <Link to="/building">
              <Button
                endIcon={<DoneAll/>} variant="contained" color="primary"
                className="me-2"
              >{t('Done')}
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
              // disabled={isDisabledSave}
              color="primary" className="me-5"
            >{t('Save')}
            </Button>

            {backLink && <Link to={backLink}>
              <Button
                startIcon={<ArrowBack/>} variant="contained"
                color="primary"
                className="me-2"
              >{t('Back')}
              </Button>
            </Link>}

            {!noNextLink && <Link to={nextLink}>
              <Button to={nextLink}
                // type="submit"
                      endIcon={<ArrowForward/>} variant="contained"
                      color="primary"
              >{t('Next')}
              </Button></Link>
            }

          </div>
        )
      }
    </>
  )
}

export default BackNextGroupButton

import React from 'react'
import Progress from '../../../components/Progress'
import { Button } from '@material-ui/core'
import { ArrowBack, ArrowForward, DoneAll, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const BackNextGroupButton = ({
  backLink,
  nextLink,
  progressValue,
  isDisabledSave,
  noNextLink,
  isInDoneStep,
  //submitFunc,
}) => {

  return isInDoneStep === true ? (
    <div className="d-flex ms-auto align-items-center">
      {progressValue !== undefined && <Progress value={progressValue}/>}
      {backLink && <Link to={backLink}>
        <Button startIcon={<ArrowBack/>} variant="contained" color="default"
                className="me-2">Back
        </Button>
      </Link>}
      <Link to="/">
        <Button endIcon={<DoneAll/>} variant="contained" color="primary"
                className="me-2">Done
        </Button>
      </Link>
    </div>) : (

    <div className="d-flex ms-auto align-items-center">

      {progressValue !== undefined && <Progress value={progressValue}/>}

      <Button type="submit" size="medium" startIcon={<Save/>}
              variant="contained"
              disabled={isDisabledSave}
              color="primary" className="me-5">Save</Button>

      {backLink && <Link to={backLink}>
        <Button startIcon={<ArrowBack/>} variant="contained" color="default"
                className="me-2">Back
        </Button>
      </Link>}

      {!noNextLink &&
      <Button type="submit" endIcon={<ArrowForward/>} variant="contained"
              color="primary">Next</Button>}

    </div>
  )

}

export default BackNextGroupButton
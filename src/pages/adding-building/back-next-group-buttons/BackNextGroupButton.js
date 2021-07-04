import React from 'react'
import Progress from '../../../components/Progress'
import { Button } from '@material-ui/core'
import { ArrowBack, ArrowForward, Save } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const BackNextGroupButton = ({
  backLink,
  nextLink,
  progressValue,
  isDisabledSave,
  //submitFunc,
}) => {

  return (

    <div className="d-flex ms-auto align-items-center">

      {progressValue !== undefined && <Progress value={progressValue}/>}

      <Button size="medium" startIcon={<Save/>} variant="contained"
              disabled={isDisabledSave}
              color="primary" className="me-5">Save</Button>

      {backLink && <Link to={backLink}>
        <Button startIcon={<ArrowBack/>} variant="contained" color="default"
                className="me-2">Back
        </Button>
      </Link>}


      <Button type="submit" endIcon={<ArrowForward/>} variant="contained"
              color="primary">Next</Button>

    </div>

  )
}

export default BackNextGroupButton
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Alert, AlertTitle } from '@mui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default function Message ({ text }) {
  const classes = useStyles()

  const [isHide, setIsHide] = useState(false)

  useEffect(() => {
    console.log('message is timeout')
    setTimeout(() => setIsHide(true), 1000)
  }, [])

  return (
    <>
      {!isHide && (<div className={classes.root}>
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          {text}
        </Alert>
      </div>)}
    </>
  )
}

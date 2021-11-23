import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { withStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

const BeeLinearProgress = withStyles((theme) => ({
  root: {
    height: 35,
    borderRadius: 5,
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 12%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
  },
  bar: {

  },
  colorPrimary: {
    // backgroundColor: 'rgba(174,213,129,.9)'
  },
}))(LinearProgress)

const textStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '8px',
    left: '53px',
    color: '#f9f9f9',
    fontWeight: '500'
  }
})

function LinearProgressWithLabel (props) {
  const classes = textStyles()
  const { t } = useTranslation('buildingInput')
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1} className='position-relative'>
        <BeeLinearProgress variant='determinate' {...props} />
        <Typography variant='body2' color='textSecondary' className={classes.root}>{`${Math.round(
          props.value
        )}% `}{t('Complete')}
        </Typography>
      </Box>
    </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
}

const useStyles = makeStyles({
  root: {
    width: 200
  }
})

const Progress = ({ value }) => {
  const classes = useStyles()
  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress(
  //       (prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10))
  //   }, 800)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  return (
    <Box className={classes.root + ' me-1'}>
      <LinearProgressWithLabel value={value} />
    </Box>
  )
}

export default Progress

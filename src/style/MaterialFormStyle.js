import { makeStyles } from '@material-ui/core'

const MaterialFormStyle = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default MaterialFormStyle

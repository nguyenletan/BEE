import { makeStyles } from '@material-ui/core'

const MaterialFormStyle = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: '100%',
  },
  smallFormControl: {
    marginBottom: 0,
  },
  unit: {
    paddingLeft: '5px',
    //color: '#f9f3f2',
    //background: '#87972f'
  },
  valueUnit: {
    minWidth: '270px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}))

export default MaterialFormStyle

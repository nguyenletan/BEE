import React from 'react'
import styled from 'styled-components'
import 'date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { useRecoilState } from 'recoil'
import { electricityConsumptionListState } from '../../../atoms'
import { removeItemAtIndex } from '../../../Utilities'

// const Input = styled.input`
//   border-color: #7b7b7b;
// `

const Subtraction = styled.span`
  cursor: pointer;
  color: var(--primary);

  i {
    font-size: 24px;
  }
`

const OneMonthElectricityConsumption = ({ data }) => {
  console.log(data)
  const [selectedDate, setSelectedDate] = React.useState(`${data.year}/${data.month + 1}/01`
    //new Date("2014-08-18T21:11:54")
  )

  const [electricityConsumptionList, setElectricityConsumptionList] = useRecoilState(
    electricityConsumptionListState)

  const onRemoveItem = () => {
    const index = electricityConsumptionList.findIndex(
      (listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(electricityConsumptionList, index)
    setElectricityConsumptionList(newList)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  return (
    <li className="row mb-4">
      <div className="col-3">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="flex-start">
            <KeyboardDatePicker
              variant="inline"
              openTo="year"
              views={['year', 'month']}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div className="col-3">
        <Input type="number"
               id="value" placeholder="Value"/>
      </div>
      <div className="col-3">
        <Input type="number"
               id="cost" placeholder="Cost"/>
      </div>
      <div className="col-3">
        <Subtraction title="Remove Item" onClick={onRemoveItem}>
          <i className="bi bi-dash-circle-fill"/>
        </Subtraction>
      </div>
    </li>
  )
}

export default OneMonthElectricityConsumption
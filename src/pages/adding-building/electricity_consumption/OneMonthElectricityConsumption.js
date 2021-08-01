import React from 'react'
import styled from 'styled-components'
import 'date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import RemoveIcon from '@material-ui/icons/Remove'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { useRecoilState } from 'recoil'

import { electricityConsumptionListState } from '../../../atoms'
import { removeItemAtIndex, replaceItemAtIndex } from '../../../Utilities'

const Subtraction = styled(RemoveIcon)`
  cursor: pointer;
  color: var(--bs-primary);
`

const OneMonthElectricityConsumption = ({ data }) => {
  // console.log(data)
  const [selectedDate, setSelectedDate] = React.useState(`${data.year}/${data.month + 1}/01`
    // new Date("2014-08-18T21:11:54")
  )

  const [electricityConsumptionList, setElectricityConsumptionList] = useRecoilState(electricityConsumptionListState)

  const onRemoveItem = () => {
    const index = electricityConsumptionList.findIndex((listItem) => listItem.id === data.id)

    const newList = removeItemAtIndex(electricityConsumptionList, index)
    setElectricityConsumptionList(newList)
  }

  const onDateChange = (date) => {
    /// console.log(date)
    // console.log(date.getFullYear())
    setSelectedDate(date)
    const index = electricityConsumptionList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(electricityConsumptionList, index, {
      ...data,
      month: date.getMonth(),
      year: date.getFullYear()
    })

    setElectricityConsumptionList(newList)
  }

  const onChange = (e) => {
    const index = electricityConsumptionList.findIndex((o) => o.id === data.id)
    const newList = replaceItemAtIndex(electricityConsumptionList, index, {
      ...data,
      [e.target.name]: e.target.value
    })

    setElectricityConsumptionList(newList)
  }

  return (
    <li className='row mb-4'>

      <div className='col-3'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent='flex-start'>
            <KeyboardDatePicker
              variant='inline'
              openTo='year'
              views={['year', 'month']}
              value={selectedDate}
              onChange={onDateChange}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>

      <div className='col-3'>
        <Input
          type='number'
          onChange={onChange}
          value={data.cost}
          name='cost'
          id='cost' placeholder='Cost'
        />
      </div>

      <div className='col-3'>
        <Input
          type='number'
          name='value'
          onChange={onChange}
          value={data.value}
          id='value' placeholder='Value'
        />
      </div>

      <div className='col-3'>
        <Subtraction
          titleAccess='Remove Item' onClick={onRemoveItem}
          fontSize='large'
        />
      </div>
    </li>
  )
}

export default OneMonthElectricityConsumption

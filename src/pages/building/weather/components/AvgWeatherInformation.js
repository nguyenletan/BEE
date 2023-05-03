import styled from 'styled-components'
import { EuiAccordion, EuiPanel } from '@elastic/eui'
import React from 'react'
import { getWeatherIcon } from 'WeatherIcons'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const H4 = styled.h4`
  font-weight: 700;
  font-size: 1.1em;
`

const Summary = styled.p`
  font-size: 0.9em;
  font-weight: 500;

`

function createData (month, tempmax, tempmin, rain, snow, wind, humidity, pressure, uv) {
  return { month, tempmax, tempmin, rain, snow, wind, humidity, pressure, uv }
}

const rows = [
  createData('Jan', 9, 4, 12, 1, 18, 60, 1021.1, 2),
  createData('Feb', 9, 5, 9, 2, 20, 70, 1021.1, 2),
  createData('Mar', 12, 6, 11, 0, 25, 60, 1021.1, 4),
  createData('Apr', 15, 7, 10, 0, 22, 62.9, 1021.1, 5),
  createData('May', 18, 10, 8, 0, 21, 55, 1021.1, 5),
  createData('Jun', 21, 13, 8, 0, 17, 50.5, 1021.1, 5),
  createData('Jul', 23, 15, 7, 0, 16, 40, 1021.1, 6),
  createData('Aug', 22, 16, 8, 0, 12, 30, 1021.1, 5),
  createData('Sep', 20, 13, 8, 0, 10, 32, 1021.1, 4),
  createData('Oct', 16, 10, 10, 0, 12, 36, 1021.1, 4),
  createData('Nov', 12, 7, 11, 0, 15, 55, 1021.1, 3),
  createData('Dec', 9, 15, 13, 0, 18, 67, 1021.1, 3),
]

const AvgWeatherInformation = () => {

  const buttonContent = (
    <div className="d-flex align-items-center">
      <img className="me-3" src={getWeatherIcon('wind')} alt="windy" width="32px"/>
      <H4 className="font-bold">Average Weather</H4>
    </div>
  )

  return (

    <EuiAccordion initialIsOpen={true} className="mb-5" buttonContent={buttonContent}>
      <EuiPanel color="subdued">
        <Wrapper>
          <Summary>This week will be mostly Cloudy. The average daily high/low will be 16°C/8°C. The expected highest/lowest temperature is 20°C/2°C. There will be 15 rainy day.</Summary>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>High / Low(°C)</TableCell>
                  <TableCell>Rain</TableCell>
                  <TableCell>Snow</TableCell>
                  <TableCell>Wind</TableCell>
                  <TableCell>Humidity</TableCell>
                  <TableCell>Pressure</TableCell>
                  <TableCell>UV</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.month}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.month}</TableCell>
                    <TableCell>{row.tempmax}° / {row.tempmin}°</TableCell>
                    <TableCell>{row.rain} days</TableCell>
                    <TableCell>{row.snow} days</TableCell>
                    <TableCell>{row.wind} kmph</TableCell>
                    <TableCell>{row.humidity}%</TableCell>
                    <TableCell>{row.pressure} Pa</TableCell>
                    <TableCell>{row.uv}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Wrapper>
      </EuiPanel>
    </EuiAccordion>
  )
}

export default AvgWeatherInformation
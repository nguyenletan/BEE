import React, { useEffect, useState } from 'react'

const CountryDropDownList = () => {

  let options = <></>

  const [countries, setCounries] = useState([{ name: 1 }])

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
    .then((res) => res.json())
    .
      then(
        (result) => {
          setCounries(result)
          console.log(result)

        },
      )
  }, [])



  return (
    <>
      <select>
        {countries.map(c => <option value={c.code}>{c.name}</option>)}
      </select>
    </>
  )
}

export default CountryDropDownList
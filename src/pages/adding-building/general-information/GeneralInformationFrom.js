import React, { useEffect, useState } from 'react'
import { ErrorMsg } from '../../login/LoginStyle'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

export const Form = styled.form`

`
export const Input = styled.input`
  border-radius: 0.2em;
  border-color: #7b7b7b;
`

export const Select = styled.select`
  border-radius: 0.2em;
  border-color: #7b7b7b;
`

export const UploadImage = styled.div`
  width: 80%;
  height: 300px;
  border: 2px solid var(--primary);
`

const GeneralInformationFrom = ({data}) => {
  const oriented = [
    { id: 0, name: 'North' },
    { id: 1, name: 'North East' },
    { id: 2, name: 'East' },
    { id: 3, name: 'South East' },
    { id: 4, name: 'South' },
    { id: 5, name: 'South West' },
    { id: 6, name: 'West' },
    { id: 7, name: 'North west' },
  ]

  const { register, handleSubmit, setValue , formState: { errors } } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      // buildingName: 'data?.buildingName',
      // postalCode:data?.postalCode,
      // address: data?.address,
      // city: data?.city,
      // countryCode: data?.countryCode,
      // state: data?.state
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: false,
  })
  const [errorMsg] = useState(null)
  const [selectedOriented, setSelectedOriented] = useState(oriented[0])


  useEffect(() => {
    setValue("address", data?.address, {
      shouldValidate: true,
      shouldDirty: true
    })
    setValue("city", data?.city, {
      shouldValidate: true,
      shouldDirty: true
    })
    setValue("countryCode", data?.country, {
      shouldValidate: true,
      shouldDirty: true
    })
    setValue("postalCode", data?.postalCode, {
      shouldValidate: true,
      shouldDirty: true
    })
    setValue("buildingName", data?.buildingName, {
      shouldValidate: true,
      shouldDirty: true
    })
  }, [data, setValue]);

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {errorMsg && <div className="alert alert-danger" role="alert">
        {errorMsg}
      </div>}

      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="row">

            <div className="form-group col-12 col-lg-6">
              <label htmlFor="building-name">Building Name</label>
              <Input type="text"
                     className="form-control"
                     id="building-name"
                     aria-describedby="Building Name"
                     placeholder="Building Name"
                     {...register('buildingName', {
                       required: true,
                       maxLength: 100,
                     })}/>
              {errors?.buildingName?.type === 'required' &&
              <ErrorMsg>Building Name is required</ErrorMsg>}
              {errors?.buildingName?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>

            <div className="form-group col-12 col-lg-6">
              <label htmlFor="building-orientation">Building
                Orientation</label>
              <Select className="form-control" value={selectedOriented}
                      onChange={(e) => setSelectedOriented(e.target.value)}>
                {oriented.map((o) => (
                  <option
                    key={o.id}
                    value={o.id}
                  >
                    {o.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="postal-code">Postal Code</label>
              <Input type="text"
                     inputMode="numeric"
                     className="form-control"
                     id="postal-code"
                     aria-describedby="Postal Code"
                     placeholder="Postal Code"
                     autocomplete="off"
                     {...register('postalCode', {
                       required: true,
                       maxLength: 10,
                     })}/>
              {errors?.postalCode?.type === 'required' &&
              <ErrorMsg>Building Name is required</ErrorMsg>}
              {errors?.postalCode?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="building-name">Country Code</label>
              <Input type="text"
                     className="form-control"
                     id="postal-code"
                     aria-describedby="Country Code"
                     placeholder="Country Code"
                     autocomplete="off"
                     {...register('countryCode', {
                       required: false,
                       maxLength: 100,
                     })}/>
              {errors?.postalCode?.type === 'required' &&
              <ErrorMsg>Country Code is required</ErrorMsg>}
              {errors?.postalCode?.type === 'maxLength' &&
              <ErrorMsg>Max length is 10</ErrorMsg>}
            </div>
          </div>


          <div className="row">
            <div className="form-group col-12 col-lg-6">
              <label htmlFor="city">City</label>
              <Input type="text"
                     className="form-control"
                     id="city"
                     aria-describedby="City"
                     placeholder="City"
                     autocomplete="off"
                     {...register('city', {
                       required: true,
                       maxLength: 100,
                     })}/>
              {errors?.state?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>

            <div className="form-group col-12 col-lg-6">
              <label htmlFor="address">Address</label>
              <Input type="text"
                     className="form-control"
                     id="address"
                     aria-describedby="Address"
                     placeholder="Address"
                     autocomplete="off"
                     {...register('address', {
                       required: true,
                       maxLength: 100,
                     })}/>
              {errors?.address?.type === 'maxLength' &&
              <ErrorMsg>Max length is 100</ErrorMsg>}
            </div>
          </div>

        </div>


        <div className="col-12 col-lg-4">
          <UploadImage>

          </UploadImage>
        </div>
      </div>



    </Form>
  )
}

export default GeneralInformationFrom
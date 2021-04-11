import React, { useState } from 'react'
import styled from 'styled-components'
import {  Modal} from 'react-bootstrap'

const Wrapper = styled.div`
  background-color: #fafafa;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
`

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--black);
`

const RowItem = styled.div`
  font-size: .9rem;
`

const RowItemTitle = styled.h5`
  font-size: .9rem;
  margin-bottom: .2rem;
  margin-right: .5rem;
`

const RowSubItemTitle = styled.h5`
  font-size: .8rem;
  margin-bottom: .2rem;
  margin-right: .5rem;
`

const RowItemValue = styled.p`
  color: var(--primary);
  font-size: 1.1rem;
  font-weight: 600;
`

const Calculator = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: block;
  width: 40px;
`

const AddingButton = styled.button`
  border-radius: 20px;
  padding-left: 18px;
  padding-right: 18px;
  text-transform: capitalize;
`

const EditIconWrapper = styled.span`
  line-height: 30px;
  color: var(--primary);
  font-size: 16px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  vertical-align: text-bottom;
  display: flex;
  align-items: flex-end;
`
const EditIcon = styled.i`
  color: var(--primary);
  font-size: 18px;
  margin-left: 1rem;
  margin-right: .35rem;
  line-height: 30px;
  font-style: normal;
  font-weight: bold;
`

const PopupTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 54px;
  margin-bottom: 0;
  text-align: left;
  text-transform: capitalize;
  color: var(--inkyblack);
`

const PopupCategory = styled.section`
  margin-top: 1.5rem;

`

const PopupCategoryTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: .3rem;
`

const PopupCategorySubTitle = styled.h4`
  font-size: .8rem;
  margin-bottom: .5rem;
  color: #adb5bd;
`

const ParameterList = styled.ul`
  padding-inline-start: 10px;
  font-size: .9rem;
  max-height: 125px;
  overflow: auto;
`

const ParameterItem = styled.li`
  list-style-type: none;
  margin-top: .3rem;

  &.sub-systems .custom-control-label::before {
    //top: 0.5rem;
  }
`


const Obsolescence = () => {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const Popup = () => {
    return (
      <Modal show={show} onHide={handleClose} size="sm">

        <Modal.Body>
          <PopupTitle>Obsolescence</PopupTitle>
          <PopupCategory>
            <PopupCategoryTitle>Technological</PopupCategoryTitle>
            <PopupCategorySubTitle>Due to asset age, critical spare parts may not be easily available</PopupCategorySubTitle>
            <ParameterList>
              <ParameterItem key="ParameterItem1">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 1} defaultChecked={true}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 1}>
                    Critical Spare parts no longer available
                  </label>
                </div>
              </ParameterItem>
              <ParameterItem key="ParameterItem2">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 2} defaultChecked={true}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 2}>
                    Critical Spare parts delivery takes too long
                  </label>
                </div>
              </ParameterItem>
              <ParameterItem key="ParameterItem3">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 3} defaultChecked={true}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 3}>
                    Repair often cannot be done in resonate time
                  </label>
                </div>
              </ParameterItem>
            </ParameterList>
          </PopupCategory>

          <PopupCategory>
            <PopupCategoryTitle>Economic</PopupCategoryTitle>
            <PopupCategorySubTitle>Operating cost has increased significantly</PopupCategorySubTitle>
            <ParameterList>
              <ParameterItem key="ParameterItem4">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 5} defaultChecked={false}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 5}>
                    Maintenance cost has increased significantly
                  </label>
                </div>
              </ParameterItem>
              <ParameterItem key="ParameterItem5">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 5} defaultChecked={false}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 5}>
                    Energy usage and cost has increased significantly
                  </label>
                </div>
              </ParameterItem>
            </ParameterList>
          </PopupCategory>

          <PopupCategory>
            <PopupCategoryTitle>Statutory</PopupCategoryTitle>
            <PopupCategorySubTitle>Asset performance not meet requirement</PopupCategorySubTitle>
            <ParameterList>
              <ParameterItem key="ParameterItem6">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 6} defaultChecked={true}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 6}>
                    Energy efficiency does not meet requirement
                  </label>
                </div>
              </ParameterItem>
            </ParameterList>
          </PopupCategory>

          <PopupCategory>
            <PopupCategoryTitle>Functional</PopupCategoryTitle>
            <PopupCategorySubTitle>Asset functionality has decreased significantly</PopupCategorySubTitle>
            <ParameterList>
              <ParameterItem key="ParameterItem7">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 7} defaultChecked={true}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 7}>
                    Asset not able to meet the demanded load
                  </label>
                </div>
              </ParameterItem>
              <ParameterItem key="ParameterItem8">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 8} defaultChecked={true}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 8}>
                    Asset failure rate is increasing significantly
                  </label>
                </div>
              </ParameterItem>
              <ParameterItem key="ParameterItem9">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input"
                         id={'checkbox_subsystem_' + 9} defaultChecked={true}/>
                  <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 9}>
                    Asset time to repair is increasing significantly
                  </label>
                </div>
              </ParameterItem>
            </ParameterList>
          </PopupCategory>

          <PopupCategory>
            <PopupCategoryTitle>Aesthetic</PopupCategoryTitle>
            <PopupCategorySubTitle>Asset has negative impact on reputation</PopupCategorySubTitle>
            <ParameterItem key="ParameterItem10">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input"
                       id={'checkbox_subsystem_' + 10} defaultChecked={false}/>
                <label className="custom-control-label" htmlFor={'checkbox_subsystem_' + 10}>
                  Asset operation has negative impact to reputation
                </label>
              </div>
            </ParameterItem>
          </PopupCategory>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <Wrapper>
      <Title>Obsolescence</Title>
      <RowItem className="row">
        <div className="col col-3">
          <RowItemTitle>Technological Issues</RowItemTitle>
          <RowItemValue>3</RowItemValue>
        </div>
        <div className="col col-2">
          <RowItemTitle>Economic Issues</RowItemTitle>
          <RowItemValue>2</RowItemValue>
        </div>
        <div className="col col-2">
          <RowItemTitle>Statutory Issues</RowItemTitle>
          <RowItemValue>1</RowItemValue>
        </div>
        <div className="col col-2">
          <RowItemTitle>Functional Issues</RowItemTitle>
          <RowItemValue>1</RowItemValue>
        </div>
        <div className="col col-2">
          <RowItemTitle>Aesthetic Issues</RowItemTitle>
          <RowItemValue>0</RowItemValue>
        </div>
      </RowItem>

      <RowItem className="row mt-3">
        <div className="col col-6">
          <RowItemTitle className="mb-2">Estimated New Replacement Value ($)</RowItemTitle>
          <RowItem className="row" style={{ fontSize: '.8rem' }}>
            <div className="col col-5">
              <RowSubItemTitle>Replacement Value</RowSubItemTitle>
              <RowItemValue>1,350,000</RowItemValue>
            </div>
            <Calculator className="col col-2 text-center">+</Calculator>
            <div className="col col-5">
              <RowSubItemTitle>Local Labor & Other Cost</RowSubItemTitle>
              <RowItemValue>14 ~ 25%</RowItemValue>
            </div>
          </RowItem>
        </div>

        <div className="col col-6">
          <RowItem className="row">
            <div className="col col-6">
              <RowSubItemTitle>Simple Payback (Years)</RowSubItemTitle>
              <RowItemValue>7</RowItemValue>
            </div>
            <div className="col col-6">
              <RowSubItemTitle>Internal Rate of Return (%)</RowSubItemTitle>
              <RowItemValue>22</RowItemValue>
            </div>
          </RowItem>
        </div>

      </RowItem>
      <RowItem className="row ml-1">
        <AddingButton className="btn btn-sm btn-primary">+ Add to Improvement Measures</AddingButton>
        <EditIconWrapper onClick={handleShow}><EditIcon className="bi bi-pencil-square"/>Edit</EditIconWrapper>
      </RowItem>
      <Popup/>
    </Wrapper>

  )

}

export default Obsolescence
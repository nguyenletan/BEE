import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Modal } from 'react-bootstrap'
import roofImg from '../../../../assets/images/roof.png'
import wallImg from '../../../../assets/images/wall.png'
import openingsImg from '../../../../assets/images/opening.png'
import floorImg from '../../../../assets/images/floor.png'
import { getCurrentColor } from 'Utilities'
import EnergySquare from './EnergySquare'
import { useTranslation } from 'react-i18next'

const FacilityEnvelopeElementsComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`

const FacilityEnvelopeElementsComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  //margin-right: 20px;
  
`

const ListHeader = styled.div`
  font-size: 0.7em;
  margin: auto;
  text-align: center;
  padding-left: 5px;
  padding-right: 5px;
`

const ListItem = styled.div`
  font-size: 0.7rem;
  margin: auto 0;
  text-align: center;
  padding: 0;
`

const ItemImg = styled.img`
  width: 63px;
  display: block;
  margin: auto;
`

const ItemImgSubTitle = styled.span`
  font-size: 0.7rem;
  display: block;
  margin: auto;
`

const ItemRow = styled.div`
  margin-bottom: 10px;
  padding: 5px;
  transition: box-shadow 100ms ease-in-out;

  &:hover {
    box-shadow: 0 0 5px 1px #ddd;
  }
`

const HeadRow = styled.div`
  margin-bottom: 10px;
  padding: 5px;
`

const PopupIcon = styled.img`
  margin-right: .5rem;
`

const PopupTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 54px;
  margin-bottom: 0;
  text-align: center;
  text-transform: capitalize;
`

const ComparisonTable = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
`

const PopupDescription = styled.p`
  font-size: 0.85rem;
`

const FirstLine = styled.span`
  display: block;
  font-size: 0.9rem;
`

const SecondLine = styled.span`
  display: block;
  font-size: .85rem;
  color: var(--bs-primary);
`

const CloseBtn = styled.button`
  float: right;
  border-width: 0;
`

const FacilityEnvelopeElementsComparison = () => {


  const facilityEnvelopeComparisonData = {
    roof: {
      current: 'C',
      potentialBestInClass: 'A',
      fittingLabel: 'Roof Insulation Type',
      currentFittingName: 'Concrete Slab - Uninsulated',
      potentialBestInClassFittingName: 'Concrete Slab - Insulated',
      firstMetricLabel: 'U-Value W/m2K',
      currentFirstMetricValue: '1.7',
      potentialBestInClassFirstMetricValue: '0.9',
      secondMetricLabel: '',
      currentSecondMetricValue: '',
      potentialBestInClassSecondMetricValue: '',
      supplementaryText: 'Decreasing the U-Value of the roof insulation in turn reduces heating and cooling loads'
    },
    wall: {
      current: 'D',
      potentialBestInClass: 'B',
      fittingLabel: 'Roof Insulation Type',
      currentFittingName: 'Concrete Slab - Uninsulated',
      potentialBestInClassFittingName: 'Concrete Slab - Insulated',
      firstMetricLabel: 'U-Value W/m2K',
      currentFirstMetricValue: '1.7',
      potentialBestInClassFirstMetricValue: '0.9',
      secondMetricLabel: '',
      currentSecondMetricValue: '',
      potentialBestInClassSecondMetricValue: '',
      supplementaryText: 'Decreasing the U-Value of the roof insulation in turn reduces heating and cooling loads'
    },
    openings: {
      current: 'C',
      potentialBestInClass: 'B',
      fittingLabel: 'Roof Insulation Type',
      currentFittingName: 'Concrete Slab - Uninsulated',
      potentialBestInClassFittingName: 'Concrete Slab - Insulated',
      firstMetricLabel: 'U-Value W/m2K',
      currentFirstMetricValue: '1.7',
      potentialBestInClassFirstMetricValue: '0.9',
      secondMetricLabel: '',
      currentSecondMetricValue: '',
      potentialBestInClassSecondMetricValue: '',
      supplementaryText: 'Decreasing the U-Value of the roof insulation in turn reduces heating and cooling loads'
    },
    floor: {
      current: 'E',
      potentialBestInClass: 'C',
      fittingLabel: 'Roof Insulation Type',
      currentFittingName: 'Concrete Slab - Uninsulated',
      potentialBestInClassFittingName: 'Concrete Slab - Insulated',
      firstMetricLabel: 'U-Value W/m2K',
      currentFirstMetricValue: '1.7',
      potentialBestInClassFirstMetricValue: '0.9',
      secondMetricLabel: '',
      currentSecondMetricValue: '',
      potentialBestInClassSecondMetricValue: '',
      supplementaryText: 'Decreasing the U-Value of the roof insulation in turn reduces heating and cooling loads'
    }
  }

  const [show, setShow] = useState(false)
  const [popUpProps, setPopupProps] = useState({})
  const { t } = useTranslation(['comparison', 'comparisonInfoPopup'])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const openPopup = (data) => {
    setPopupProps(data)
    handleShow()
  }

  const Popup = (props) => {
    const {
      type,
      current,
      potentialBestInClass,
      fittingLabel,
      currentFittingName,
      potentialBestInClassFittingName,
      firstMetricLabel,
      currentFirstMetricValue,
      potentialBestInClassFirstMetricValue,
      secondMetricLabel,
      currentSecondMetricValue,
      potentialBestInClassSecondMetricValue,
      supplementaryText
    } = props?.data
    const { t } = useTranslation(['comparisonInfoPopup'])
    console.log(type)


    let icon = ''
    switch (type) {
      case 'roof':
        icon = roofImg
        break
      case 'wall':
        icon = wallImg
        break
      case 'openings':
        icon = openingsImg
        break
      case 'floor':
        icon = floorImg
        break
      default:
        break
    }

    return (
      <Modal show={show} onHide={handleClose} size='md'>
        <Modal.Body>
          <Container className='mt-4'>
            <div className='d-flex justify-content-center'>
              <PopupIcon src={icon} alt='roof' title='roof' />
              <PopupTitle>{t(type)} {t('Performance')}</PopupTitle>
            </div>
            <ComparisonTable>
              <div className='row mt-3'>
                <div className='col-6 text-center'>
                  {t('Current Energy Performance')}
                </div>
                <div className='col-6 text-center'>
                  {t('Potential')}<br />{t('Best-In-Class')}
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col-6 text-center'>
                  <EnergySquare
                    color={getCurrentColor(current)}
                    text={current}
                  />
                </div>
                <div className='col-6 text-center'>
                  <EnergySquare
                    color={getCurrentColor(potentialBestInClass)}
                    text={potentialBestInClass}
                  />
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col-6 text-center flex-column'>
                  <FirstLine>{t(fittingLabel)}</FirstLine>
                  <SecondLine>{t(currentFittingName)}</SecondLine>
                </div>
                <div className='col-6 text-center'>
                  <FirstLine>{t(fittingLabel)}</FirstLine>
                  <SecondLine>{t(potentialBestInClassFittingName)}</SecondLine>
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col-6 text-center'>
                  <FirstLine>{t(firstMetricLabel)}</FirstLine>
                  <SecondLine>{currentFirstMetricValue}</SecondLine>
                </div>
                <div className='col-6 text-center'>
                  <FirstLine>{t(firstMetricLabel)}</FirstLine>
                  <SecondLine>{potentialBestInClassFirstMetricValue}</SecondLine>
                </div>
              </div>

              <div className='row mt-3'>
                <div className='col-6 text-center'>
                  <FirstLine>{t(secondMetricLabel)}</FirstLine>
                  <SecondLine>{currentSecondMetricValue}</SecondLine>
                </div>
                <div className='col-6 text-center'>
                  <FirstLine>{t(secondMetricLabel)}</FirstLine>
                  <SecondLine>{potentialBestInClassSecondMetricValue}</SecondLine>
                </div>
              </div>
            </ComparisonTable>

            <PopupDescription>{t(supplementaryText)}.</PopupDescription>
            <CloseBtn className='btn btn-outline-primary btn-sm mb-3' onClick={handleClose}>Close</CloseBtn>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <FacilityEnvelopeElementsComparisonWrapper>
      <FacilityEnvelopeElementsComparisonTitle>{t('Facility Envelope Elements Comparison')}</FacilityEnvelopeElementsComparisonTitle>

      <HeadRow className='row'>
        <ListHeader className='col-4' />
        <ListHeader className='col-4'>{t('Current Energy Performance')}</ListHeader>
        <ListHeader className='col-4'>{t('Potential')}<br />{t('Best-In-Class')}</ListHeader>
      </HeadRow>

      <ItemRow
        className='row'
        onClick={() => openPopup({
          type: 'roof',
          current: facilityEnvelopeComparisonData.roof.current,
          potentialBestInClass: facilityEnvelopeComparisonData.roof.potentialBestInClass,
          fittingLabel: 'Roof Insulation Type',
          currentFittingName: 'Concrete Slab - Uninsulated',
          potentialBestInClassFittingName: 'Concrete Slab - Insulated',
          firstMetricLabel: 'U-Value (W/m2K)',
          currentFirstMetricValue: '1.7',
          potentialBestInClassFirstMetricValue: '0.9',
          secondMetricLabel: '',
          currentSecondMetricValue: '',
          potentialBestInClassSecondMetricValue: '',
          supplementaryText: 'Decreasing the U-Value of the roof insulation in turn reduces heating and cooling loads'
        })}
      >
        <ListItem className='col-4'>
          <ItemImg src={roofImg} alt='Roof' />
          <ItemImgSubTitle>{t('Roof')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className='col-4'><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.roof.current)}
          text={facilityEnvelopeComparisonData.roof.current}
                                    />
        </ListItem>
        <ListItem className='col-4'><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.roof.potentialBestInClass)}
          text={facilityEnvelopeComparisonData.roof.potentialBestInClass}
                                    />
        </ListItem>
      </ItemRow>

      <ItemRow
        className='row'
        onClick={() => openPopup({
          type: 'wall',
          current: facilityEnvelopeComparisonData.wall.current,
          potentialBestInClass: facilityEnvelopeComparisonData.wall.potentialBestInClass,
          fittingLabel: 'Wall Insulation Type',
          currentFittingName: 'Reinforced Concrete Wall',
          potentialBestInClassFittingName: 'Precast Concrete Wall',
          firstMetricLabel: 'U-Value (W/m2K)',
          currentFirstMetricValue: '3.02',
          potentialBestInClassFirstMetricValue: '1.07',
          secondMetricLabel: '',
          currentSecondMetricValue: '',
          potentialBestInClassSecondMetricValue: '',
          supplementaryText: 'Decreasing the U-Value of the wall insulation in turn reduces heating and cooling loads'
        })}
      >
        <ListItem className='col-4'>
          <ItemImg src={wallImg} alt='Wall' />
          <ItemImgSubTitle>{t('Wall')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className='col-4'><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.wall.current)}
          text={facilityEnvelopeComparisonData.wall.current}
                                    />
        </ListItem>
        <ListItem className='col-4'><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.wall.potentialBestInClass)}
          text={facilityEnvelopeComparisonData.wall.potentialBestInClass}
                                    />
        </ListItem>
      </ItemRow>

      <ItemRow
        className='row'
        onClick={() => openPopup({
          type: 'openings',
          current: facilityEnvelopeComparisonData.openings.current,
          potentialBestInClass: facilityEnvelopeComparisonData.openings.potentialBestInClass,
          fittingLabel: 'Window Glazing Type',
          currentFittingName: 'Single Glazed Window',
          potentialBestInClassFittingName: 'Double Glazed',
          firstMetricLabel: 'U-Value (W/m2K)',
          currentFirstMetricValue: '1.53',
          potentialBestInClassFirstMetricValue: '0.87',
          secondMetricLabel: 'Shading Coefficient',
          currentSecondMetricValue: '0.9',
          potentialBestInClassSecondMetricValue: '0.9',
          supplementaryText: 'Decreasing the U-Value of the windows in turn reduces heating and cooling loads'
        })}
      >
        <ListItem className='col-4'>
          <ItemImg src={openingsImg} alt='openings' />
          <ItemImgSubTitle>{t('Openings')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className='col-4'>
          <EnergySquare
            color={getCurrentColor(facilityEnvelopeComparisonData.openings.current)}
            text={facilityEnvelopeComparisonData.openings.current}
          />
        </ListItem>
        <ListItem className='col-4'>
          <EnergySquare
            color={getCurrentColor(facilityEnvelopeComparisonData.openings.potentialBestInClass)}
            text={facilityEnvelopeComparisonData.openings.potentialBestInClass}
          />
        </ListItem>
      </ItemRow>

      <ItemRow
        className='row'
        onClick={() => openPopup({
          type: 'floor',
          current: facilityEnvelopeComparisonData.floor.current,
          potentialBestInClass: facilityEnvelopeComparisonData.floor.potentialBestInClass,
          fittingLabel: 'Floor Insulation Type',
          currentFittingName: 'Solid Ground Floor',
          potentialBestInClassFittingName: 'Solid Ground Floor w/ Edge Insulation',
          firstMetricLabel: 'U-Value (W/m2K)',
          currentFirstMetricValue: '0.15',
          potentialBestInClassFirstMetricValue: '0.07',
          secondMetricLabel: '',
          currentSecondMetricValue: '',
          potentialBestInClassSecondMetricValue: '',
          supplementaryText: 'Decreasing the U-Value of the floor insulation in turn reduces heating and cooling loads'
        })}
      >
        <ListItem className='col-4'>
          <ItemImg src={floorImg} alt='floor' />
          <ItemImgSubTitle>{t('Floor')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className='col-4'><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.floor.current)}
          text={facilityEnvelopeComparisonData.floor.current}
                                    />
        </ListItem>
        <ListItem className='col-4'><EnergySquare
          color={getCurrentColor(facilityEnvelopeComparisonData.floor.potentialBestInClass)}
          text={facilityEnvelopeComparisonData.floor.potentialBestInClass}
                                    />
        </ListItem>
      </ItemRow>

      <Popup data={popUpProps} />

    </FacilityEnvelopeElementsComparisonWrapper>
  )
}

export default FacilityEnvelopeElementsComparison

import React, { useState } from 'react'
import styled from 'styled-components'
import coolingImg from '../../../../assets/images/cooling-load.png'
import heatingImg from '../../../../assets/images/heating-load.png'
import lightingImg from '../../../../assets/images/lighting-load.png'
import renewableImg from '../../../../assets/images/pv-system.png'
import mechVentImg from '../../../../assets/images/mech-vent-load.png'
import plugLoadsImg from '../../../../assets/images/plug-load.png'
import { getCurrentColor, getPotentialColor } from 'Utilities'
import EnergySquare from './EnergySquare'
import roofImg from '../../../../assets/images/roof.png'
import wallImg from '../../../../assets/images/wall.png'
import openingsImg from '../../../../assets/images/opening.png'
import floorImg from '../../../../assets/images/floor.png'
import { Container, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { plugLoadsSvg } from 'SVGImage'

const SubSystemComparisonTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
`

const SubSystemComparisonWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 20px 20px 10px 20px;
  //width: 40%;
`

const ListHeader = styled.div`
  font-size: 0.7rem;
  margin: auto;
  padding: 0;
`

const ListItem = styled.div`
  font-size: 0.85rem;
  margin: auto;
  text-align: center;
  padding: 0;
`

const ItemImg = styled.img`
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
  height: 50%;
  @media (min-width: 768px) {
    height: auto;
  }
`

const PopupTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 54px;
  margin-bottom: 0;
  text-align: center;
  text-transform: capitalize;
`

const PopupSubtitle = styled.h4`
  font-weight: 500;
  font-size: 1rem;
  width: 100%;
  text-align: center;
  margin: 2rem auto auto;
  color: var(--inkydark);
  //height: 2em;
`

const ComparisonTable = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
`

const PopupDescription = styled.p`
  font-size: 0.95rem;
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

const SubSystemComparison = () => {

  const { t } = useTranslation(['comparison', 'comparisonInfoPopup'])

  const subSystemComparisonData = {
    cooling: {
      currentEnergyPerformance: 'C',
      potentialBestInClass: 'B',
      currentCO2Performance: 'C',
      potentialCO2BestInClass: 'B',
    },
    heating: {
      currentEnergyPerformance: 'C',
      potentialBestInClass: 'A',
      currentCO2Performance: 'C',
      potentialCO2BestInClass: 'A',
    },
    lighting: {
      currentEnergyPerformance: 'D',
      potentialBestInClass: 'B',
      currentCO2Performance: 'D',
      potentialCO2BestInClass: 'B',
    },
    mechanicalVentilation: {
      currentEnergyPerformance: 'E',
      potentialBestInClass: 'C',
      currentCO2Performance: 'E',
      potentialCO2BestInClass: 'C',
    },
    renewable: {
      currentEnergyPerformance: 'E',
      potentialBestInClass: 'C',
      currentCO2Performance: 'E',
      potentialCO2BestInClass: 'C',
    },
    plugLoads: {
      currentEnergyPerformance: 'E',
      potentialBestInClass: 'C',
      currentCO2Performance: 'E',
      potentialCO2BestInClass: 'C',
    },
  }

  const [show, setShow] = useState(false)
  const [popUpProps, setPopupProps] = useState({})

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const openPopup = (data) => {
    setPopupProps(data)
    handleShow()
  }

  const Popup = (props) => {
    const {
      type,
      fittingLabel,
      currentFittingName,
      potentialBestInClassFittingName,
      energyPerformance,
      CO2Emissions,
      supplementaryText,
    } = props?.data
    const { t } = useTranslation('comparisonInfoPopup')

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
      case 'cooling':
        icon = coolingImg
        break
      case 'heating':
        icon = heatingImg
        break
      case 'lighting':
        icon = lightingImg
        break
      case 'mechanical ventilation':
        icon = mechVentImg
        break
      case 'renewable':
        icon = renewableImg
        break
      case 'plug loads':
        icon = plugLoadsImg
        break
      default:
        break
    }

    return (
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <Container className="mt-4">
            <div className="d-flex justify-content-center">
              <PopupIcon src={icon} alt="roof" title="roof"/>
              <PopupTitle>{t(type)} {t('Performance')}</PopupTitle>
            </div>
            <div className="row">
              <div className="col col-12 col-md-6">
                <PopupSubtitle>{t('Energy Performance')}</PopupSubtitle>

                <ComparisonTable>
                  <div className="row mt-3">
                    <div className="col-6 text-center">
                      {t('Current Energy Performance')}
                    </div>
                    <div className="col-6 text-center">
                      {t('Potential')}<br/>{t('Best-In-Class')}
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6 text-center">
                      <EnergySquare
                        color={getCurrentColor(energyPerformance?.current)}
                        text={energyPerformance?.current}
                      />
                    </div>
                    <div className="col-6 text-center">
                      <EnergySquare
                        color={getCurrentColor(energyPerformance?.potentialBestInClass)}
                        text={energyPerformance?.potentialBestInClass}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6 text-center flex-column">
                      <FirstLine>{t(fittingLabel)}</FirstLine>
                      <SecondLine>{t(currentFittingName)}</SecondLine>
                    </div>
                    <div className="col-6 text-center">
                      <FirstLine>{t(fittingLabel)}</FirstLine>
                      <SecondLine>{t(potentialBestInClassFittingName)}</SecondLine>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6 text-center">
                      <FirstLine>{t(energyPerformance?.firstMetricLabel)}</FirstLine>
                      <SecondLine>{energyPerformance?.currentFirstMetricValue}</SecondLine>
                    </div>
                    <div className="col-6 text-center">
                      <FirstLine>{t(energyPerformance?.firstMetricLabel)}</FirstLine>
                      <SecondLine>{energyPerformance?.potentialBestInClassFirstMetricValue}</SecondLine>
                    </div>
                  </div>
                </ComparisonTable>
              </div>
              <div className="col col-12 col-md-6">
                <PopupSubtitle>{t('C02 Emission')}</PopupSubtitle>
                <ComparisonTable>
                  <div className="row mt-3">
                    <div className="col-6 text-center">
                      {t('Current CO2 Emission')}
                    </div>
                    <div className="col-6 text-center">
                      {t('Potential')}<br/>{t('Best-In-Class')}
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6 text-center">
                      <EnergySquare
                        color={getPotentialColor(CO2Emissions?.current)}
                        text={CO2Emissions?.current}
                      />
                    </div>
                    <div className="col-6 text-center">
                      <EnergySquare
                        color={getPotentialColor(CO2Emissions?.potentialBestInClass)}
                        text={CO2Emissions?.potentialBestInClass}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6 text-center flex-column">
                      <FirstLine>{t(fittingLabel)}</FirstLine>
                      <SecondLine>{t(currentFittingName)}</SecondLine>
                    </div>
                    <div className="col-6 text-center">
                      <FirstLine>{t(fittingLabel)}</FirstLine>
                      <SecondLine>{t(potentialBestInClassFittingName)}</SecondLine>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-6 text-center">
                      <FirstLine>{t(CO2Emissions?.firstMetricLabel)}</FirstLine>
                      <SecondLine>{CO2Emissions?.currentFirstMetricValue}</SecondLine>
                    </div>
                    <div className="col-6 text-center">
                      <FirstLine>{t(CO2Emissions?.firstMetricLabel)}</FirstLine>
                      <SecondLine>{CO2Emissions?.potentialBestInClassFirstMetricValue}</SecondLine>
                    </div>
                  </div>
                </ComparisonTable>
              </div>
            </div>
            <PopupDescription>{t(supplementaryText)}.</PopupDescription>
            <CloseBtn className="btn btn-outline-primary btn-sm mb-3" onClick={handleClose}>{t('Close')}</CloseBtn>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <SubSystemComparisonWrapper>
      <SubSystemComparisonTitle>{t('Sub-System Comparison')}</SubSystemComparisonTitle>

      <HeadRow className="row">
        <ListHeader className="col-2"/>
        <ListHeader className="col-2">{t('Current Energy Performance')}</ListHeader>
        <ListHeader className="col-2">{t('Potential')}<br/>{t('Best-In-Class')}</ListHeader>

        <ListHeader className="col-2">{t('Current CO2 Performance')}</ListHeader>
        <ListHeader className="col-2">{t('Potential')}<br/>{t('Best-In-Class')}</ListHeader>
      </HeadRow>

      <ItemRow
        className="row" onClick={() => openPopup({
        type: 'cooling',
        fittingLabel: 'Air-Cooled Chiller/Cooling System Type',
        currentFittingName: 'Screw',
        potentialBestInClassFittingName: 'Electricity',
        energyPerformance: {
          current: subSystemComparisonData.cooling.currentEnergyPerformance,
          potentialBestInClass: subSystemComparisonData.cooling.potentialBestInClass,
          firstMetricLabel: 'Efficiency %',
          currentFirstMetricValue: '54',
          potentialBestInClassFirstMetricValue: '77',
        },
        CO2Emissions: {
          current: subSystemComparisonData.cooling.currentCO2Performance,
          potentialBestInClass: subSystemComparisonData.cooling.potentialCO2BestInClass,
          firstMetricLabel: 'Annual CO2 Emissions (Tons/Yr)',
          currentFirstMetricValue: '0.8',
          potentialBestInClassFirstMetricValue: '0.4',
        },
        supplementaryText: 'Improving the Boiler/Heater energy efficiency reduces the energy consumption of the heating system',
      })}
      >
        <ListItem className="col-2">
          <ItemImg src={coolingImg} alt="cooling" height="45px"/>
          <ItemImgSubTitle>{t('Cooling')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.cooling.currentEnergyPerformance)}
          text={subSystemComparisonData.cooling.currentEnergyPerformance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.cooling.potentialBestInClass)}
          text={subSystemComparisonData.cooling.potentialBestInClass}
        />
        </ListItem>

        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.cooling.currentCO2Performance)}
          text={subSystemComparisonData.cooling.currentCO2Performance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.cooling.potentialCO2BestInClass)}
          text={subSystemComparisonData.cooling.potentialCO2BestInClass}
        />
        </ListItem>
      </ItemRow>

      <ItemRow
        className="row" onClick={() => openPopup({
        type: 'heating',
        fittingLabel: 'Boiler/Heater Type',
        currentFittingName: 'Natural Gas Boiler',
        potentialBestInClassFittingName: 'Air Source Heat Pump',
        energyPerformance: {
          current: subSystemComparisonData.heating.currentEnergyPerformance,
          potentialBestInClass: subSystemComparisonData.heating.potentialBestInClass,
          firstMetricLabel: 'Efficacy Lm/W',
          currentFirstMetricValue: '45',
          potentialBestInClassFirstMetricValue: '55',
        },
        CO2Emissions: {
          current: subSystemComparisonData.heating.currentCO2Performance,
          potentialBestInClass: subSystemComparisonData.heating.potentialCO2BestInClass,
          firstMetricLabel: 'Annual CO2 Emissions (Tons/Yr)',
          currentFirstMetricValue: '0.1',
          potentialBestInClassFirstMetricValue: '0.07',
        },
        supplementaryText: 'Improving the light fitting efficacy reduces the energy consumption of the lighting system',
      })}
      >
        <ListItem className="col-2">
          <ItemImg src={heatingImg} alt="heating" height="45px"/>
          <ItemImgSubTitle>{t('Heating')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.heating.currentEnergyPerformance)}
          text={subSystemComparisonData.heating.currentEnergyPerformance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.heating.potentialBestInClass)}
          text={subSystemComparisonData.heating.potentialBestInClass}
        />
        </ListItem>

        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.heating.currentCO2Performance)}
          text={subSystemComparisonData.heating.currentCO2Performance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.heating.potentialCO2BestInClass)}
          text={subSystemComparisonData.heating.potentialCO2BestInClass}
        />
        </ListItem>
      </ItemRow>

      <ItemRow
        className="row" onClick={() => openPopup({
        type: 'lighting',
        fittingLabel: 'Light Fitting Type',
        currentFittingName: 'Fluorescent T5 Tube',
        potentialBestInClassFittingName: 'LED',
        energyPerformance: {
          current: subSystemComparisonData.lighting.currentEnergyPerformance,
          potentialBestInClass: subSystemComparisonData.lighting.potentialBestInClass,
          firstMetricLabel: 'Efficacy %',
          currentFirstMetricValue: '53',
          potentialBestInClassFirstMetricValue: '77',
        },
        CO2Emissions: {
          current: subSystemComparisonData.lighting.currentCO2Performance,
          potentialBestInClass: subSystemComparisonData.lighting.potentialCO2BestInClass,
          firstMetricLabel: 'Annual CO2 Emissions (Tons/Yr)',
          currentFirstMetricValue: '0.2',
          potentialBestInClassFirstMetricValue: '0.09',
        },
        supplementaryText: 'Improving the fan energy efficiency reduces the energy consumption of the mechanical ventilation system',
      })}
      >
        <ListItem className="col-2">
          <ItemImg src={lightingImg} alt="lighting" height="45px"/>
          <ItemImgSubTitle>{t('Lighting')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.lighting.currentEnergyPerformance)}
          text={subSystemComparisonData.lighting.currentEnergyPerformance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.lighting.potentialBestInClass)}
          text={subSystemComparisonData.lighting.potentialBestInClass}
        />
        </ListItem>

        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.lighting.currentCO2Performance)}
          text={subSystemComparisonData.lighting.currentCO2Performance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.lighting.potentialCO2BestInClass)}
          text={subSystemComparisonData.lighting.potentialCO2BestInClass}
        />
        </ListItem>
      </ItemRow>

      <ItemRow
        className="row" onClick={() => openPopup({
        type: 'mechanical ventilation',
        fittingLabel: 'Fan Type',
        currentFittingName: 'Fixed Speed Fan',
        potentialBestInClassFittingName: 'Variable Speed Drive Fan',
        energyPerformance: {
          current: subSystemComparisonData.mechanicalVentilation.currentEnergyPerformance,
          potentialBestInClass: subSystemComparisonData.mechanicalVentilation.potentialBestInClass,
          firstMetricLabel: 'Capacity kWp',
          currentFirstMetricValue: '0',
          potentialBestInClassFirstMetricValue: '60',
        },
        CO2Emissions: {
          current: subSystemComparisonData.mechanicalVentilation.currentCO2Performance,
          potentialBestInClass: subSystemComparisonData.mechanicalVentilation.potentialCO2BestInClass,
          firstMetricLabel: 'Annual CO2 Emissions (Tons/Yr)',
          currentFirstMetricValue: '0',
          potentialBestInClassFirstMetricValue: '1.5',
        },
        supplementaryText: 'Improving the solar panel capacity reduces the energy consumption of the building from the grid',
      })}
      >
        <ListItem className="col-2">
          <ItemImg src={mechVentImg} alt="Mechanical Ventilation" height="45px"/>
          <ItemImgSubTitle>{t('Mechanical Ventilation')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.mechanicalVentilation.currentEnergyPerformance)}
          text={subSystemComparisonData.mechanicalVentilation.currentEnergyPerformance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.mechanicalVentilation.potentialBestInClass)}
          text={subSystemComparisonData.mechanicalVentilation.potentialBestInClass}
        />
        </ListItem>

        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.mechanicalVentilation.currentCO2Performance)}
          text={subSystemComparisonData.mechanicalVentilation.currentCO2Performance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.mechanicalVentilation.potentialCO2BestInClass)}
          text={subSystemComparisonData.mechanicalVentilation.potentialCO2BestInClass}
        />
        </ListItem>
      </ItemRow>

      <ItemRow
        className="row" onClick={() => openPopup({
        type: 'renewable',
        fittingLabel: 'Solar Panel Capacity Installed',
        currentFittingName: 'No Solar Panel System',
        potentialBestInClassFittingName: 'Solar Panel',
        energyPerformance: {
          current: subSystemComparisonData.renewable.currentEnergyPerformance,
          potentialBestInClass: subSystemComparisonData.renewable.potentialBestInClass,
          firstMetricLabel: 'Energy Usage kWh',
          currentFirstMetricValue: '6300',
          potentialBestInClassFirstMetricValue: '4800',
        },
        CO2Emissions: {
          current: subSystemComparisonData.renewable.currentCO2Performance,
          potentialBestInClass: subSystemComparisonData.renewable.potentialCO2BestInClass,
          firstMetricLabel: 'Annual CO2 Emissions (Tons/Yr)',
          currentFirstMetricValue: '1',
          potentialBestInClassFirstMetricValue: '0.4',
        },
        supplementaryText: 'Managing the plug loads and switching them off when not in use reduces the energy consumption',
      })}
      >
        <ListItem className="col-2">
          <ItemImg src={renewableImg} alt="Renewable" height="45px"/>
          <ItemImgSubTitle>{t('Renewable')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.renewable.currentEnergyPerformance)}
          text={subSystemComparisonData.renewable.currentEnergyPerformance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.renewable.potentialBestInClass)}
          text={subSystemComparisonData.renewable.potentialBestInClass}
        />
        </ListItem>

        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.renewable.currentCO2Performance)}
          text={subSystemComparisonData.renewable.currentCO2Performance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.renewable.potentialCO2BestInClass)}
          text={subSystemComparisonData.renewable.potentialCO2BestInClass}
        />
        </ListItem>
      </ItemRow>

      <ItemRow
        className="row" onClick={() => openPopup({
        type: 'plug loads',
        fittingLabel: 'Plug Load',
        currentFittingName: 'NA',
        potentialBestInClassFittingName: 'Smart Plugs',
        energyPerformance: {
          current: subSystemComparisonData.plugLoads.currentEnergyPerformance,
          potentialBestInClass: subSystemComparisonData.plugLoads.potentialBestInClass,
          firstMetricLabel: 'Energy Usage kWh',
          currentFirstMetricValue: '6300',
          potentialBestInClassFirstMetricValue: '4800',
        },
        CO2Emissions: {
          current: subSystemComparisonData.plugLoads.currentCO2Performance,
          potentialBestInClass: subSystemComparisonData.plugLoads.potentialCO2BestInClass,
          firstMetricLabel: 'Annual CO2 Emissions (Tons/Yr)',
          currentFirstMetricValue: '1',
          potentialBestInClassFirstMetricValue: '0.4',
        },
      })}
      >
        <ListItem className="col-2">
          {/*<ItemImg src={plugLoadsSvg()} alt='Plug Loads' height='45px' />*/}
          {plugLoadsSvg()}
          <ItemImgSubTitle>{t('Plug Loads')}</ItemImgSubTitle>
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.plugLoads.currentEnergyPerformance)}
          text={subSystemComparisonData.plugLoads.currentEnergyPerformance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getCurrentColor(subSystemComparisonData.plugLoads.potentialBestInClass)}
          text={subSystemComparisonData.plugLoads.potentialBestInClass}
        />
        </ListItem>

        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.plugLoads.currentCO2Performance)}
          text={subSystemComparisonData.plugLoads.currentCO2Performance}
        />
        </ListItem>
        <ListItem className="col-2"><EnergySquare
          color={getPotentialColor(subSystemComparisonData.plugLoads.potentialCO2BestInClass)}
          text={subSystemComparisonData.plugLoads.potentialCO2BestInClass}
        />
        </ListItem>
      </ItemRow>

      <Popup data={popUpProps}/>

    </SubSystemComparisonWrapper>
  )
}

export default SubSystemComparison

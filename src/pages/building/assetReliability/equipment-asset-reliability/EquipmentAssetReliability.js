import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { energyPerformanceEndTimeState, energyPerformanceStartTimeState, isDisplayPerformanceFilterState } from 'atoms'
import { useNavigate, useParams } from 'react-router-dom'
import AlertChart from 'pages/building/assetReliability/equipment-asset-reliability/components/AlertChart'
import EnergyConsumption from 'pages/building/assetReliability/equipment-asset-reliability/components/EnergyConsumption'
import EnergyConsumptionPercentage from 'pages/building/assetReliability/equipment-asset-reliability/components/EnergyConsumptionPercentage'
import TotalCostBreakDown from 'pages/building/assetReliability/equipment-asset-reliability/components/TotalCostBreakDown'
import { useAuth } from 'AuthenticateProvider'
import { getEquipmentById } from 'api/EquipmentAPI'
import { formatDate, formatNumber, getTheTimeDifference } from 'Utilities'
import MaintenanceCostReplacementValue from 'pages/building/assetReliability/equipment-asset-reliability/components/MaintenanceCostReplacementValue'
import Cost from 'pages/building/assetReliability/equipment-asset-reliability/components/Cost'
import Reliability from 'pages/building/assetReliability/equipment-asset-reliability/components/Reliability'
import Depreciation from 'pages/building/assetReliability/equipment-asset-reliability/components/Depreciation'
import PotentialIssueList from 'pages/building/assetReliability/equipment-asset-reliability/components/PotentialIssueList'
import AssetPartsServiceSourcing from 'pages/building/assetReliability/equipment-asset-reliability/components/AssetPartsServiceSourcing'
import MaintenanceRegime from 'pages/building/assetReliability/equipment-asset-reliability/components/MaintenanceRegime'
import ProjectedPeakDemand from 'pages/building/assetReliability/equipment-asset-reliability/components/ProjectedPeakDemand'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import { trackingUser } from 'api/UserAPI'
import noImageSvg from 'assets/images/no-image-available.svg'

const Wrapper = styled.div`
  margin: 30px 0;
`;

const BreadcrumbItem = styled.li`
  line-height: 28px;
  cursor: pointer;
  margin-right: 0.3rem;
`;

const BreadcrumbItemActive = styled.li`
  line-height: 28px;
  font-weight: 700;
  color: var(--bs-primary);
`;

const EquipmentDetailWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 45px;
`;

const EquipmentDetailContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const EquipmentDetailInformation = styled.div`
  display: grid;
  margin-left: 40px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  font-size: 1rem;
  width: 100%;
`;

const EquipmentDetailInformationCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const EquipmentDetailInformationRowValue = styled.span`
  color: var(--bs-primary);
  font-size: 1.2rem;
`;

const AlertWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 45px;
`;

const Row2ColsGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 25px;
  margin: 20px 0;
`;

const Row3ColsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: 25px;
  margin: 20px 0;
`;

const Row2EqualColsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
  margin: 20px 0;
`;

const EquipmentPhoto = styled.img`
  width: 300px;
  border-radius: 20px;
`;

const SectionWrapper = styled.div`
  background-color: #fafafa;
  border-radius: 20px;
  padding: 30px;
`;

const Nav = styled.nav`
  margin-bottom: 50px;

  li {
    text-transform: capitalize;
  }
`;

const EquipmentAssetReliability = () => {
  const setIsDisplayPerformanceFilter = useSetRecoilState(isDisplayPerformanceFilterState);
  const [equipment, setEquipment] = useState();
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation('equipmentAssetReliability');
  const [subSystemName, setSubSystemName] = useState('');
  const startTime = useRecoilValue(energyPerformanceStartTimeState);
  const endTime = useRecoilValue(energyPerformanceEndTimeState);

  useEffect(() => {
    const fetchEquipmentInfo = async () => {
      try {
        const idToken = await user.getIdToken();
        const tmp = await getEquipmentById(equipmentId, idToken);
        setEquipment(tmp);
        setSubSystemName(getSubSystemName(tmp));
      } catch (error) {
        console.error('Error fetching equipment info:', error);
        // Handle error (e.g., show error message to user)
      }
    };

    const trackUser = async () => {
      try {
        const idToken = await user.getIdToken();
        await trackingUser(user.uid, 'EquipmentAssetReliability', idToken);
      } catch (error) {
        console.error('Error tracking user:', error);
      }
    };

    setIsDisplayPerformanceFilter(false);
    fetchEquipmentInfo();
    trackUser();
  }, [equipmentId, setIsDisplayPerformanceFilter, user]);

  return (
    <Wrapper>
      <Nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <BreadcrumbItem onClick={() => navigate(-1)}>
            <ArrowLeft color="#87972f" size={28} />
          </BreadcrumbItem>
          <BreadcrumbItem>{t('Equipment')}</BreadcrumbItem>
          <BreadcrumbItem>{t(subSystemName)}</BreadcrumbItem>
          <BreadcrumbItem>{t(equipment?.R_EquipmentTypes?.name)}</BreadcrumbItem>
          <BreadcrumbItemActive aria-current="page">{equipment?.dis}</BreadcrumbItemActive>
        </ol>
      </Nav>
      <Row2ColsGrid>
        <EquipmentDetailWrapper>
          <h3>{t('Equipment Details')}</h3>
          <EquipmentDetailContent>
            <EquipmentPhoto src={equipment?.EquipmentDetail[0]?.imageUrl ?? noImageSvg} alt="Chiller" />
            <EquipmentDetailInformation>
              {[
                { label: 'Asset ID', value: equipment?.dis },
                { label: 'Installed', value: formatDate(equipment?.EquipmentDetail[0]?.installDate) },
                { label: 'Capacity (kWh)', value: equipment?.EquipmentDetail[0]?.capacity },
                { label: 'Model', value: t(equipment?.EquipmentDetail[0]?.model) },
                { label: 'Commissioned', value: formatDate(equipment?.EquipmentDetail[0]?.commissioned) },
                { label: 'Initial Value ($)', value: formatNumber(equipment?.EquipmentDetail[0]?.initialAssetCost, 0) },
                { label: 'Manufacturer', value: equipment?.EquipmentDetail[0]?.manufacturer },
                { label: 'Age (Years)', value: getTheTimeDifference(new Date(), equipment?.EquipmentDetail[0]?.installDate, 'years') },
                { label: 'Depreciation Mode', value: t(equipment?.EquipmentDetail[0]?.depreciationMode) },
                { label: 'Location', value: equipment?.EquipmentDetail[0]?.location },
                { label: 'Expected Life (Years)', value: equipment?.EquipmentDetail[0]?.estimatedUsefulLife }
              ].map(({ label, value }) => (
                <EquipmentDetailInformationCol key={label}>
                  <span>{t(label)}</span>
                  <EquipmentDetailInformationRowValue>{value}</EquipmentDetailInformationRowValue>
                </EquipmentDetailInformationCol>
              ))}
            </EquipmentDetailInformation>
          </EquipmentDetailContent>
          <div className="d-flex justify-content-end mt-5">
            <button className="btn btn-sm btn-primary">{t('Maintenance & Sensor Logs')}</button>
          </div>
        </EquipmentDetailWrapper>
        <AlertWrapper>
          <AlertChart />
        </AlertWrapper>
      </Row2ColsGrid>
      <Row3ColsGrid>
        <SectionWrapper>
          <EnergyConsumption
            equipmentId={equipmentId}
            startDate={moment(startTime).format('YYYY-MM-DD')}
            endDate={moment(endTime).format('YYYY-MM-DD')}
          />
        </SectionWrapper>
        <SectionWrapper>
          <EnergyConsumptionPercentage
            equipmentId={equipmentId}
            equipmentTypeId={equipment?.R_EquipmentTypes?.id}
            subSystemId={equipment?.coolingSystemId || equipment?.heatingSystemId || equipment?.mechanicalVentilationSystemId}
            buildingId={equipment?.Property?.buildingId}
            startDate={moment(startTime).format('YYYY-MM-DD')}
            endDate={moment(endTime).format('YYYY-MM-DD')}
          />
        </SectionWrapper>
        <SectionWrapper>
          <TotalCostBreakDown />
        </SectionWrapper>
      </Row3ColsGrid>
      <Row2EqualColsGrid>
        <SectionWrapper>
          <MaintenanceCostReplacementValue />
        </SectionWrapper>
        <SectionWrapper>
          <Cost />
        </SectionWrapper>
      </Row2EqualColsGrid>
      <Row2EqualColsGrid>
        <SectionWrapper>
          <Reliability />
        </SectionWrapper>
        <SectionWrapper>
          <Depreciation />
        </SectionWrapper>
      </Row2EqualColsGrid>
      <Row2ColsGrid>
        <SectionWrapper>
          <PotentialIssueList />
        </SectionWrapper>
        <SectionWrapper>
          <AssetPartsServiceSourcing />
        </SectionWrapper>
      </Row2ColsGrid>
      <Row2ColsGrid>
        <SectionWrapper>
          No data
          {/* <ProjectedPeakDemand equipmentId={equipmentId} /> */}
        </SectionWrapper>
        <SectionWrapper>
          <MaintenanceRegime />
        </SectionWrapper>
      </Row2ColsGrid>
    </Wrapper>
  );
};

// Helper function to determine subsystem name
const getSubSystemName = (equipment) => {
  if (equipment.coolingSystemId) return 'Cooling';
  if (equipment.heatingSystemId) return 'Heating';
  if (equipment.mechanicalVentilationSystemId) return 'Mechanical Ventilation';
  return '';
};

export default EquipmentAssetReliability;
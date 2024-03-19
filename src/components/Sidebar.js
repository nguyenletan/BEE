import React from 'react';
import styled from 'styled-components';
import {EuiIcon, EuiTreeView, EuiToken} from '@elastic/eui';

const SideBarOuterWrapper = styled.div`
  width: 20%;
`;

const SideBarWrapper = styled.div`
  padding: 30px 20px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: calc(100dvh - 100px);
  position: sticky;
  top: 0;

  span {
    font-size: 1rem;
    color: var(--bs-primary);
    font-weight: 500;
  }
`;

const SideBarListItem = styled.ul`
  list-style: none;
  font-size: 1.1rem;
`;

const SecondarySidebarListItem = styled.ul`
  list-style: none;
  font-size: 1.1rem;
`;

const SidebarItem = styled.li`
  line-height: 2;

  a {
    color: var(--bs-primary);
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }

    i {
      font-weight: 600;
    }
  }
`;

const SideBar = () => {

  const topItems = [

    {
      label: 'Home',
      id: 'home',
      icon: <EuiIcon type="home"/>,
    },
    {
      label: 'Dashboard & Report',
      id: 'dashboard_report',
      icon: <EuiIcon type="visualizeApp"/>,
    },
    {
      label: 'Building Performance',
      id: 'building_performance',
      icon: <EuiIcon type="metricbeatApp"/>,

      children: [
        {
          label: 'Floor level',
          id: 'floor_level',
          icon: <EuiToken iconType="menu"/>,
          children: [
            {
              label: 'Floor Zone / Area',
              id: 'floor_zone_area',
              icon: <EuiIcon type="savedObjectsApp"/>,
              children: [
                {
                  label: 'Floor 1',
                  id: 'floor_zone_area',
                  icon: <EuiIcon type="spacesApp"/>
                },
                {
                  label: 'Floor 2',
                  id: 'floor_zone_area',
                  icon: <EuiIcon type="graphApp"/>
                }
              ]
            },
            {
              label: 'Department / Section',
              id: 'floor_zone_area',
              icon: <EuiIcon type="spacesApp"/>
            },
            {
              label: 'Electric Appliance',
              id: 'floor_zone_area',
              icon: <EuiIcon type="graphApp"/>
            }
          ],
        },
      ],
    },
    {
      label: 'Performance Comparison',
      id: 'performance_comparison',
      icon: <EuiIcon type="workplaceSearchApp"/>,
      children: [
        {
          label: 'Another Cloud',
          id: 'item_cloud2',
          icon: <EuiToken iconType="tokenConstant"/>,
        },
        {
          label:
              'This one is a really long string that we will check truncates correctly',
          id: 'item_bug2',
          icon: <EuiToken iconType="tokenEnum"/>,
          callback: () => {},
        },
      ],
    },
    {
      label: 'Performance Improvement',
      id: 'performance_improvement',
      icon: <EuiIcon type="pivot"/>,
      children: [
        {
          label: 'Another Cloud',
          id: 'item_cloud2',
          icon: <EuiToken iconType="tokenConstant"/>,
        },
        {
          label:
              'This one is a really long string that we will check truncates correctly',
          id: 'item_bug2',
          icon: <EuiToken iconType="tokenEnum"/>,
          callback: () => {},
        },
      ],
    },
    {
      label: 'Asset Reliability',
      id: 'asset_reliability',
      icon: <EuiIcon type="uptimeApp"/>,
      children: [
        {
          label: 'Another Cloud',
          id: 'item_cloud2',
          icon: <EuiToken iconType="tokenConstant"/>,
        },
        {
          label:
              'This one is a really long string that we will check truncates correctly',
          id: 'item_bug2',
          icon: <EuiToken iconType="tokenEnum"/>,
          callback: () => {},
        },
      ],
    },
    {
      label: 'Building Input',
      id: 'building_input',
      icon: <EuiIcon type="logstashIf"/>,
      children: [
        {
          label: 'Another Cloud',
          id: 'item_cloud2',
          icon: <EuiToken iconType="tokenConstant"/>,
        },
        {
          label:
              'This one is a really long string that we will check truncates correctly',
          id: 'item_bug2',
          icon: <EuiToken iconType="tokenEnum"/>,
          callback: () => {},
        },
      ],
    },

  ];

  const bottomItems = [
    {
      label: 'Setting',
      id: 'setting',
      icon: <EuiIcon type="advancedSettingsApp"/>,
    },
    {
      label: 'Logout',
      id: 'logout',
      icon: <EuiIcon type="exit"/>,
    },

  ];

  return (
      <SideBarOuterWrapper>
        <SideBarWrapper>
          <SideBarListItem>
            <EuiTreeView items={topItems} aria-label="Top sidebar"
                         display="default"/>
          </SideBarListItem>
          <SecondarySidebarListItem>
            <EuiTreeView items={bottomItems} aria-label="Bottom sidebar"
                         display="default"/>
          </SecondarySidebarListItem>
        </SideBarWrapper>
      </SideBarOuterWrapper>
  );
};

export default SideBar;

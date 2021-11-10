import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ResponsiveRadar } from '@nivo/radar'

import {
  coolingSVG,
  energySVG,
  envelopeSVG,
  heatingSVG,
  lightingSVG,
  mechVentSVG,
  renewableSVG,
} from '../../../../SvgConstants'
import { useTranslation } from 'react-i18next'
import { deepClone } from 'Utilities'

const SubSystemPerformanceTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  text-align: center;
  @media (min-width: 1280px) {
    text-align: left;
  }
`

const SubSystemPerformanceWrapper = styled.div`
  border-radius: 15px;
  background-color: #fafafa;
  padding: 20px;
  //margin-right: 20px;
  //min-height: 500px;
  margin-bottom: 50px;
  height: 430px;
  //max-width: 900px;
  @media (min-width: 768px) {
    height: max(550px, calc(100vw / 3.2));
  }
`

const SubSystemPerformance = ({ data }) => {
  const { t, i18n } = useTranslation('comparison')

  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    const tmp = deepClone(data)
    //
    for (let item of tmp.data) {
      item.name = t(item.name)
    }

    setDataSource(tmp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, i18n.language])

  const commonProperties = {
    // width: 400,
    // height: 350,
    margin: { top: 120, right: 0, bottom: 100, left: 0 },
    ...dataSource,
    indexBy: 'name',
    animate: true,
  }

  // const curveOptions = ['linearClosed', 'basisClosed', 'catmullRomClosed', 'cardinalClosed']

  const LabelComponent = (props) => {

    const { id, anchor, angle } = props
    let texts = ''
    let iconSVG = ''
    let translateX = anchor === 'end' ? -50 : anchor === 'middle' ? -20 : -10
    let translateY = angle < 0 ? -60 : -30
    switch (id) {
      case t('Energy Usage Intensity'):
        iconSVG = energySVG()
        translateX = -15
        texts = (
          <>
            <text
              y={50} x={-25}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Energy Usage')}
            </text>
            <text
              y={66} x={-25}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Intensity')}
            </text>
          </>
        )
        translateX = -5
        translateY = -45
        break
      case t('Cooling Efficiency'):
        iconSVG = coolingSVG()
        texts = (
          <>
            <text
              y={50} x={-6}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Cooling')}
            </text>
            <text
              y={66} x={-6}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Efficiency')}
            </text>
          </>
        )
        translateX = -10
        translateY = -40
        break
      case t('Heating Efficiency'):
        iconSVG = heatingSVG()
        texts = (
          <>
            <text
              y={50} x={-13}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Heating')}
            </text>
            <text
              y={66} x={-13}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Efficiency')}
            </text>
          </>
        )
        translateX = -15
        translateY = -40
        break
      case t('Lighting Efficacy'):
        iconSVG = lightingSVG()
        texts = (
          <>
            <text
              y={50} x={-13}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Lighting')}
            </text>
            <text
              y={66} x={-13}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Efficacy')}
            </text>
          </>
        )
        translateX = -5
        translateY = -20
        break
      case t('Mechanical Ventilation Efficiency'):
        iconSVG = mechVentSVG()
        texts = (
          <>
            <text
              y={50} x={-30}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Mechanical Ventilation')}
            </text>
            <text
              y={66} x={0}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Efficiency')}
            </text>
          </>
        )
        translateX = -20
        translateY = -22
        break
      case t('Envelope Performance'):
        iconSVG = envelopeSVG()
        texts = (
          <>
            <text
              y={50} x={0}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Envelope')}
            </text>
            <text
              y={66} x={-10}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Performance')}
            </text>
          </>
        )
        translateX = -30
        translateY = -30
        break
      case t('Renewables Usage'):
        iconSVG = renewableSVG()
        texts = (
          <>
            <text
              y={50} x={-10}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Envelope')}
            </text>
            <text
              y={66} x={-30}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Performance')}
            </text>
          </>
        )
        translateX = -30
        translateY = -30
        break
      default:
        break
    }

    return (
      <g transform={`translate(${translateX} ${translateY})`}>
        {iconSVG}
        {texts}
      </g>
    )
  }

  return (
    <SubSystemPerformanceWrapper>
      <SubSystemPerformanceTitle>{t('Sub-System Performance')}</SubSystemPerformanceTitle>

      <ResponsiveRadar
        {...commonProperties}
        gridShape="linear"
        dotSize={0}
        dotBorderColor="#fff"
        dotBorderWidth={0}
        enableDotLabel={false}
        gridLabelOffset={36}
        gridLabel={LabelComponent}
        fillOpacity={0.5}
        borderWidth={1}
        colors={['#AACC72', '#63AE62', '#478D58']}
        legends={[
          {
            anchor: 'top',
            direction: 'row',
            translateX: 0,
            translateY: -105,
            itemWidth: 135,
            itemHeight: 10,
            itemTextColor: '#999',
            symbolSize: 8,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </SubSystemPerformanceWrapper>
  )
}

export default SubSystemPerformance

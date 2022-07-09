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
} from 'SvgConstants'
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
  height: 400px;
  //max-width: 900px;
  @media (min-width: 768px) {
    height: max(550px, calc(100vw / 3.2));
  }
`

const SubSystemPerformance = ({ data }) => {
  const { t, i18n } = useTranslation('improvement')

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
              y={-25} x={-25}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Energy Usage')}
            </text>
            <text
              y={-10} x={-25}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Intensity')}
            </text>
          </>
        )
        translateX = -5
        translateY = -185
        break
      case t('Cooling Efficiency'):
        iconSVG = coolingSVG()
        texts = (
          <>
            <text
              y={15} x={38}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Cooling')}
            </text>
            <text
              y={30} x={38}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Efficiency')}
            </text>
          </>
        )
        translateX = 120
        translateY = -120
        break
      case t('Heating Efficiency'):
        iconSVG = heatingSVG()
        texts = (
          <>
            <text
              y={15} x={20}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Heating')}
            </text>
            <text
              y={30} x={20}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Efficiency')}
            </text>
          </>
        )
        translateX = 150
        translateY = 15
        break
      case t('Lighting Efficiency'):
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
            >{t('Efficiency')}
            </text>
          </>
        )
        translateX = 50
        translateY = 140
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
        translateX = -90
        translateY = 140
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
            >{t('_Performance')}
            </text>
          </>
        )
        translateX = -200
        translateY = 5
        break
      case t('Renewables Usage'):
        iconSVG = renewableSVG()
        texts = (
          <>
            <text
              y={50} x={-10}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Renewables')}
            </text>
            <text
              y={66} x={0}
              style={{ fontSize: 12, fill: '#343a40' }}
            >{t('Usage')}
            </text>
          </>
        )
        translateX = -175
        translateY = -140
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
        blendMode="multiply"
        gridLevels={1}
        dotBorderColor="#fff"
        dotBorderWidth={0}
        enableDotLabel={false}
        gridLabelOffset={36}
        gridLabel={LabelComponent}
        fillOpacity={0.05}
        borderWidth={3}
        colors={['#AACC72', '#44D7B6', '#478D58']}
        legends={[
          {
            anchor: 'top',
            direction: 'row',
            translateX: 0,
            translateY: -105,
            itemWidth: 150,
            itemHeight: 18,
            itemTextColor: '#999',
            symbolSize: 18,
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

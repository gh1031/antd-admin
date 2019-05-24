import React from 'react';
import G2 from '@antv/g2';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import EchartComponent from './EchartComponent';
import './index.scss';

const RadioGroup = Radio.Group;
const options = [
  {
    label: 'SimpleChart',
    value: 'simple',
  },
  {
    label: 'ChartShowLoading',
    value: 'loading',
  },
  {
    label: 'ChartAPI',
    value: 'api',
  },
  {
    label: 'ChartWithEvent',
    value: 'events',
  },
  {
    label: 'ThemeChart',
    value: 'theme',
  },
  {
    label: 'DynamicChart',
    value: 'dynamic',
  },
  {
    label: 'MapChart',
    value: 'map',
  },
  {
    label: 'AirportCoord',
    value: 'airport',
  },
  {
    label: 'Graph',
    value: 'graph',
  },
  {
    label: 'Calendar',
    value: 'calendar',
  },
  {
    label: 'Treemap',
    value: 'treemap',
  },
  {
    label: 'Gauge',
    value: 'gauge',
  },
  {
    label: 'GCalendar',
    value: 'gcalendar',
  },
  {
    label: 'LunarCalendar',
    value: 'lunar',
  },
  {
    label: 'Liquidfill',
    value: 'liquid',
  },
  {
    label: 'BubbleGradient',
    value: 'BubbleGradientComponent',
  },
  {
    label: 'TransparentBar3D',
    value: 'TransparentBar3DComPonent',
  },
  {
    label: 'MoonComponent',
    value: 'MoonComponent',
  },
]

class Echart extends React.Component {
  state = {
    value: 'Pear'
  }
  handleChange = () => {

  }
  render() {    
    return (
      <div className="echarts">
        <RadioGroup 
          options={options} 
          onChange={this.handleChange}
          defaultValue="dynamic"
          className="radio-group"
        />
        <EchartComponent />
      </div>
    )
  }
}


export default connect()(Echart);
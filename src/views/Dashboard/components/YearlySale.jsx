import React  from 'react';
import G2 from '@antv/g2';
import { Spin } from 'antd';
import { DataSet } from '@antv/data-set';

class Sale extends React.Component {
  state = {
    loading: true
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.data !== nextProps.data) {
      this.chart.destroy();
      this.initializeChart(nextProps.data);
      this.chart.render();
    }
  }
  componentDidMount () {
    this.initializeChart(this.props.data);
    this.chart.render();
    this.setState({ loading: !this.state.loading })
  }
  initializeChart = _data => {
    const ds = new DataSet();
    const dv = ds.createView().source(_data);
    dv.transform({
      type: 'fold',
      fields: ['Clothes', 'Food', 'Electronics'], // 展开字段集
      key: 'city', // key字段
      value: 'num', // value字段
    });
    this.chart = new G2.Chart({
      container: 'yearly-sales',
      forceFit: true,
      height: 350,
      padding: [20, 20, 60, 50],
      background: {
        fill: '#fff',
      },
    });
    this.chart.source(dv, {
      name: {
        range: [0, 1]
      }
    });
    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    this.chart.axis('num', {
      label: {
        formatter: val => {
          return val;
        }
      }
    });
    this.chart.line().position('name*num').color('city').size(4).shape('smooth');
    this.chart.point().position('name*num').color('city').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    this.chart.legend({
      marker: 'square'
    })
    this.chart.render();
  }
  render () {
    return (
      <Spin spinning={this.state.loading} tip="loading..."><div id="yearly-sales"></div></Spin>
    )
  }
}

export default Sale;
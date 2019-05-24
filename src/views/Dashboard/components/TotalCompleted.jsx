import React from 'react';
import G2 from '@antv/g2';
import { Spin } from 'antd';
// import { DataSet } from '@antv/data-set';

class TotalCompleted extends React.Component {
  state = {
    loading: true,
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.chart.destroy();
      this.initializeChart(nextProps.data);
      this.chart.render();
    }
  }
  componentDidMount () {
    this.initializeChart(this.props.data);
    this.chart.render();
    this.setState({
      loading: !this.state.loading
    })
  }
  initializeChart = (data) => {
    this.chart = new G2.Chart({
      container: 'completed',
      forceFit: true,
      height: 360,
      padding: [20, 20, 60, 50],
    });
    this.chart.source(data, {
      name: {
        type: 'linear',
        tickCount: 12
      }
    });
    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    this.chart.axis('Cards Complete', false);
    this.chart.areaStack().position('name*Task complete').color('hotpink').shape('smooth');
    this.chart.areaStack().position('name*Cards Complete').color('yellowgreen').shape('smooth');
    this.chart.lineStack().position('name*Task complete').color('hotpink').size(2).shape('smooth');
    this.chart.lineStack().position('name*Cards Complete').color('yellowgreen').size(2).shape('smooth');
  }
  render() {
    return <Spin spinning={this.state.loading} tip="loading..."><div id="completed"></div></Spin>
  }
}

export default TotalCompleted
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Card } from 'antd';
import {
  Browser,
  Comments,
  CpuUsage,
  RecentSale,
  SaleCard,
  TotalCompleted,
  UserInfo,
  YearlySale,
} from './components';
import './dashboard.less';
import request from '../../utils/fetch';

class Dashboard extends Component {
  UNSAFE_componentWillMount() {
    const username = window.sessionStorage.getItem('username');
    !username ? this.props.history.push('/login') : null; 
  }
  componentDidMount() {
    if (this.props.sales.length === 0) {
      this.props.getDashboardData()
    }
  }
  render() {
    const {
      numbers,
      recentSales,
      sales,
      comments,
      completed,
      user,
      quote,
      browser,
      cpu, } = this.props;
    return (
      <div className="dashboard">
        <Row gutter={16} type="flex" justify="between" className="dashboard-row">
          {numbers.map((item) => (
            <Col span={6} key={item.icon}>
              <SaleCard color={item.color} icon={item.icon} title={item.title} number={item.number} />
            </Col>
          ))}
        </Row>
        <Row gutter={16} type="flex" justify="between" className="dashboard-row">
          <Col span={18}>
            <Card
              bodyStyle={{ padding: '24px 36px 24px 0px' }}>
              <div className="sales">
                <div className="title">Yearly Sales</div>
                <YearlySale data={sales} />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              className="weather-card"
              hoverable
              bodyStyle={{ background: 'rgb(143, 201, 251)', height: '204px' }}>
              <div className="weather">
                <div className="left">
                  <div className="left-img"></div>
                  <div className="left-text">多云</div>
                </div>
                <div className="right">
                  <div className="right-temperature">24°</div>
                  <div className="right-text">深圳</div>
                </div>
              </div>
            </Card>
            <Card
              hoverable
              bodyStyle={{ background: 'rgb(247, 151, 214)', height: '204px', overflowX: 'hidden' }}>
              <div className="commit">
                <p className="head">
                  I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.
                </p>
                <div className="foot">
                  <div className="description">
                    <p>-Joho Doe-</p>
                    <p>Graphic Designer</p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} type="flex" justify="between" className="dashboard-row">
          <Col span={12}>
            <Card bodyStyle={{ height: '432px' }}>
              <RecentSale dataSource={recentSales} />
            </Card>
          </Col>
          <Col span={12}>
            <Card bodyStyle={{ height: '432px', overflowX: 'hidden' }}>
              <Comments datasource={comments} />
            </Card>
          </Col>
        </Row>
        <Row type="flex" justify="between" className="dashboard-row">
          <Card className="completed-card" bodyStyle={{ width: '100%', padding: '24px 36px 24px 0px' }}>
            <div className="completed">
              <div className="title">TEAM TOTAL COMPLETED</div>
              <TotalCompleted data={completed} />
            </div>
          </Card>
        </Row>
        <Row gutter={16} type="flex" justify="between" className="dashboard-row">
          <Col span={8}>
            <Card bodyStyle={{ height: '432px' }}>
              <Browser datasource={browser} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bodyStyle={{ height: '432px', overflowX: 'hidden' }}>
              <CpuUsage data={cpu} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bodyStyle={{ height: '432px', overflowX: 'hidden', padding: 0 }}>
              <UserInfo data={user} />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => {
    return {
      ...state.dashboard
    }
  },
  {
    getDashboardData: () => {
      return (dispatch) => {
        request('/admin/dashboard').then((res) => {
          dispatch({
            type: 'GET_DASHBOARD_DATA',
            payload: res.dashboard,
          })
        });
      }
    }
  }
)(Dashboard);
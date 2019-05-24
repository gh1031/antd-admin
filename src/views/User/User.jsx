import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Input, Switch, DatePicker } from 'antd';
import { UserList, CreateUser } from './components';
import PropTypes from 'prop-types';
import axios from 'axios';
import './user.scss';


const { RangePicker } = DatePicker;

class User extends Component {
  state = {
    visible: false
  }
  showModal = () => {
    this.props.getAddress()
    this.setState({
      visible: true
    })
  }
  hideModal = () => {
    this.setState({
      visible: false,
      options: []
    })
  }
  render() {
    return (
      <div className="user-content">
        <Row type="flex" justify="space-between" gutter={24} style={{ paddingBottom: '20px' }}>
          <Col span={4}>
            <Input placeholder="Search Name" />
          </Col>
          <Col span={4}>
            <Input placeholder="Please pick an address" />
          </Col>
          <Col span={6} className="create-time">
            <span style={{ paddingRight: '10px' }}>CreateTime</span>
            <RangePicker
              allowClear
              showTime />
          </Col>
          <Col span={10}>
            <div className="button-group">
              <div className="left">
                <Button type="primary" style={{ marginRight: '24px' }}>Search</Button>
                <Button type="gost">Reset</Button>
              </div>
              <div className="right">
                <Switch checkedChildren="motion" unCheckedChildren="motion" />
                <Button type="gost" style={{ marginLeft: '24px' }} onClick={this.showModal}>Create</Button>
              </div>
            </div>
          </Col>
        </Row>
        <UserList />
        <CreateUser 
          visible={this.state.visible} 
          handleCancel={this.hideModal}
          options={this.state.options} />
      </div>
    )
  }
}

export default connect(
  null,
  {
    getAddress: () => {
      return (dispatch) => {
        axios.get('/users/getAddress')
          .then(res => {
            const { data } = res;
            const toTree = (arr) => {
              const mapped = {};
              const result = [];
              arr.forEach((item) => {
                if (item.id) {
                  mapped[item.id] = item;
                }
              })
              arr.forEach((item) => {
                if (item.pid === undefined) {
                  result.push(item);
                  return
                }
                let parent = mapped[item.pid] || undefined;
                if (!parent) return;
                if (!parent.children) parent.children = [];
                parent.children.push(item);
              })
              return result;
            }
            (function () {
              const places = Object.keys(data);
              const arr = [];
              places.forEach((item) => {
                if (item.slice(2, 6) !== '0000') {
                  var pid = item.slice(4, 6) === '00'
                    ? `${item.slice(0, 2)}0000`
                    : `${item.slice(0, 4)}00`
                }
                arr.push({
                  id: item,
                  pid: pid,
                  name: data[item],
                  value: data[item],
                  label: data[item],
                })
              })
              dispatch({
                type: 'GET_ADDRESS_OPTIONS',
                payload: toTree(arr)
              })
            }());
          })
      }
    }
  }
)(User);
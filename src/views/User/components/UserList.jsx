import React from 'react';
import { Table, Dropdown, Menu, Button, Icon, Popconfirm, Modal } from 'antd';
import { connect } from 'react-redux';
import styles from './userList.module.scss';
import request from '../../../utils/fetch';
import * as actions from '../../../redux/actions';

const avatar = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
}
const columns = [
  {
    className: styles.avatar,
    key: 'avatar',
    title: 'Avatar',
    dataIndex: 'avatar',
    align: 'center',
    render: (text, row, index) => (<img style={avatar} src={row.avatar} alt="avatar" />)
  },
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    align: 'center',
    render: (text, row) => <a href={row.url}>{text}</a>
  },
  {
    key: 'nickName',
    title: 'NickName',
    dataIndex: 'nickName',
    align: 'center',
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    align: 'center',
  },
  {
    key: 'isMale',
    title: 'Gender',
    dataIndex: 'isMale',
    align: 'center',
    render: (text) => (
      text ? 'Male' : 'Female'
    )
  },
  {
    key: 'phone',
    title: 'Phone',
    dataIndex: 'phone',
    align: 'center',
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    align: 'center',
  },
  {
    key: 'address',
    title: 'Address',
    dataIndex: 'address',
    align: 'center',
  },
  {
    key: 'createTime',
    title: 'CreateTime',
    dataIndex: 'createTime',
    align: 'center',
  },
  {
    key: 'operation',
    title: 'Operation',
    dataIndex: 'operation',
    align: 'center',
    render: (text, row, index) => {
      const menu = (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1">Update</Menu.Item>
          <Menu.Item key="2">Delete</Menu.Item>
        </Menu>
      )
      return (
        <Dropdown overlay={menu} >
          <Button style={{ marginLeft: 8, border: 'none' }}>
            <Icon type="bars" />
            <Icon type="down" />
          </Button>
        </Dropdown>
      )
    }
  }
]

const dataSource = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    this.setState({
      deleteCount: selectedRowKeys.length
    })
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
}
class UserList extends React.Component {
  state = {
    deleteCount: 0,
    showRemoveButton: false,
  }
  handleMenuClick = () => {

  }
  handleDelete = () => {
    // 删除选中项
  }
  handleCancle = () => {
    // 取消删除
  }
  componentDidMount() {
    if (this.props.list.length === 0) {
      this.props.getUserList();
    } 
  }
  render() {
    const { list } = this.props;
    return (
      <div className="usetlist">
        {
          this.state.showRemoveButton 
          ? (
            <div className={styles['remove-button']}>
              <span style={{paddingRight: '20px'}}>选中{this.state.deleteCount}项</span>
              <Popconfirm 
                onConfirm={this.handleDelete}
                onCancel={this.handleCancle}
                title="确认删除选中项吗？" 
                okText="确认" 
                cancelText="取消">
                <Button type="primary">Remove</Button>
              </Popconfirm>
            </div>
          )
          : null
        }
        <Table
          bordered
          className={styles.table}
          pagination={{
            pageSize: 10,
            current: 1,
            showQuickJumper: true,
            showTotal: (total, range) => {
              {/* console.log(total, range) */}
            }
          }}
          scroll={{x: 1250 }}
          rowSelection={{
            onChange: (keys, rows) => {
              this.setState({
                deleteCount: keys.length,
                showRemoveButton: true
              })
            }
          }}
          columns={columns}
          dataSource={list}
        />
      </div>
    )
  }
}

function mapStateToProps ({user}) {
  const { list, total } = user;
  return {
    list,
    total
  }
}

export default connect(
  ({user}) => {
    const { list, total } = user;
    return {
      list,
      total
    }
  },
  {
    getUserList: () => {
      return (dispatch) => {
        request('/admin/user').then(res => {
          dispatch({
            type: actions.GET_USER_LIST,
            payload: res
          })
        })
      }
    }
  }
)(UserList);
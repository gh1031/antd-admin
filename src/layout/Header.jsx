import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './header.scss';
import { connect } from 'react-redux';
import SubMenu from 'antd/lib/menu/SubMenu';
import axios from 'axios';
const { Header } = Layout;

class PublicHeader extends React.Component {
  handleLogOut = (name) => {
    axios.post('/subscribe/logout', {username: name})
          .then(res => {
            const { data } = res;
            if (data.success) {
              window.sessionStorage.removeItem('username');
              this.props.history.push('/login');
            }
          })
  }
  render () {
    const { collapsed, toggle } = this.props;
    const username = window.sessionStorage.getItem('username');
    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <div className="header">
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
            style={{ padding: "0 20px"}}
          />
          <div className="log-in-out">'
            <a href="mailto:1051421758@qq.com">
              <Icon type="mail" />
            </a>
            <Menu
              mode="horizontal"
              style={{border: 'none', height: '100%'}}
            >
              <SubMenu title={<span><Icon type="user" />{username ? username : 'guest'}</span>}>
                <Menu.Item>
                  <span onClick={() => {this.handleLogOut(username)}}>
                    Sign out
                  </span>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </Header>
    )
  }
}

export default PublicHeader;
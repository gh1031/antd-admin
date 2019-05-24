import React from 'react';
import { Layout, Menu, Icon, Switch } from 'antd';
import { NavLink } from 'react-router-dom';
import './sider.scss';
const { Sider } = Layout;

const PublicSider = ({collapsed, theme, handleChangeTheme}) => {
  const background = {
    background: theme === 'dark' ? '#001529' : '#fff'
  }
  const switchThemt = {
    backgroundColor: '#000d18',
    borderColor: '#001629',
  }
  return (
    <div className="layout-sider">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{position: 'fixed', height: '100%'}}
      >
        <div className="logo" style={background}>
          <Icon type="home" style={{color: '#1890ff', paddingLeft: '25px'}} />
          <NavLink to="/" style={{paddingLeft: '6px'}}>
          {
            collapsed 
            ? null
            : <span>GH1031</span> 
          }
          </NavLink>
        </div>
        <Menu theme={theme} mode="inline" defaultSelectedKeys={['1']} style={{height: 'calc(100vh - 96px)'}}>
          <Menu.Item key="1">
            <NavLink to="/dashboard">
              <Icon type="dashboard" />
              <span>dashboard</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/user">
              <Icon type="user" />
              <span>user</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/post">
              <Icon type="shopping-cart" />
              <span>post</span>
            </NavLink>
          </Menu.Item>
          <Menu.SubMenu 
            key="4" 
            title={<span><Icon type="code-o" /><span>Charts</span></span>}
          >
            <Menu.Item key="5">
              <NavLink to="/charts/eCharts">
                <Icon type="line-chart" />
                <span>ECharts</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="6">
              <NavLink to="/charts/highCharts">
                <Icon type="bar-chart" />
                <span>HighCharts</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to="/charts/reCharts">
                <Icon type="area-chart" />
                <span>Recharts</span>
              </NavLink>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        {
          collapsed 
          ? null
          : (
            <span className="theme-switch" style={theme === 'dark' ? switchThemt: null}>
              <span style={{paddingRight: '10px'}}><Icon type="bulb" />Switch Theme</span>
              <Switch 
                checkedChildren="light" 
                unCheckedChildren="dark"
                onChange={(boolean) => handleChangeTheme(boolean)}
                defaultChecked
              />
            </span>
          ) 
        }
      </Sider>
    </div>
  )
}

export default PublicSider;
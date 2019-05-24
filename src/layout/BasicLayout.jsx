import React from 'react';
import { Layout, Breadcrumb, Icon } from 'antd';
import Sider from './Sider';
import Header from './Header';
import { Link, withRouter } from 'react-router-dom';
const { Content, Footer } = Layout;

const breadcrumbNameMap = {
  '/post': 'Post',
  '/user': 'User',
  '/charts': 'Charts',
  '/charts/eCharts': 'Echarts',
  '/charts/highCharts': 'highCharts',
  '/charts/reCharts': 'reCharts',
};
class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    theme: 'light',
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  handleChangeTheme = (boolean) => {
    boolean ? this.setState({ theme: 'light' }) : this.setState({ theme: 'dark' })
  }
  render() {
    const { location } = this.props.history
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        url === '/dashboard'
          ? null
          : (
              <Breadcrumb.Item key={url}>
                <Link to={url}>
                  <Icon type={pathSnippets.toString()} style={{ paddingRight: '5px' }} />
                  {breadcrumbNameMap[url]}
                </Link>
              </Breadcrumb.Item>
            )
      )
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="/dashboard">
        <Link to='/dashboard'>
          <Icon type="dashboard" style={{ paddingRight: '5px' }} />
          Dashboard
        </Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return (
      <div>
        <Layout>
          <Sider
            collapsed={this.state.collapsed}
            theme={this.state.theme}
            handleChangeTheme={this.handleChangeTheme}
          />
          <Layout style={{ marginLeft: this.state.collapsed ? 80 : 200 }}>
            <Header collapsed={this.state.collapsed} toggle={this.toggle} history={this.props.history} />
            <Content style={{ margin: '24px', background: '#fff', minHeight: 280 }}>
              <div style={{ 'paddingBottom': '16px', background: '#f0f2f5' }}>
                <Breadcrumb>
                  {breadcrumbItems}
                </Breadcrumb>
              </div>
              {
                this.props.children
              }
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design Admin © 2018 Created gh1031, Imitate from zuiidea </Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}


export default withRouter(BasicLayout);
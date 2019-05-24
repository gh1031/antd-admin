import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tag } from 'antd';
import { STATUS, STATUS_COLOR_MAPS } from '../../../constant/maps';

const columns = [
  {
    key: 'name',
    dataIndex: 'name',
    render: (text, row, index) => (
      <div>{row.name}</div>
    )
  },
  {
    key: 'percent',
    dataIndex: 'percent',
    align: 'right',
    render: (text, row, index) => (
      <Tag color={STATUS_COLOR_MAPS[STATUS[row.status]]}>{row.percent}%</Tag>
    )
  }
]
const Browser = ({datasource}) => {
  return <div>
    <Table
      columns={columns}
      showHeader={false}
      pagination={false}
      dataSource={datasource}
     />
  </div>
}

Browser.propTypes = {
  datasource: PropTypes.array
}

export default Browser;
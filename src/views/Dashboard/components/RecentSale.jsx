import React from 'react';
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import { STATUS_COLOR_MAPS, STATUS } from '../../../constant/maps';
const columns = [
  {
    key: 'name',
    title: 'NAME',
    dataIndex: 'name',
    align: 'center',
  },
  {
    key: 'status',
    title: 'STATUS',
    dataIndex: 'status',
    align: 'center',
    render: (text, row, index) => {
      return <Tag color={STATUS_COLOR_MAPS[STATUS[row.status]]}>{STATUS[row.status].toUpperCase()}</Tag>
    }
  },
  {
    key: 'date',
    title: 'DATE',
    dataIndex: 'date',
    align: 'center',
  },
  {
    key: 'price',
    title: 'PRICE',
    dataIndex: 'price',
    align: 'center',
    render: (text, row, index) => {
      return <span style={{color: STATUS_COLOR_MAPS[STATUS[row.status]]}}>{'$' + row.price}</span>
    }
  }
];  

const RecentSale = ({dataSource}) => {
  return (
    <div>
      <Table
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}

RecentSale.propTypes = {
  dataSource: PropTypes.array,
}

export default RecentSale;
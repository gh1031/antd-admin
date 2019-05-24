import React from 'react';
import { Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import { STATUS, STATUS_COLOR_MAPS } from '../../../constant/maps';
import './comments.scss';

const columns = [
  {
    align: 'center',
    key: '1',
    render: (text, row, index) => {
      return (<div className='left'><img src={row.avatar} alt=""/></div>)
    }
  },
  {
    key: '2',
    align: 'center',
    render: (text, row, index) => {
      return (
        <div className='right'>
          <h1 className="name">{row.name}</h1>
          <p className="content">{row.content}</p>
          <div className="daterow">
            <Tag color={STATUS_COLOR_MAPS[STATUS[row.status]]}>{STATUS[row.status].toUpperCase()}</Tag>
            <div>{row.date}</div>
          </div>
        </div>
      )
    }
  }
]
const Comments = ({datasource}) => {
  return (
    <div>
      <Table
        className='comments'
        pagination={false}
        showHeader={false}
        columns={columns}
        dataSource={datasource}
       />
    </div>
  )
}

Comments.propTypes = {
  datasource: PropTypes.array,
}

export default Comments;
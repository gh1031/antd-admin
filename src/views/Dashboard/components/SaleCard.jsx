import React from 'react';
import { Card, Icon } from 'antd';
import PropTypes from 'prop-types';
import { formatNumber } from '../../../utils/util';
const { Meta } = Card;

const SaleCard = ({icon, title, number, color}) => {
  return (
    <Card 
      hoverable
      bodyStyle={{padding: '32px'}}>
      <Meta
        avatar={<Icon type={icon} style={{fontSize: '54px', color}} />}
        title={title}
        description={formatNumber(number)}
      />
    </Card>
  )
}

SaleCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  color: PropTypes.string,
}

export default SaleCard;
import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { formatNumber } from '../../../utils/util';
import styles from  './userInfo.module.scss';
import avatar from '../../../assets/img/user.jpg';

const UserInfo = ({data}) => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.avatar}><img src={avatar} alt=""/></div>
        <div className={styles.username}>{data.name}</div>
        <div className={styles.email}>{data.email}</div>
      </div>
       <div className={styles.number}>
         <div className={styles.left}>
           <p className={styles.title}>EARNING SALES</p>
           <p className={styles['earning-number']}>${data.sales}</p>
         </div>
         <div className={styles.right}>
           <p className={styles.title}>ITEM SLOD</p>
           <p className={styles['sold-number']}>{formatNumber(data.sold)}</p>
         </div>
       </div>
       <div className={styles.footer}>
         <Button type="ghost">View Profile</Button>
       </div>
    </div>
  )
}

UserInfo.propTypes = {
  data: PropTypes.object,
}

export default UserInfo;
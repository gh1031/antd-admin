import request from '../utils/fetch';

export const dashboardData = () => {
  return request('/admin/dashboard');
}

export const userList = () => {
  return request('/admin/user');
}

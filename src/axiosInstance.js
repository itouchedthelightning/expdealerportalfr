import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://expdealerportal-906dba29157e.herokuapp.com/',
});

export default axiosInstance;


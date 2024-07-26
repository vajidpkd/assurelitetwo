import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://assurelite.datacubeglobal.com/Api/index.php/Master/'
});

export { axiosInstance };

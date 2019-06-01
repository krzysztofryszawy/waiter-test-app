import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-garcon.firebaseio.com/'
});

export default instance;

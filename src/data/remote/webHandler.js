import axios from 'axios';
import { BASE_URL } from './routes';
import { KEYS } from '../../utils/Keys'
import AsyncStorage from '@react-native-async-storage/async-storage';


const apiRequest = async function (options, headers = {}) {
  const authToken = await AsyncStorage.getItem(KEYS.TOKEN);

  const onSuccess = (response) => {
    return response;
  };
  const onError = function (error) {
    return Promise.reject(error.response || error.message);
  };

  return axios({
    baseURL: BASE_URL,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
      ...headers
    },
  })
    .then(onSuccess)
    .catch(onError);
};

export default apiRequest;
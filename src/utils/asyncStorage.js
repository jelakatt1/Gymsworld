import AsyncStorage from '@react-native-async-storage/async-storage';



export const getItem = async (key, defaultValue) => {
    try {
      const respString = await AsyncStorage.getItem(key);
      if (respString) {
        return Promise.resolve(JSON.parse(respString));
      }
      return defaultValue !== undefined
        ? Promise.resolve(defaultValue)
        : Promise.reject(new Error(`No item for ${key}`));
    } catch (error) {
      console.log('error', error);
      return Promise.reject(error);
    }
  };
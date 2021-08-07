import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = () => {
  const getStoredItem = async (collection: string): Promise<any> => {
    try {
      let storedItem = await AsyncStorage.getItem(collection);
      if (!!storedItem) {
        storedItem = JSON.parse(storedItem);
      }
      return storedItem;
    } catch (error) {
      throw new Error(error);
    }
  };

  const saveItemInStorage = async (collection: string, value?: any) => {
    try {
      const stringifiedValue = JSON.stringify(value);
      await AsyncStorage.setItem(collection, stringifiedValue);
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeStoredItem = async (collection: string) => {
    try {
      await AsyncStorage.removeItem(collection);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { getStoredItem, saveItemInStorage, removeStoredItem };
};

export { useAsyncStorage };

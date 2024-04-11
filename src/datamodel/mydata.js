import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "remember-me-too";
const defaultData = {};

export const loadData = async () => {
  try {
    const str = await AsyncStorage.getItem(key);
    if (str) {
      const myData = JSON.parse(str);
      return myData;
    }
    return defaultData;
  } catch (e) {
    console.error("Error in loadData:", e);
    return defaultData;
  }
};
export const saveData = async (data) => {
  try {
    const myDataStr = JSON.stringify(data);
    console.log("saveData:", myDataStr);
    await AsyncStorage.setItem(key, myDataStr);
  } catch (e) {
    console.error("Error in saveData:", e);
  }
};

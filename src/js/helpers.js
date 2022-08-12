import { REQUEST_TIMER } from "./config";
//Timeout function for slow connections
const timeFetch = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took too long.`));
    }, sec * 1000);
  });
};

export const getJsonData = async function (url) {
  try {
    //To test for poor connections
    let res = await Promise.race([fetch(url), timeFetch(REQUEST_TIMER)]);
    let data = await res.json();

    if (res.ok === false) {
      throw new Error(`It's a ${res.statusText}. ${data.message}`);
    }
    //return data to be used as it is the resolved result from the promise
    return data;
  } catch (error) {
    //Re-throw error to be caught by the model and to reject the promise
    throw new Error(error);
  }
};

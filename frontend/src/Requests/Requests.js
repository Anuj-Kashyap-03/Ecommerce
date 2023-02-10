import axios from "axios";

export const GetRequest = async (url) => {
  try {
    const { data } = await axios.get(url);
    return { data, success: true };
  } catch (error) {
    return { success: false, error: error.response };
  }
};

export const PostRequest = async (url, multipart, body) => {
  try {
    const config = {
      headers: {
        "Content-Type":
          multipart === true ? "multipart/form-data" : "application/json",
      },
    };
    const { data } = await axios.post(url, body, config);

    return { data, success: true };
  } catch (error) {
    return { success: false, error: error.response };
  }
};

export const PutRequest = async (url, multipart, body) => {
  try {
    const config = {
      headers: {
        "Content-Type":
          multipart === true ? "multipart/form-data" : "application/json",
      },
    };
    const { data } = await axios.put(url, body, config);
    return { data, success: true };
  } catch (error) {
    return { success: false, error: error.response };
  }
};

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

class API {
  async GET (path) {
    try {
      const result = await axios
        .get(`${ API_URL }/${ path }`);
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default API;

import axios from 'axios';

class HttpClient {
  constructor() {
    this.axios = axios;
  }

  /**
   * @param {String} url
   * @returns {Promise<AxiosResponse<T>>}
   */
  get(url) {
    return this.axios.get(url);
  }
}

export default HttpClient;

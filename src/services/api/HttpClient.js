import axios from 'axios/index';

const singleton = Symbol();

class HttpClient {
  constructor(enforcer) {
    if (enforcer !== singleton) {
      throw new Error('Cannot construct singleton');
    }

    this._axios = axios;
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new HttpClient(singleton);
    }

    return this[singleton];
  }

  /**
   * @param {String} url
   * @returns {Promise<AxiosResponse<T>>}
   */
  get(url) {
    return this._axios.get(url);
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {Promise<AxiosResponse<T>>}
   */
  put(url, data) {
    return this._axios.put(url, data);
  }
}

export default HttpClient;

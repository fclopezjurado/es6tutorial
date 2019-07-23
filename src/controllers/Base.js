import HttpClient from '../services/HttpClient';
import {API_BASE_URI, GET_EMPLOYEES_PATH} from '../config/constants';
import Modal from './Modal';

class Base {
  constructor() {
    this.httpClient = new HttpClient();
    this.modal = new Modal();
    this.onInit();
  }

  onInit() {
    this.getEmployees();
  }

  getEmployees() {
    const url = `${API_BASE_URI}${GET_EMPLOYEES_PATH}`;

    this.httpClient.get(url)
      .then((response) => {this.printEmployees(response.data)})
      .catch((error) => {
        if (error.response) {
          this.modal.setModal(error.response.data, error.response.status);
        } else if (error.request) {
          this.modal.setModal(error.responseText, error.status);
        } else {
          this.modal.setModal(error.message);
        }

        this.modal.show();
      });
  }

  printEmployees(employees) {

  }
}

export default Base;

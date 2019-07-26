import {
  API_BASE_URI,
  EMPLOYEE_ID_ATTR, GET_EMPLOYEE_PATH,
  GET_EMPLOYEES_PATH,
  REG_EXP_FOR_GET_EMPLOYEE_PATH,
  UPDATE_EMPLOYEE_PATH
} from "../../config/constants";
import HttpClient from "./HttpClient";
import {ModalPopup, UPDATE_BUTTON_TEXT} from "../modals/ModalPopup";
import ModalFooter from "../modals/ModalFooter";

const singleton = Symbol();

class ApiClient {
  constructor(enforcer) {
    if (enforcer !== singleton) {
      throw new Error('Cannot construct singleton');
    }
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApiClient(singleton);
    }

    return this[singleton];
  }

  getEmployees(callback) {
    const url = `${API_BASE_URI}${GET_EMPLOYEES_PATH}`;

    HttpClient.instance.get(url)
      .then((response) => callback(response.data))
      .catch((error) => ModalFooter.instance.print(error));
  }

  updateEmployee() {
    const employee = {};
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const id = form.querySelector(`#${EMPLOYEE_ID_ATTR}`).value;
    const url = `${API_BASE_URI}${UPDATE_EMPLOYEE_PATH}`.replace(REG_EXP_FOR_GET_EMPLOYEE_PATH, id);

    formData.forEach((value, key) => employee[key] = value);
    HttpClient.instance.put(url, employee)
      .then(() => ModalPopup.instance().hide())
      .catch((error) => ModalFooter.instance.print(error));
  }

  getEmployee(id) {
    const url = `${API_BASE_URI}${GET_EMPLOYEE_PATH}`.replace(REG_EXP_FOR_GET_EMPLOYEE_PATH, id);
    const modalPopup = ModalPopup.instance(UPDATE_BUTTON_TEXT, ApiClient.instance.updateEmployee);

    HttpClient.instance.get(url)
      .then((response) => modalPopup.print(response.data))
      .catch((error) => ModalFooter.instance.print(error));
  }
}

export default ApiClient;

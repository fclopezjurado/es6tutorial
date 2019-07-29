import Table from "./Table";
import ApiClient from "../services/api/ApiClient";
import {CREATE_BUTTON_TEXT, ModalPopup} from "../services/modals/ModalPopup";

class Base {
  constructor() {
    this.table = new Table();
    ApiClient.instance.getEmployees(this.table.print.bind(this));
    this.onButtonClick();
  }

  onButtonClick() {
    const button = document.querySelector('body button');
    button.addEventListener('click', () => {
      const modalPopup = ModalPopup.instance(CREATE_BUTTON_TEXT, ApiClient.instance.createEmployee);
      modalPopup.setSubmitButton(CREATE_BUTTON_TEXT, ApiClient.instance.createEmployee);
      modalPopup.changeIdFieldVisibility(false);
      modalPopup.changeDeleteButtonVisibility(false);
      modalPopup.clean();
    });
  }
}

export default Base;

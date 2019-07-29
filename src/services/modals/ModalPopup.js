import BaseModal from "./BaseModal";
import ApiClient from "../api/ApiClient";

const singleton = Symbol();
export const UPDATE_BUTTON_TEXT = 'Update';
export const CREATE_BUTTON_TEXT = 'Create';

export class ModalPopup extends BaseModal {
  constructor(enforcer, buttonName, buttonCallback) {
    if (enforcer !== singleton) {
      throw new Error('Cannot construct singleton');
    }

    const modal = document.querySelector('#popup');

    super(modal);
    this.form = document.querySelector('.popup-body form');
    this.idInput = this.form.querySelector('#id');
    this.idLabel = this.idInput.labels[0];
    this.setSubmitButton(buttonName, buttonCallback);
    this.setDeleteButton();
  }

  static instance(buttonName, buttonCallback) {
    if (!this[singleton]) {
      this[singleton] = new ModalPopup(singleton, buttonName, buttonCallback);
    }

    return this[singleton];
  }

  setSubmitButton(name, callback) {
    if (this.submitButton) {
      const button = this.submitButton.cloneNode(true);
      this.form.replaceChild(button, this.submitButton);
      this.submitButton = button;
    }

    this.submitButton = this.form.querySelector('button');
    this.submitButton.innerText = name;
    this.submitButton.addEventListener('click', callback.bind(this));
  }

  setDeleteButton() {
    if (this.deleteButton) {
      const button = this.deleteButton.cloneNode(true);
      this.form.replaceChild(button, this.deleteButton);
      this.deleteButton = button;
    }

    this.deleteButton = document.querySelector('#delete');
    this.deleteButton.addEventListener('click', ApiClient.instance.deleteEmployee);
  }

  print(employee) {
    if (employee) {
      for (const attribute in employee) {
        if (employee.hasOwnProperty(attribute)) {
          const input = this.form.querySelector(`#${attribute}`);
          input.value = employee[attribute];
        }
      }
    }

    this.show();
  }

  changeIdFieldVisibility(displayed) {
    this.idLabel.style.display = displayed ? 'block' : 'none';
    this.idInput.style.display = displayed ? 'block' : 'none';
  }
  
  changeDeleteButtonVisibility(displayed) {
    this.deleteButton.style.display = displayed? 'block' : 'none';
  }

  clean() {
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach((input) => input.value = '');
    this.show();
  }
}

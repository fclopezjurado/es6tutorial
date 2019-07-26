import BaseModal from "./BaseModal";

const singleton = Symbol();
export const UPDATE_BUTTON_TEXT = 'Update';

export class ModalPopup extends BaseModal {
  constructor(enforcer, buttonName, buttonCallback) {
    if (enforcer !== singleton) {
      throw new Error('Cannot construct singleton');
    }

    const modal = document.querySelector('#popup');

    super(modal);
    this.form = document.querySelector('.popup-body form');
    this.setButton(buttonName, buttonCallback);
  }

  static instance(buttonName, buttonCallback) {
    if (!this[singleton]) {
      this[singleton] = new ModalPopup(singleton, buttonName, buttonCallback);
    }

    return this[singleton];
  }

  setButton(name, callback) {
    this.button = this.form.querySelector('button');
    this.button.innerText = name;
    this.button.addEventListener('click', callback.bind(this));
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
}

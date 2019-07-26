import BaseModal from "./BaseModal";

const singleton = Symbol();

class ModalFooter extends BaseModal {
  constructor(enforcer) {
    if (enforcer !== singleton) {
      throw new Error('Cannot construct singleton');
    }

    const modal = document.querySelector('#footer');

    super(modal);
    this.header = document.querySelector('.modal-header h2');
    this.body = document.querySelector('.modal-body p');
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ModalFooter(singleton);
    }

    return this[singleton];
  }

  setModal(body, header) {
    this.header.innerHTML = `ERROR ${header}`;
    this.body.innerHTML = body;
  }

  print(error) {
    if (error.response) {
      this.setModal(error.response.data);
    } else if (error.request) {
      this.setModal(error.responseText);
    } else {
      this.setModal(error.message);
    }

    this.show();
  }
}

export default ModalFooter;

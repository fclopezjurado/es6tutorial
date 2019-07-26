class BaseModal {
  constructor(modal) {
    this.modal = modal;
    this.setCloseModalEvent();
  }

  setCloseModalEvent() {
    const closeButton = this.modal.querySelector('.close');
    closeButton.addEventListener('click', () => this.hide());
  }

  hide() {
    this.modal.style.display = 'none';
  }

  show() {
    this.modal.style.display = 'block';
  }
}

export default BaseModal;

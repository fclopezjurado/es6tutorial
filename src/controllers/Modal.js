class Modal {
  constructor() {
    this.modal = document.querySelector('#myModal');
    this.header = document.querySelector('.modal-header h2');
    this.body = document.querySelector('.modal-body p');;
    this.setCloseModalEvent();
  }

  setCloseModalEvent() {
    const closeButton = document.querySelector('.close');

    closeButton.addEventListener('click', () => this.hide());
    window.addEventListener('click', (event) => {
      if (event.target === this.modal) {
        this.hide();
      }
    });
  }

  hide() {
    this.modal.style.display = 'none';
  }

  show() {
    this.modal.style.display = 'block';
  }

  setModal(body, header) {
    this.header.innerHTML = `ERROR ${header}`;
    this.body.innerHTML = body;
  }
}

export default Modal;

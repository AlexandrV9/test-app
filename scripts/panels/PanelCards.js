import popupCreateCard from '../popups/create-card/PopupCreateCard';

class PanelCards {
  constructor() {
    this.btnAddNewCard = document.querySelector('.btn-add-new-card');

    this.#init();
  }

  #init() {
    this.btnAddNewCard.addEventListener('click', () => { popupCreateCard.open() });
  }
}

const panelCards = new PanelCards();

export default panelCards;
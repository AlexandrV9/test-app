import popupCreateCard from '../popups/create-card/PopupCreateCard';

class PanelCards {
  constructor({ availableActions }) {
    this.availableActions = availableActions;
    this.btnAddNewCard = document.querySelector('.btn-add-new-card');

    this.#init();
  }

  #init() {
    this.btnAddNewCard.addEventListener('click', () => { popupCreateCard.open(this.availableActions) });
  }
}

export default PanelCards;
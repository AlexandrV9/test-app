import { cards } from "../../utils/constants.js";
import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(cls) {
    super(cls);
    this.currentCard = {};
    this.btnSubmit = this.popup.querySelector("#btn-delete");
    this.btnCancel = this.popup.querySelector("#btn-cancel");
    this.#init();
  }

  #init() {
    super.init()
    this.btnSubmit.addEventListener("click", (event) => { this.onSubmit(event) });
    this.btnCancel.addEventListener("click", () => { this.close() });
  }

  open({ id, elCard }){
    super.open();
    this.currentCard = { id, elCard }
  }

  onSubmit(event) {
    event.preventDefault();
    const index = cards.findIndex(card => card.id === this.currentCard.id);
    if(index !== -1) {
      cards.splice(index, 1);
      this.currentCard.elCard.remove();
    } else {
      console.log("В массиве данной карточки нет!")
    }
    this.close();
  }
}

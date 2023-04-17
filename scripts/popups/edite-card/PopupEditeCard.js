import { cards } from "../../../utils/constants.js"
import Popup from "../Popup.js";

export default class PopupEditeCard extends Popup {
  constructor(cls) {
    super(cls);
    this.inputs = {}; 
    this.btnSubmit = this.popup.querySelector("#btn-save");
    this.#init();
  }

  #init() {
    super.init()
    this.btnSubmit.addEventListener("click", (event) => { this.onSubmit(event) });
  }

  open({ id, elTitle, elImg, availableActions }) {
    super.open();
    this.availableActions = availableActions;
    this.currentCard = { id, elTitle, elImg };
    this.inputs["title"].value = elTitle.textContent;
    this.inputs["src"].value = elImg.src;
  
    this.inputs["title"].elInp.value = elTitle.textContent;
    this.inputs["src"].elInp.value = elImg.src;

    this.inputs["title"].elInp.focus();
  }

  onSubmit(event) {
    event.preventDefault();

    const { updatePages } = this.availableActions;
    const { elImg, elTitle, id } = this.currentCard;

    const valid = this.validForm();

    if(valid) {
      const card = cards.find(card => card.id === id);

      elTitle.textContent = this.inputs["title"].value;
      elImg.src = this.inputs["src"].value;
      
      card.title = this.inputs["title"].value;
      card.src = this.inputs["src"].value;

      updatePages(cards);
      
      this.close();
    }
  }
}

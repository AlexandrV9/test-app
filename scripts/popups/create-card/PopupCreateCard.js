import { cards, listCards } from "../../../utils/constants.js";
import { getRandomId, handleGetCorrectDate, settingWidthGridTemplateColumnsListCards } from '../../../utils/helper.js';
import { inputsPopupCreateCard } from "./config.js";

import Popup from "../Popup.js";
import Card from "../../Card.js";

class PopupCreateCard extends Popup {
  constructor(cls) {
    super(cls);
    this.inputs = {};
    this.btnSubmit = this.popup.querySelector("#btn-send");
    this.init();
  }

  init() {
    super.init();
    this.btnSubmit.addEventListener("click", (event) => { this.onSubmit(event) });
  }

  open(availableActions) {
    this.availableActions = availableActions;
    super.open();
    this.inputs["title"].elInp.focus();
  }

  close() {
    Object.keys(this.inputs).forEach((key) => {
      this.inputs[key].value = "";
      this.inputs[key].elInp.value = "";
      this.inputs[key].elErr.textContent = "";
    });
    super.close();
  }

  onSubmit(event) {
    event.preventDefault();
    const { updatePages } = this.availableActions;
    const valid = this.validForm();
    if(valid) {
      const newCard = this.сreateNewCard();
     
      cards.push(newCard);
      listCards.append(newCard.elements.elCard);

      updatePages(cards);
      settingWidthGridTemplateColumnsListCards();

      this.close();
    }
  }

  сreateNewCard = () => {
    const [date, resDate] = handleGetCorrectDate();
    return new Card({
      id: getRandomId(),
      date,
      resDate,
      title: this.inputs["title"].value,
      author: this.inputs["author"].value,
      src: this.inputs["src"].value,
      availableActions: this.availableActions,
    })
  };
}

const popupCreateCard = new PopupCreateCard(".popup-create-card");

inputsPopupCreateCard.forEach(input => { popupCreateCard.addElInput(input) });
inputsPopupCreateCard.forEach(input => { popupCreateCard.addInputListener(input) });
inputsPopupCreateCard.forEach(input => { popupCreateCard.addChangeListener(input) });


export default popupCreateCard;
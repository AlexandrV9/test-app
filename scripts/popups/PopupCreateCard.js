import { cards } from "../../utils/constants.js";
import { getRandomId, handleGetCorrectDate } from '../../utils/helper.js';
import Popup from "./Popup.js";
import Card from "../Card.js";

const listCards = document.querySelector('.list-cards');
const handleAddNewCard = (card) => { listCards.prepend(card)}

export default class PopupCreateCard extends Popup {
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

  open() {
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

  validForm() {
    Object.keys(this.inputs).forEach((name) => {
      this.validationInput(this.inputs[name].value, name);
    });
    return !Object.values(this.inputs).map(({ valid }) => valid).includes(false);
  }

  onSubmit(event) {
    event.preventDefault();
    const valid = this.validForm();
    if(valid) {
      const newCard = this.сreateNewCard();
      const elCard = newCard.getElementCard("elCard");
      
      cards.push(newCard.getDataCard());
      handleAddNewCard(elCard);
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
    })
  };
}

import { cards } from "../../utils/constants.js"
import Popup from "./Popup.js";

console.log("PopupEditeCard ==> cards", cards)

export default class PopupEditeCard extends Popup {
  constructor(cls) {
    super(cls);
    this.inputs = {};
    this.btnSubmit = this.popup.querySelector("#btn-save");
    this.#init();
  }

  #init() {
    // console.log("init PopupEditeCard")
    // console.log("init PopupEditeCard == cards =>", cards)
    super.init()
    this.btnSubmit.addEventListener("click", (event) => { this.onSubmit(event) });
  }

  open({ id, elTitle, elImg }) {
    super.open();
    console.log({ id, elTitle, elImg })
    this.currentCard = { id, elTitle, elImg };
    this.inputs["title"].value = elTitle.textContent;
    this.inputs["src"].value = elImg.src;
  
    this.inputs["title"].elInp.value = elTitle.textContent;
    this.inputs["src"].elInp.value = elImg.src;

    this.inputs["title"].elInp.focus();
    console.log("PopupEditeCard == open == cards =>", cards)
  }

  onSubmit(event) {
    event.preventDefault();

    const { elImg, elTitle, id } = this.currentCard;

    console.log("PopupEditeCard == open == cards =>", cards)
    const card = cards.find(card => card.id === id);
    console.log(card)

    elTitle.textContent = this.inputs["title"].value;
    elImg.src = this.inputs["src"].value;
    card.title = this.inputs["title"].value;
    card.src = this.inputs["src"].value;
    
    this.close();
  }
}

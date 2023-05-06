import { cards, listCards } from "../../../utils/constants.js";
import { getRandomId, handleGetCorrectDate, settingWidthGridTemplateColumnsListCards } from '../../../utils/helper.js';
import { inputsPopupCreateCard } from "./config.js";

import Popup from "../Popup.js";
import Card from "../../Card.js";
import DragAndDrop from "./DragAndDrop.js";

class PopupCreateCard extends Popup{
  constructor(cls) {
    super(cls);
    this.inputs = {
      title: {
        value: "",
        elemInp: document.querySelector("#title"), 
        elemErr: document.querySelector(".error-title"),
      },
      author: {
        value: "",
        elemInp: document.querySelector("#author"), 
        elemErr: document.querySelector(".error-author"),
      },
      src: {
        value: "",
        elemInp: document.querySelector("#urlImg"), 
        elemErr: document.querySelector(".error-urlImg"),
      },
      fileImg: {
        value: "",
        clsInp: document.querySelector("#uploadFile"),
      }
    };

    this.btnSubmit = this.popup.querySelector("#btn-send");
    this.init();
  }

  static dragAndDrop = new DragAndDrop();

  handleInput = (name, event) => {
    this.inputs[name].value = event.target.value;
  }

  init() {
    super.init();

    this.inputs.title.elemInp.addEventListener("input", (event) => this.handleInput("title", event));
    this.inputs.author.elemInp.addEventListener("input", (event) => this.handleInput("author", event));
    this.inputs.src.elemInp.addEventListener("input", (event) => this.handleInput("src", event));

    this.btnSubmit.addEventListener("click", (event) => { this.onSubmit(event) });
  }

  open(availableActions) {
    super.open();
    this.availableActions = availableActions;
    this.inputs.title.elemInp.focus();
  }

  close() {
    this.inputs.title.value = "";
    this.inputs.title.elemInp.value = "";
    this.inputs.title.elemErr.textContent = "";

    this.inputs.author.value = "";
    this.inputs.author.elemInp.value = "";
    this.inputs.author.elemErr.textContent = "";

    this.inputs.src.value = "";
    this.inputs.src.elemInp.value = "";
    this.inputs.src.elemErr.textContent = "";

    this.inputs.fileImg.value = "";
    this.inputs.src.elemInp.value = "";

    super.close();
  }

  validForm() {

    let valid = true;


    console.log(this.inputs.title.value)

    if(!this.inputs.title.value) {
      this.inputs.title.elemErr.textContent = "Поле title обязательно"
      valid = false;
    } else {
      this.inputs.title.elemErr.textContent = ""
    }

    if(!this.inputs.author.value) {
      this.inputs.author.elemErr.textContent = "Поле author обязательно"
      valid = false;
    } else {
      this.inputs.author.elemErr.textContent = ""
    }

    if(!this.inputs.src.value && !PopupCreateCard.dragAndDrop.file) {
      this.inputs.src.elemErr.textContent = "Загрузите картинку в после слева или вставьте в ссылку на неё из интернета";
      valid = false;
    } else {
      this.inputs.src.elemErr.textContent = ""
    }

    return valid

  }

  onSubmit(event) {
    event.preventDefault();
    const { updatePages } = this.availableActions;
    const valid = this.validForm();

    if(valid) {
      console.log(valid)
      const newCard = this.сreateNewCard();
     
      cards.push(newCard);
      listCards.append(newCard.elements.elCard);

      updatePages(cards);
      settingWidthGridTemplateColumnsListCards();

      PopupCreateCard.dragAndDrop.handleClickBtnClearInput(event);

      this.close();
    }
  }

  сreateNewCard = () => {
    const [date, resDate] = handleGetCorrectDate();
    return new Card({
      id: getRandomId(),
      date,
      resDate,
      title: this.inputs.title.value,
      author: this.inputs.author.value,
      src: this.inputs.src.value || PopupCreateCard.dragAndDrop.srcImg,
      availableActions: this.availableActions,
    })
  };
}

const popupCreateCard = new PopupCreateCard(".popup-create-card");

export default popupCreateCard;
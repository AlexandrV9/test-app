import { cards, listCards } from "../../../utils/constants.js";
import {
  getRandomId,
  handleGetCorrectDate,
  settingWidthGridTemplateColumnsListCards,
} from "../../../utils/helper.js";

import Card from "../../Card.js";
import DragAndDrop from "../ui/DragAndDrop.js";
import PopupWithInputs from "../PopupWithInputs.js";

class PopupCreateCard extends PopupWithInputs {
  constructor(cls) {
    super(cls);
    this.inputs = {
      title: {
        value: "",
        elInp: this.getElementFromPopupDOM("#title"),
        elErr: this.getElementFromPopupDOM(".error_type_title"),
      },
      author: {
        value: "",
        elInp: this.getElementFromPopupDOM("#author"),
        elErr: this.getElementFromPopupDOM(".error_type_author"),
      },
      src: {
        value: "",
        elInp: this.getElementFromPopupDOM("#srcImg"),
        elErr: this.getElementFromPopupDOM(".error_type_srcImg"),
      },
      fileImg: {
        value: "",
        elInp: this.getElementFromPopupDOM("#uploadFile"),
      },
    };
    this.btnSubmit = this.getElementFromPopupDOM(".btn_type_add-new-card");

    this.init();
  }

  static DragAndDrop = new DragAndDrop();

  init() {
    super.init();

    this.inputs.title.elInp.addEventListener("input", this.onInputTitle);
    this.inputs.author.elInp.addEventListener("input", this.onInputAuthor);
    this.inputs.src.elInp.addEventListener("input", this.onInputSrc);
    this.btnSubmit.addEventListener("click", this.onSubmit);

    PopupCreateCard.DragAndDrop.init({ popup: this.popup });
  }

  onInputTitle = (event) => this.handleInput(event, "title");
  onInputAuthor = (event) => this.handleInput(event, "author");
  onInputSrc = (event) => this.handleInput(event, "src");
  onSubmit = (event) => this.handleSubmit(event);

  handleSubmit = (event) => {
    event.preventDefault();
    const valid = this.validForm();

    if (valid) {
      const newCard = this.сreateNewCard();
      const { updatePages } = this.availableActions;

      this.addNewCardInArrayCards(newCard);
      this.addNewCardInDOM(newCard);
      updatePages(cards);
      settingWidthGridTemplateColumnsListCards();

      PopupCreateCard.DragAndDrop.handleClickBtnClearInput(event);

      this.close();
    }
  };

  open(availableActions) {
    super.open();
    this.availableActions = availableActions;
    this.setInputFocusDOM("title")
  }

  close() {
    this.clearInput("title", 1, 1, 1);
    this.clearInput("author", 1, 1, 1);
    this.clearInput("src", 1, 1, 1);
    this.clearInput("fileImg", 1, 0, 0);
    super.close();
  }

  validForm() {
    let valid = true;

    if (!this.getInputValue("title")) {
      this.setInputErrorValueDOM("title", "Поле title обязательно");
      valid = false;
    } else {
      this.setInputErrorValueDOM("title", "");
    }

    if (!this.inputs.author.value) {
      this.setInputErrorValueDOM("author", "Поле author обязательно");
      valid = false;
    } else {
      this.setInputErrorValueDOM("author", "");
    }

    if(!this.getSrcImage()) {
      this.setInputErrorValueDOM("src", "Загрузите картинку в после слева или вставьте в ссылку на неё из интернета");
      valid = false;
    } else {
      this.setInputErrorValueDOM("src", "");
    }

    return valid;
  }

  сreateNewCard = () => {

    const [ date, resDate ] = handleGetCorrectDate();

    return new Card({
      date,
      resDate,
      id: getRandomId(),
      title: this.getInputValue("title"),
      author: this.getInputValue("author"),
      src: this.getSrcImage(),
      availableActions: this.getAvailableActions()
    });
  };

  getSrcImage = () => this.getInputValue("src") || PopupCreateCard.DragAndDrop.srcImg;

  addNewCardInArrayCards = card => cards.push(card);

  addNewCardInDOM = card => listCards.append(card.elements.elCard);

  getAvailableActions = () => this.availableActions;

}

const popupCreateCard = new PopupCreateCard(".popup_type_create-card");

export default popupCreateCard;

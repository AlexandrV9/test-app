import { cards } from "../../../utils/constants.js"
import PopupWithInputs from "../PopupWithInputs.js";
import DragAndDrop from "../ui/DragAndDrop.js";

export default class PopupEditeCard extends PopupWithInputs {
  constructor(cls) {
    super(cls);
    this.inputs = {
      title: {
        value: "",
        oldValue: "",
        elInp: this.getElementFromPopupDOM("#title"),
        elErr: this.getElementFromPopupDOM(".error_type_title"),
      },
      src: {
        value: "",
        oldValue: "",
        elInp: this.getElementFromPopupDOM("#srcImg"),
        elErr: this.getElementFromPopupDOM(".error_type_srcImg"),
      },
      fileImg: {
        value: "",
        oldValue: "",
        elInp: this.getElementFromPopupDOM("#uploadFile"),
      },
    };
    this.btnSubmit = this.getElementFromPopupDOM(".btn_type_save");
    this.#init();
  }

  static DragAndDrop = new DragAndDrop();

  #init() {
    super.init();

    this.inputs.title.elInp.addEventListener("input", this.onInputTitle);
    this.inputs.src.elInp.addEventListener("input", this.onInputSrc);
    this.btnSubmit.addEventListener("click", this.onSubmit);

    PopupEditeCard.DragAndDrop.init({ popup: this.popup });
  }

  onInputTitle = (event) => this.handleInput(event, "title");
  onInputSrc = (event) => this.handleInput(event, "src");
  onSubmit = (event) => this.handleSubmit(event);


  handleInput(event, name) {
    super.handleInput(event, name);
    this.setInputOldValue(name, event.target.value)
  }

  open({ id, elTitle, elImg, availableActions }) {
    super.open();
    this.availableActions = availableActions;
    this.currentCard = { id, elTitle, elImg };

    const regExp = /^data/gm;

    if(regExp.test(elImg.src)) {
      PopupEditeCard.DragAndDrop.changeBtnOnReset();
      PopupEditeCard.DragAndDrop.showImageInDOM(elImg.src);
    } else {
      this.setInputValue("src", elImg.src);
      this.setInputOldValue("src",  elImg.src)
      this.setInputValueDOM("src", elImg.src);
    }

    this.setInputValue("title", elTitle.textContent);
    this.setInputOldValue("title", elTitle.textContent);
    this.setInputValueDOM("title", elTitle.textContent)

    this.setInputFocusDOM("title");
  }

  close() {
    this.clearInput("title", 1, 1, 1);
    this.clearInput("src", 1, 1, 1);
    this.clearInput("fileImg", 1, 0, 0);
    PopupEditeCard.DragAndDrop.clear();

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

    if(!this.getSrcImage()) {
      this.setInputErrorValueDOM("src", "Загрузите картинку в после слева или вставьте в ссылку на неё из интернета");
      valid = false;
    } else {
      this.setInputErrorValueDOM("src", "");
    }

    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();

    const { updatePages } = this.availableActions;
    const { elImg, elTitle, id } = this.currentCard;

    const valid = this.validForm();

    if(valid) {
      const card = this.findCardById(cards, id);

      elTitle.textContent = this.getInputValue("title");
      elImg.src = this.getSrcImage();
      
      card.title = this.getInputValue("title");
      card.src = this.getSrcImage();

      updatePages(cards);

      PopupEditeCard.DragAndDrop.handleClickBtnClearInput(event);
      
      this.close();
    }
  }

  setInputOldValue = (name, value) => this.inputs[name].oldValue = value;
  findCardById = (cards, id) => cards.find(card => card.id === id);
  getSrcImage = () => this.getInputValue("src") || PopupEditeCard.DragAndDrop.srcImg;
}

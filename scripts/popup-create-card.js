import { cards } from '../src/index.js';

import { 
  handleGetCorrectDate, 
  getElementsNewCard,
  getRandomId,
  clearValueInputsInObj,
  onInput,
  preventDefaults,
  closePopupByKeyEsc,
  isValidHttpUrl,
  getFieldInputs,
} from '../utils/helper';

import { openPopupEditCard } from './popup-edit-card';
import { openPopupDeleteCard } from './popup-delete-card';
import { openPopupDragAndDropImg } from './popup-drag-and-drop-img';

const listCards = document.querySelector('.list-cards');

const popupCreateCard = document.querySelector(".popup-create-card");
const content = popupCreateCard.querySelector(".form-create-card");
const inputTitle = popupCreateCard.querySelector("#title");
const inputAuthor = popupCreateCard.querySelector("#author");
const inputUrl = popupCreateCard.querySelector("#urlImg");
const btnSend = popupCreateCard.querySelector("#btn-send");
const btnClose = popupCreateCard.querySelector("#btn-close");
const errorTitle = popupCreateCard.querySelector(".error-title");
const errorAuthor = popupCreateCard.querySelector(".error-author");
const errorUrl = popupCreateCard.querySelector(".error-urlImg");


let open = false;

const inputs = {
  title: {
    value: "",
    valid: false
  }, 
  author: {
    value: "",
    valid: false
  }, 
  src: {
    value: "",
    valid: false
  } 
}

export const openPopupCreateCard = () => {
  open = true;
  popupCreateCard.classList.add('active');
}
const closePopupCreateCard = () => {
  open = false;
  popupCreateCard.classList.remove('active')
  
  clearValueInputsInObj(inputs);
  
  inputTitle.value = "";
  inputAuthor.value = "";
  inputUrl.value = "";
}
const likes = (dataCard, el) => {
  dataCard.likes += 1;
  el.textContent = dataCard.likes;
}
const dislikes = (dataCard, el) => {
  dataCard.dislikes += 1;
  el.textContent = dataCard.dislikes;
}
const isValidText = (value, key) => {
  if (!value) {
    return {
      valid: false,
      message: `Поле ${key} обязательное`
    }
  } 
  if (value.length < 2) {
    return {
      valid: false,
      message: `Поле ${key} слишком короткое`
    }
  }
  if(value.length > 20) {
    return {
      valid: false,
      message: `Поле ${key} слишком длинное`
    }
  }
  return {
    valid: true,
    message: ""
  }
}


export const handleCreateNewCard = () => {

  const [date, resDate] = handleGetCorrectDate();
  const elNewCard = getElementsNewCard();
  const valueInputs = getFieldInputs(inputs, "value");

  const dataCard = { ...valueInputs, date, resDate, id: getRandomId(), likes: 0, dislikes: 0 };
  const { 
    elCard, 
    elTitle, 
    elAuthor, 
    elDate, 
    elImg, 
    btnEdit, 
    btnDelete, 
    btnLike, 
    btnDislike,
    elCountLike,
    elCountDislike
   } = elNewCard;

  elTitle.textContent = dataCard.title;
  elAuthor.textContent = dataCard.author;
  elDate.textContent = dataCard.resDate;
  elImg.src = dataCard.src;
  elCard.id = dataCard.id;

  btnEdit.addEventListener('click', () => { openPopupEditCard(elNewCard) })
  // btnEdit.addEventListener('click', () => { openPopupDragAndDropImg(elNewCard) })
  btnDelete.addEventListener('click', () => { openPopupDeleteCard(elNewCard) })
  btnLike.addEventListener('click', () => { likes(dataCard, elCountLike) })
  btnDislike.addEventListener('click', () => { dislikes(dataCard, elCountDislike) })

  cards.push(dataCard);

  return elCard;
}

function validForm(inputs) {
  onValid(inputs, "title", isValidText, errorTitle);
  onValid(inputs, "author", isValidText, errorAuthor);
  onValid(inputs, "src", isValidHttpUrl, errorUrl);

  const validInputs = getFieldInputs(inputs, "valid");
  return !Object.values(validInputs).includes(false);
}

const handleAddNewCard = (card) => { listCards.prepend(card)}
const handleSubmit = (event) => {
  preventDefaults(event);
  if(validForm(inputs)) {
    const newCard = handleCreateNewCard();
    handleAddNewCard(newCard);
    closePopupCreateCard();
  }
}

const onValid = (obj, key, funValid, elError) => {
  const { valid, message } = funValid(obj[key].value, key);
  elError.textContent = message;
  obj[key].valid = valid;

  if(!valid) {
    elError.classList.add("active");
  } else {
    elError.classList.remove("active");
  }
}

inputTitle.addEventListener("input", (event) => onInput(event, inputs, "title"));
inputAuthor.addEventListener("input", (event) => onInput(event, inputs, "author"));
inputUrl.addEventListener("input", (event) => onInput(event, inputs, "src"));

inputTitle.addEventListener("change", () =>  onValid(inputs, "title", isValidText, errorTitle));
inputAuthor.addEventListener("change", () =>  onValid(inputs, "author", isValidText, errorAuthor));
inputUrl.addEventListener("change", () => onValid(inputs, "src", isValidHttpUrl, errorUrl));


popupCreateCard.addEventListener('click', closePopupCreateCard);
btnClose.addEventListener("click", closePopupCreateCard);
document.addEventListener('keyup', (event) => { closePopupByKeyEsc(event, closePopupCreateCard, open) });

content.addEventListener('click', preventDefaults)
btnSend.addEventListener("click", handleSubmit);
import { cards } from '../src/index.js';

import { 
  handleGetCorrectDate, 
  getElementsNewCard,
  getRandomId,
  clearValueInputsInObj,
  onChangeInput,
  preventDefaults,
  closePopupByKeyEsc,
  isValidHttpUrl
} from '../utils/helper';

import { openPopupEditCard } from './popup-edit-card';
import { openPopupDeleteCard } from './popup-delete-card';
import { openPopupDragAndDropImg } from './popup-drag-and-drop-img';

const listCards = document.querySelector('.list-cards');

const popupCreateCard = document.querySelector(".popup-create-card");
const content = popupCreateCard.querySelector(".form-create-card");
const inputTitle = popupCreateCard.querySelector("#title");
const inputAuthor = popupCreateCard.querySelector("#author");
const inputUrlImg = popupCreateCard.querySelector("#urlImg");
const btnSend = popupCreateCard.querySelector("#btn-send");
const btnClose = popupCreateCard.querySelector("#btn-close");

let open = false;
const inputs = { title: "", author: "", src: "" }

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
  inputUrlImg.value = "";
}
const likes = (dataCard, el) => {
  dataCard.likes += 1;
  el.textContent = dataCard.likes;
}
const dislikes = (dataCard, el) => {
  dataCard.dislikes += 1;
  el.textContent = dataCard.dislikes;
}

export const handleCreateNewCard = () => {

  const valid = isValidHttpUrl(inputs.src);
  if(!valid) return null;

  const [date, resDate] = handleGetCorrectDate();
  const dataCard = { ...inputs, date, resDate, id: getRandomId(), likes: 0, dislikes: 0 };
  const elNewCard = getElementsNewCard();
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
const handleAddNewCard = (card) => { listCards.prepend(card)}
const handleSubmit = (event) => {
  preventDefaults(event)
  const newCard = handleCreateNewCard();
  if(newCard) {
    handleAddNewCard(newCard);
  }

  closePopupCreateCard();
}

inputTitle.addEventListener("input", (event) => onChangeInput(event, inputs, "title"));
inputAuthor.addEventListener("input", (event) => onChangeInput(event, inputs, "author"));
inputUrlImg.addEventListener("input", (event) => onChangeInput(event, inputs, "src"));

popupCreateCard.addEventListener('click', closePopupCreateCard);
btnClose.addEventListener("click", closePopupCreateCard);
document.addEventListener('keyup', (event) => { closePopupByKeyEsc(event, closePopupCreateCard, open) });

content.addEventListener('click', preventDefaults)
btnSend.addEventListener("click", handleSubmit);






// КАРТОЧКА 1 пустая размекта ====> inputs (данные) =====> запис между тегами инфу из input-ов =====> btnEdit.addEvent(openPopupEditCard ===> данные КАРТОЧКА 1)
//                                                                                                .openPopupDeleteCard

// КАРТОЧКА 2 пустая размекта ====> inputs (данные) =====> запис между тегами инфу из input-ов =====> btnEdit.addEvent(openPopupEditCard ===> данные КАРТОЧКА 2)
//                                                                                                .openPopupDeleteCard

// КАРТОЧКА 3 пустая размекта ====> inputs (данные) =====> запис между тегами инфу из input-ов =====> btnEdit.addEvent(openPopupEditCard ===> данные КАРТОЧКА 3)
//                                                                                                .openPopupDeleteCard
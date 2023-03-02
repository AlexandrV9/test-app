import { cards } from '../src/index.js';

import { 
  handleGetCorrectDate, 
  correctSaveValue, 
  getElementsNewCard,
  getRandomId,
  clearValueInputsInObj,
  onChangeInput,
  handleStopPropagation
} from '../utils/helper';

import { openPopupEditCard } from './popup-edit-card';
import { openPopupDeleteCard } from './popup-delete-card';

const listCards = document.querySelector('.list-cards');

const popupCreateCard = document.querySelector(".popup-create-card");
const content = popupCreateCard.querySelector(".form-create-card");
const inputTitle = popupCreateCard.querySelector("#title");
const inputAuthor = popupCreateCard.querySelector("#author");
const inputUrlImg = popupCreateCard.querySelector("#urlImg");
const btnSend = popupCreateCard.querySelector("#btn-send");
const btnClose = popupCreateCard.querySelector("#btn-close");

let openModal = false;
const inputs = { title: "", author: "", src: "" }

export const openPopupCreateCard = () => {
  openModal = true;
  popupCreateCard.classList.add('active');
}
const closePopupCreateCard = () => {
  openModal = false;
  popupCreateCard.classList.remove('active')
  
  clearValueInputsInObj(inputs);
  
  inputTitle.value = "";
  inputAuthor.value = "";
  inputUrlImg.value = "";
}
export const handleCreateNewCard = () => {

  const [date, resDate] = handleGetCorrectDate();
  const dataCard = { ...inputs, date, resDate, id: getRandomId() };
  const elNewCard = getElementsNewCard();
  const { elCard, elTitle, elAuthor, elDate, elImg, btnEdit, btnDelete } = elNewCard;

  elTitle.textContent = dataCard.title;
  elAuthor.textContent = dataCard.author;
  elDate.textContent = dataCard.resDate;
  elImg.src = dataCard.src;
  elCard.id = dataCard.id;

  btnEdit.addEventListener('click', () => { openPopupEditCard(elNewCard) })
  btnDelete.addEventListener('click', () => { openPopupDeleteCard(elNewCard) })

  cards.push(dataCard);

  return elCard;
}
const handleSubmit = (event) => {
  event.preventDefault()
  const newCard = handleCreateNewCard()
  handleAddNewCard(newCard);
  closePopupCreateCard();
}
const handleAddNewCard = (card) => { listCards.prepend(card)}
const closePopupByKeyEsc = (event) => {
  if(event.key === "Escape" && openModal) {
    closePopupCreateCard();
  }
}

// inputs
inputTitle.addEventListener("input", (event) => onChangeInput(event, inputs, "title"));
inputAuthor.addEventListener("input", (event) => onChangeInput(event, inputs, "author"));
inputUrlImg.addEventListener("input", (event) => onChangeInput(event, inputs, "src"));

// close popup
popupCreateCard.addEventListener('click', closePopupCreateCard);
btnClose.addEventListener("click", closePopupCreateCard);
document.addEventListener('keyup', closePopupByKeyEsc);

// create new card
content.addEventListener('click', handleStopPropagation)
btnSend.addEventListener("click", handleSubmit);

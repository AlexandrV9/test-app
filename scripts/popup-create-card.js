import { cards } from '../src/index.js';
import { handleGetCorrectDate, correctSaveValue } from '../utils/helper';
import { openPopupEditCard } from './popup-edit-card';

const listCards = document.querySelector('.list-cards');
const tmplNewCard = document.querySelector('#tmpl-new-card')

const modalWindowCreateCard = document.querySelector(".popup-create-card");
const modalContent = modalWindowCreateCard.querySelector(".form-create-card");

const inputTitle = modalWindowCreateCard.querySelector("#title");
const inputAuthor = modalWindowCreateCard.querySelector("#author");
const inputUrlImg = modalWindowCreateCard.querySelector("#urlImg");

const btnSend = modalWindowCreateCard.querySelector("#btn-send");
const btnClose = modalWindowCreateCard.querySelector("#btn-close");

let openModal = false;

const inputs = {
  title: "",
  author: "",
  urlImg: "",
}

export const openPopupCreateCard = () => {
  openModal = true;
  modalWindowCreateCard.classList.add('active');
}
const closePopupCreateCard = () => {
  openModal = false;
  modalWindowCreateCard.classList.remove('active')

  Object.keys(inputs).forEach(key => { inputs[key] = ""})

  inputTitle.value = "";
  inputAuthor.value = "";
  inputUrlImg.value = "";
}

export const handleCreateNewCard = (data) => {

  const [date, resDate] = handleGetCorrectDate();
  const id = Math.floor(Math.random() * Date.now()).toString(16);
  const dataCard = { ...data, date, resDate, id }
  
  const cloneContent = tmplNewCard.content.cloneNode(true);
  const card = cloneContent.querySelector('.card');
  const cardTitle = card.querySelector('.card-title');
  const cardAuthor = card.querySelector('.card-author');
  const cardData = card.querySelector('.card-txt-data');
  const cardImg = card.querySelector('.card-img');
  const cardEditButton = card.querySelector('.btn-edite');

  correctSaveValue(cardTitle, dataCard, "textContent", "", "title");
  correctSaveValue(cardAuthor, dataCard, "textContent", "", "author");
  correctSaveValue(cardData, dataCard, "textContent", "", "resDate");
  correctSaveValue(cardImg, dataCard, "src", "", "urlImg");
  correctSaveValue(card, dataCard, "", "id");

  cardEditButton.addEventListener('click', () => { openPopupEditCard(id) })

  cards.push(dataCard);

  return card;
}

const handleAddNewCard = (card) => { listCards.prepend(card)}

const onChangeInput = (event, key) => { inputs[key] = event.target.value }

inputTitle.addEventListener("input", (event) => onChangeInput(event, "title"));
inputAuthor.addEventListener("input", (event) => onChangeInput(event, "author"));
inputUrlImg.addEventListener("input", (event) => onChangeInput(event, "urlImg"));

modalWindowCreateCard.addEventListener('click', closePopupCreateCard);
modalContent.addEventListener('click', (event) => { event.stopPropagation() })

btnClose.addEventListener("click", closePopupCreateCard);
btnSend.addEventListener("click", (event) => {
  event.preventDefault()
  const newCard = handleCreateNewCard(inputs)
  handleAddNewCard(newCard)
  closePopupCreateCard();
});

document.addEventListener('keyup', (event) => {
  if(event.key === "Escape" && openModal) {
    closePopupCreateCard();
  }
});
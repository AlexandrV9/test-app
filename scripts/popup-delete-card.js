import { cards } from '../src/index';
import { handleStopPropagation } from '../utils/helper'

const deletePopup = document.querySelector('.popup-delete-card');
const contentPopup = deletePopup.querySelector(".content");

const btnClose = deletePopup.querySelector("#btn-close");
const btnDelete = deletePopup.querySelector('#btn-delete');
const btnCancel = deletePopup.querySelector('#btn-cancel');

let currentElCard = "";
let open = false;

const deleteCard = () => {
  const index = cards.findIndex(card => card.id === currentElCard.id);
  if(index !== -1) {
    cards.splice(index, 1);
    currentElCard.remove();
  } else {
    console.log("В массиве данной карточки нет!")
  }
}

const openPopupDeleteCard = ({ elCard }) => {
  currentElCard = elCard;
  deletePopup.classList.add("active");
  open = true
}

const closePopupDeleteCard = () => {
  deletePopup.classList.remove("active");
  open = false;
}

const handleSubmit = (event) => {
  event.preventDefault();
  deleteCard();
  closePopupDeleteCard();
}

contentPopup.addEventListener('click', handleStopPropagation);
btnDelete.addEventListener('click', handleSubmit);
btnClose.addEventListener('click', closePopupDeleteCard);
deletePopup.addEventListener('click', closePopupDeleteCard);
btnCancel.addEventListener('click', closePopupDeleteCard);

document.addEventListener('keyup', (event) => {
  if(event.key === "Escape" && open) {
    closePopupDeleteCard();
  }
});

export {
  openPopupDeleteCard,
  closePopupDeleteCard
}
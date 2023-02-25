import '../styles/root.css';
import { openPopupCreateCard } from "../scripts/popup-create-card.js";

const btnAddNewCard = document.querySelector('.btn-add-new-card');

export const cards = [];

btnAddNewCard.addEventListener("click", openPopupCreateCard);
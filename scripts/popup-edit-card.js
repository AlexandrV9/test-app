import { handleStopPropagation } from "../utils/helper";
import { cards } from "../src/index";

const editPopup = document.querySelector('.popup-edit-card');
const contentPopup = editPopup.querySelector(".form-edit-card");
const inputTitle = editPopup.querySelector("#title");
const inputUrlImg = editPopup.querySelector("#urlImg");
const btnClose = editPopup.querySelector("#btn-close");
const btnSave = editPopup.querySelector('#btn-save');

const inputs = { title: "", src: "" }
let currentElementsCard = "";
let open = false;

const editCard = () => {
  const { elImg, elTitle, elCard } = currentElementsCard;
  const card = cards.find(card => card.id === elCard.id);

  elTitle.textContent = inputs.title;
  elImg.src = inputs.src;
  card.title = inputs.title;
  card.src = inputs.src;
}

const openPopupEditCard = ({ elCard, elTitle, elImg }) => {
  currentElementsCard = { elCard, elTitle, elImg };

  inputs.title = elTitle.textContent;
  inputTitle.value = elTitle.textContent;
  inputs.urlImg = elImg.src;
  inputUrlImg.value = elImg.src;

  editPopup.classList.add("active");
  open = true
}

const closePopupEditCard = () => {
  editPopup.classList.remove("active");
  open = false;
}

const handleSubmit = (event) => {
  event.preventDefault();
  editCard();
  closePopupEditCard();
}

const onChangeInput = (event, key) => { inputs[key] = event.target.value };

inputTitle.addEventListener("input", (event) => onChangeInput(event, "title"));
inputUrlImg.addEventListener("input", (event) => onChangeInput(event, "src"));

contentPopup.addEventListener('click', handleStopPropagation);
btnClose.addEventListener('click', closePopupEditCard);
btnSave.addEventListener('click', handleSubmit)

document.addEventListener('keyup', (event) => {
  if(event.key === "Escape" && open) {
    closePopupEditCard();
  }
});

export {
  openPopupEditCard,
  closePopupEditCard
}
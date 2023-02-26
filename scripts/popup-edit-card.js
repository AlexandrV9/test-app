import { getElementsCard, correctSaveValue } from "../utils/helper";
import { cards } from "../src/index";

const editPopup = document.querySelector('.popup-edit-card');
const contentPopup = editPopup.querySelector(".form-edit-card");

const btnClose = editPopup.querySelector("#btn-close");
const btnSave = editPopup.querySelector('#btn-save')

const inputTitle = editPopup.querySelector("#title");
const inputUrlImg = editPopup.querySelector("#urlImg");

const inputs = { title: "", urlImg: "" }
let currentCard = "";
let open = false;

const editCard = () => {
  const card = cards.find(card => card.id === currentCard.id);

  correctSaveValue(currentCard, inputs, "textContent", "title",);
  correctSaveValue(currentCard.img, inputs, "", "", "urlImg", "src");
  correctSaveValue(card, inputs, "", "urlImg");
  correctSaveValue(card, inputs, "", "title");

}

const openPopupEditCard = (id) => {
  currentCard = getElementsCard(id);

  inputs.title = currentCard["title"].textContent;
  inputTitle.value = currentCard["title"].textContent;

  inputs.urlImg = currentCard["img"].src;
  inputUrlImg.value = currentCard["img"].src;

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
inputUrlImg.addEventListener("input", (event) => onChangeInput(event, "urlImg"));

contentPopup.addEventListener('click', (event) => { event.stopPropagation() })
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
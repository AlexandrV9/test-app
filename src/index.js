import '../styles/root.css';


const btnAddNewCard = document.querySelector('.btn-add-new-card');

const listCards = document.querySelector('.list-cards');
const tmplNewCard = document.getElementById('tmpl-new-card');

const cards = [];


const handleGetCorrectDate = () => {
  const data = Date.now();
  const currentDate = new Date(data);

  const correctElDate = (value) => {
    return value < 10 ? '0' + value : value
  }

  const day = correctElDate(currentDate.getDate())
  const month = correctElDate(currentDate.getMonth() + 1);
  const year = correctElDate(currentDate.getFullYear());

  const resDate = `${day}/${month}/${year}`;
  return [data, resDate]
}

const handleCreateNewCard = ({ title, author, urlImg }) => {
  const cloneContent = tmplNewCard.content.cloneNode(true);
  const card = cloneContent.querySelector('.card');

  const cardTitle = card.querySelector('.card-title');
  const cardAuthor = card.querySelector('.card-author');
  const cardData = card.querySelector('.card-txt-data');
  const cardImg = card.querySelector('.card-img');

  const [date, resDate] = handleGetCorrectDate();
  const id = Math.floor(Math.random() * Date.now()).toString(16);

  cardTitle.textContent = title;
  cardAuthor.textContent = author;
  cardData.textContent = resDate;
  cardImg.src = urlImg;
  card.id = id;

  cards.push({ 
    id,
    title, 
    author, 
    date, 
    urlImg 
  })

  return card;
}


const handleAddNewCard = (card) => {
  listCards.prepend(card)
  console.log(cards)
}













const modalWindowCreateCard = document.querySelector(".popup-create-card");

const modalContent = modalWindowCreateCard.querySelector(".form-create-card");
const inputTitle = modalWindowCreateCard.querySelector("#title");
const inputAuthor = modalWindowCreateCard.querySelector("#author");
const inputUrlImg = modalWindowCreateCard.querySelector("#urlImg");
const btnSend = modalWindowCreateCard.querySelector("#btn-send");
const btnClose = modalWindowCreateCard.querySelector("#btn-close");

let openModal = false;

let valueInputTitle = "";
let valueInputAuthor = "";
let valueInputUrlImg = "";

function handleModal() {
  if (!openModal) {
    openModal = true;
    btnAddNewCard.setAttribute('disabled', true)
    modalWindowCreateCard.classList.add('active');
  } else {
    openModal = false;
    btnAddNewCard.removeAttribute('disabled');
    modalWindowCreateCard.classList.remove('active')
    inputTitle.value = "";
    inputAuthor.value = "";
    inputUrlImg.value = "";
    valueInputTitle = "";
    valueInputAuthor = "";
    valueInputUrlImg = "";
  }
}

btnAddNewCard.addEventListener("click", handleModal);
btnClose.addEventListener("click", handleModal);

inputTitle.addEventListener("input", (event) => {
  valueInputTitle = event.target.value;
});

inputAuthor.addEventListener("input", (event) => {
  valueInputAuthor = event.target.value;
});

inputUrlImg.addEventListener("input", (event) => {
  valueInputUrlImg = event.target.value;
});

modalWindowCreateCard.addEventListener('click', handleModal);
modalContent.addEventListener('click', (event) => { event.stopPropagation() })

btnSend.addEventListener("click", (event) => {
  event.preventDefault()
  const newCard = handleCreateNewCard({ 
    title: valueInputTitle, 
    author: valueInputAuthor, 
    urlImg: valueInputUrlImg,
  })
  handleAddNewCard(newCard)
  handleModal();
});

document.addEventListener('keyup', (event) => {
  if(event.key === "Escape" && openModal) {
    handleModal();
  }
});

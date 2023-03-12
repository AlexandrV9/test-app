import '../styles/root.css';

import { cards, testCardsFromServer } from "../utils/constants.js";
import { handleGetCorrectDate } from '../utils/helper.js';
import { isValidText, isValidHttpUrl } from "../scripts/validation.js";

import PopupCreateCard from '../scripts/popups/PopupCreateCard.js';
import Card from '../scripts/Card.js';

const listCards = document.querySelector('.list-cards');
const btnAddNewCard = document.querySelector('.btn-add-new-card');

const testGetCardsFromServer = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(testCardsFromServer)
    })
  })
}

// function test() {
//   fetch("http://localhost:8000/cards?owner_id=1")
//   .then(res => res.json())
//   .then(data => {
//         console.log("data ===>", data)
//         cards = data
//         console.log("cards ===>", cards)

//   })
//   .catch(err => console.log(err))
// }

// test();

// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
// https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/


// Задачи:
// 
// 2. Добавить валидацию форм                                                     (+/-)
// 2. Сделать ОПТИМИЗАЦИЮ!!!!                                                     (+)
// 3. Запретить прокрутку окна при открытом попапе                                (-)
// 4. Переделать стили для карточки на гридах                                     (+)
// 5. Изменить параметры контейнера, так чтобы он показывал карточки, как надо    (-)
// 6. Сделать адпативную вёрстку                                                  (-)
// 7. Файлы картинок должны сохраняться на сервере и всё остальное тоже           (-)
// 8. Создать учебный сервер, БД - MySQL                                          (-)
// 9. Заставить webpack dev server обновлять страницу при измении чего-либо       (+)



const inputsPopupCreateCard = [
  { 
    name: "title", 
    clsInp: "#title", 
    clsErr: ".error-title",
    funValid: isValidText
  },
  { 
    name: "author", 
    clsInp: "#author", 
    clsErr: ".error-author",
    funValid: isValidText
  },
  {
    name: "src", 
    clsInp: "#urlImg", 
    clsErr: ".error-urlImg",
    funValid: isValidHttpUrl
  }
]

const popupCreateCard = new PopupCreateCard(".popup-create-card");

inputsPopupCreateCard.forEach(input => { popupCreateCard.addElInput(input) });
inputsPopupCreateCard.forEach(input => { popupCreateCard.addInputListener(input) });
inputsPopupCreateCard.forEach(input => { popupCreateCard.addChangeListener(input) });

btnAddNewCard.addEventListener('click', () => { popupCreateCard.open() });


const showCardsSendFromServer = async () => {
  const [date, resDate] = handleGetCorrectDate();
  const data = await testGetCardsFromServer();
  
  data.forEach((card) => { 
    const newCard = new Card({ date, resDate, ...card })
    const elCard = newCard.getElementCard("elCard");
    const dataCard = newCard.getDataCard();
    cards.push(dataCard)
    listCards.prepend(elCard)
  }) 
}

showCardsSendFromServer();

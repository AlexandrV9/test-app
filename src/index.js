import '../styles/root.css';

import "../scripts/panels/PanelSearch";
import "../scripts/panels/PanelCards";

import { cards, listCards, testCardsFromServer } from "../utils/constants.js";
import { handleGetCorrectDate, settingWidthGridTemplateColumnsListCards } from '../utils/helper.js';

import Card from '../scripts/Card.js';

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

// https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
// https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/


// Задачи:

// 6. Сделать адпативную вёрстку                                                  (-)
// 7. Файлы картинок должны сохраняться на сервере и всё остальное тоже           (-)
// 8. Создать учебный сервер, БД - MySQL                                          (-)


const showCardsSendFromServer = async () => {
  const [date, resDate] = handleGetCorrectDate();
  const data = await testGetCardsFromServer();
  
  data.forEach((card) => { 
    const newCard = new Card({ date, resDate, ...card });  
    cards.push(newCard)
    listCards.append(newCard.elements.elCard)
  }) 
}

// test();
settingWidthGridTemplateColumnsListCards();
showCardsSendFromServer();

window.addEventListener('resize', settingWidthGridTemplateColumnsListCards);
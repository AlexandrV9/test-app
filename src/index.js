import '../styles/root.css';
import { openPopupCreateCard } from "../scripts/popup-create-card.js";

const btnAddNewCard = document.querySelector('.btn-add-new-card');

export let cards = [];

btnAddNewCard.addEventListener("click", openPopupCreateCard);

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
// 2. Добавить валидацию форм
// 3. Запретить прокрутку окна при открытом попапе
// 4. Переделать стили для карточки на гридах
// 5. Изменить параметры контейнера, так чтобы он показывал карточки, как надо
// 6. Сделать адпативную вёрстку
// 7. Файлы картинок должны сохраняться на сервере и всё остальное тоже
// 8. Создать учебный сервер, БД - MySQL
// 9. Заставить webpack dev server обновлять страницу при измении чего-либо
// import { cards, listCards, testCardsFromServer } from "../utils/constants.js";
// const panelPaginationListCards = document.querySelector(".panel-pagination-list-cards");
// const elemUL = panelPaginationListCards.querySelector("ul");
// let currentPage = 1;

// export const mainFuncPagination = (cards) => {
//   const panelPaginationListCards = document.querySelector(".panel-pagination-list-cards");

//   const btnPrev = panelPaginationListCards.querySelector(".btn-prev");
//   const btnNext = panelPaginationListCards.querySelector(".btn-next");
//   const elemUL = panelPaginationListCards.querySelector("ul");

//   let visibleCards = [];

//   const handleShowPages = () => {
//     // Показывает страницы, если их меньше 5
//     if(maxPages < 5){
//       return Array.from({ length: maxPages }).map((_, index) => index + 1);
//     }

//     const lastPages = maxPages - currentPage;
//   // Не даёт перейти вправо на несуществующие страницы
//     if(lastPages < 3) {
//       return Array.from({ length: 5 }).map((_, index) => maxPages - 4 + index)
//     }
//     // не даёт отриц. страниц
//     if(currentPage < 3) {
//       return Array.from({ length: 5 }).map((_, index) =>  index + 1)
//     }
//     // обычное переключение - активный страница по центру
//     return Array.from({ length: 5 }).map((_, index) => currentPage + index - 2);

//   } // ===> [1, 2, 3, 4] или [4, 5, 6, 7, 8]


//   const handleShowCards = () => {

//     listCards.innerHTML = "";

//     const startIndex = (currentPage - 1) * 10;
//     const finishIndex = (currentPage - 1) * 10 + 10;

//     visibleCards = cards.slice(startIndex, finishIndex);

//     visibleCards.forEach((card) => {   
//       listCards.append(card.elements.elCard)
//     })
//   }

//   const handleClickNextButton = () => {
//     if (maxPages - currentPage < 6) {
//       currentPage = maxPages;
//     } else {
//       currentPage += 5;
//     }
//     elemUL.innerHTML = "";
//     pages = handleShowPages();
//     showMarkup();
//     handleShowCards();
//   }

//   const handleClickPrevButton = () => {
//     if (currentPage < 6) {
//       currentPage = 1;
//     } else {
//       currentPage -= 5;
//     }
//     elemUL.innerHTML = "";
//     pages = handleShowPages();
//     showMarkup();
//     handleShowCards();
//   }


//   const numberСards = cards.length;
//   const maxPages = Math.ceil(numberСards / 10);

//   if(currentPage > maxPages) {
//     currentPage = maxPages;
//   }

//   let pages = handleShowPages()

//   const showMarkup = () => {
//     pages.forEach(page => {
//       const elNewItem = createElPage(page);
//       elemUL.append(elNewItem);
//     })
//   }

//   const createElPage = (value) => {
//     const itemLiPage = document.createElement('li');
//     if(currentPage === value) {
//       itemLiPage.classList.add('active');
//     }
//     itemLiPage.textContent = value;

//     itemLiPage.addEventListener("click", (event) => {
//       event.preventDefault();
//       currentPage = value;
//       elemUL.innerHTML = "";
//       pages = handleShowPages();
//       showMarkup();
//       handleShowCards();
//     })
  
//     return itemLiPage
//   }

//   btnPrev.addEventListener('click', handleClickPrevButton)
//   btnNext.addEventListener('click', handleClickNextButton)

//   showMarkup();
//   handleShowCards();

// }


// export const updatePages = (cards) => {
//   elemUL.innerHTML = "";
//   console.log("запуск updatePages")
//   mainFuncPagination(cards);
// }


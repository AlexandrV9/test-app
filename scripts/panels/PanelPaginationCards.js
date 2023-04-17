import { listCards } from "../../utils/constants.js";

class PanelPaginationCards {
  constructor() {

    // this.cards = cards;
    this.panel = document.querySelector(".panel-pagination-list-cards");
    this.containerPages = this.panel.querySelector('ul');
    // this.numberСards = parseInt(cards.length);
    this.currentPage = 1;
    this.btnPrev = this.panel.querySelector(".btn-prev");
    this.btnNext = this.panel.querySelector(".btn-next");

    this.visibleCards = [];

    // this.#init();
  }
  

  #init() {
    this.numberСards = parseInt(this.cards.length);
    this.maxPages = Math.ceil(this.numberСards / 10);

    if(this.currentPage > this.maxPages) {
      this.currentPage =  this.maxPages;
    }

    this.pages = this.handleShowPages();
    this.showMarkup();

    this.btnNext.addEventListener('click', this.handleClickNextButton);
    this.btnPrev.addEventListener('click', this.handleClickPrevButton);
  }

  updatePages = (cards) => {
    this.cards = cards;
    this.#init();
  }

  showMarkup = () => {
    this.containerPages.innerHTML = "";
    const fragment = document.createDocumentFragment();
    this.pages.forEach(page => {
      fragment.append(this.createElPage(page))
    })
    this.containerPages.append(fragment)
    this.handleShowCards();
  }

  createElPage = (value) => {
    const itemLiPage = document.createElement('li');
    if(this.currentPage === value) {
      itemLiPage.classList.add("active");
    }
    itemLiPage.addEventListener("click", () => {
      this.handleChangePage(value)
    })
    itemLiPage.textContent = value;
    return itemLiPage;
  }

  handleShowPages = () => {

    // Если число страниц меньше 5, то просто отображаем их.
    // 1. Формируем сначала пустой массив нужной длины ==> 4
    // 2. Преобразуем его к след. виду [1, 2, 3, 4]

    if (this.maxPages < 5) {
      return Array.from({ length: this.maxPages }).map((_, index) => index + 1);
    }

    // Вычисляем сколько страниц отсалось.
    // Допустим всего 20 страниц, текущая страница 16
    // Тогда lastPages = 20 - 18; =====> 2
    const lastPages = this.maxPages - this.currentPage;
  
    // Если страниц осталось меньше 3х
    if (lastPages < 3) {
      return Array.from({ length: 5 }).map((_, index) => this.maxPages - 4 + index);
    }

    // Если текущий номер страницы меньше 3х
    if (this.currentPage < 3) {
      return Array.from({ length: 5 }).map((_, index) => index + 1);
    }
    // Обычное переключение
    return Array.from({ length: 5 }).map((_, index) => this.currentPage + index - 2);
  }

  handleChangePage = (page) => {
    this.currentPage = page;
    this.containerPages.innerHTML = "";
    this.pages = this.handleShowPages();
    this.showMarkup();
  }

  handleClickNextButton = () => {
    if (this.maxPages - this.currentPage < 6) {
      this.currentPage = this.maxPages;
    } else {
      this.currentPage += 5;
    }
    this.containerPages.innerHTML = "";
    this.pages = this.handleShowPages();
    this.showMarkup();
  }

  handleClickPrevButton = () => {
    if (this.currentPage < 6) {
      this.currentPage = 1;
    } else {
      this.currentPage -= 5;
    }
    this.containerPages.innerHTML = "";
    this.pages = this.handleShowPages();
    this.showMarkup();
  }

  handleShowCards = () => {

    listCards.innerHTML = "";

    const startIndex = (this.currentPage - 1) * 10;
    const finishIndex = (this.currentPage - 1) * 10 + 10;

    this.visibleCards = this.cards.slice(startIndex, finishIndex);

    this.visibleCards.forEach((card) => {   
      listCards.append(card.elements.elCard)
    })
  }
}

export default PanelPaginationCards;
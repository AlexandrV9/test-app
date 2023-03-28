import { cards } from "../../utils/constants";

const listCards = document.querySelector('.list-cards');

class PanelSearch {
  constructor() {
    this.panel = document.querySelector('.panel-search');
    this.btnSearch = document.querySelector('.btn-search');
    this.inputSearch = document.querySelector('#form-search-input');

    this.inputs = {
      search: {
        value: "",
        valid: false
      }
    }

    this.#init();
  }

  #init() {
    this.inputSearch.addEventListener('input', this.handleInputValue);
    this.btnSearch.addEventListener('click', this.handleSearch);
  }

  handleInputValue = (event) => { 
    this.inputs.search.value = event.target.value
  }

  sortCardsInOrderDOM = (elCard, index) => {

    // получаем текущий список карточек из разметки
    const currentElListCardsInDOM = document.querySelectorAll(".card");
  
    // если index превысил длину списка currentElListCardsInDOM,
    // то добавляем карточку в самый конец
    if(index >= currentElListCardsInDOM.length) {
      return listCards.append(elCard.elements.elCard);
      
    }
    // Берём порядок текущей карточки
    const currentElCardOrder = parseInt(currentElListCardsInDOM[index].dataset.order); 
  
    // Если порядок карточки из массива карточек, который нужно покказать
    // меньше порядка карточки из разметки
    if(elCard.order < currentElCardOrder) {
      // добавляем карточку перед текущей из разметки
      return listCards.insertBefore(elCard.elements.elCard, currentElListCardsInDOM[index])
    } 
    
    if(elCard.order > currentElCardOrder)  {
      // это нужно, чтобы понять куда вставлять карточку, если её порядок
      // больше текущей карточки из разметки
      return this.sortCardsInOrderDOM(elCard, index + 1);
    } 
  }

  sortCardsDOM = (elCard) => {
    const listCards = document.querySelector('.list-cards');
    if(!listCards.querySelector(`li.card[data-id="${elCard.id}"]`)) {
      listCards.append(elCard.elements.elCard);
    }
  }

  handleSearch = (event) => {

    event.preventDefault();
    
    const regexp = new RegExp(this.inputs.search.value, "i");   
    // регулярное выражение, которое будем использовать для поиска
  
    const filteredIdСards = []; // тут будут лежать id карточек, которые нужно показать
    const filteredElCards = []; // тут будут лежать карточки, которые нужно показать
  
    // находим нужные карточки из всего массива
    cards.forEach(elCard => {
      if(regexp.test(elCard.title)) {
        filteredIdСards.push(elCard.id);
        filteredElCards.push(elCard);
      }
    })
  
    // находим карточки, которые в данный момент показываются на странице
    let currentElListCards = listCards.querySelectorAll('.card');
  
    // удаляем из разметки не нужные карточки
    for(let currentElCard of currentElListCards.values()) {
      if(!filteredIdСards.includes(currentElCard.dataset.id)) {
        currentElCard.remove()
      }
    }
  
    let index = 0;
  
    filteredElCards.forEach(elCard => {
      // 1) Сортировка учитывающая порядок следования элементов
      this.sortCardsInOrderDOM(elCard, index);
  
      // 2) Сортировка без учитывания порядка следования элементов
      // sortCardsDOM(elCard)
  
      index = 0;
    })
  }
}

const panelSearch = new PanelSearch();

export default panelSearch;
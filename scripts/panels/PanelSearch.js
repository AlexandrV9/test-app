import { cards } from "../../utils/constants";

class PanelSearch {
  constructor({ availableActions }) {
    this.availableActions = availableActions;
    this.panel = document.querySelector('.panel_type_search');
    this.btnSearch = this.panel.querySelector('.btn_type_search');
    this.inputSearch = this.panel.querySelector('form');

    this.inputs = {
      search: {
        value: "",
        valid: false
      }
    }

    this.#init();
  }

  #init() {
    this.inputSearch.addEventListener('input', this.onInput);
    this.btnSearch.addEventListener('click', this.onSubmit);
  }

  onInput = event => this.handleInputValue(event);
  onSubmit = event => this.handleSearch2(event);

  handleInputValue = (event) => { 
    this.inputs.search.value = event.target.value
  }

  sortCardsInOrderDOM = (elCard, index) => {
    
    const listCards = document.querySelector(".panel_type_cards ul");
    // получаем текущий список карточек из разметки
    const currentElListCardsInDOM = document.querySelectorAll(".panel_type_cards li");

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
    const listCards = this.panel.querySelector('ul');
    if(!listCards.querySelector(`li.card[data-id="${elCard.id}"]`)) {
      listCards.append(elCard.elements.elCard);
    }
  }

  handleSearch2 = (event) => {
    event.preventDefault();
    const { updatePages } = this.availableActions;
    const regexp = new RegExp(this.inputs.search.value, "i");  
    const filteredElCards = cards.filter(elCard => regexp.test(elCard.title));
    updatePages(filteredElCards);
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
    let currentElListCards = document.querySelectorAll('.panel_type_cards li');
  
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

export default PanelSearch;
import PopupDeleteCard from './popups/delete-card/PopupDeleteCard.js';
import PopupEditeCard from './popups/edite-card/PopupEditeCard.js';

import { 
  getElementsNewCard
} from '../utils/helper.js';

import {
  isValidText,
  isValidHttpUrl
} from './validation.js';


const inputsEditeCreateCard = [
  { 
    name: "title", 
    clsInp: "#title", 
    clsErr: ".error-title",
    funValid: isValidText
  },
  {
    name: "src", 
    clsInp: "#urlImg", 
    clsErr: ".error-urlImg",
    funValid: isValidHttpUrl
  } 
]

export default class Card {

  constructor({ title, author, src, likes = 0, dislikes = 0, date, resDate, id, availableActions }) {
    this.title = title;
    this.author = author;
    this.src = src;
    this.likes = likes;
    this.dislikes = dislikes;
    this.date = date;
    this.resDate = resDate;
    this.id = id;
    this.availableActions = availableActions;
    
    this.#init({ title, author, src, resDate, id });

    Card.#initPopupEditeCard();
    Card.#initPopupDeleteCard();
  }

  static #popupDeleteCard = new PopupDeleteCard(".popup-delete-card");
  static #popupEditeCard = new PopupEditeCard('.popup-edite-card');

  static #order = 1;

  static #increaseOrder = () => {
    Card.#order += 1;
  }

  static #initPopupEditeCard() {

    inputsEditeCreateCard.forEach(input => { 
      Card.#popupEditeCard.addElInput(input) 
    })
    inputsEditeCreateCard.forEach(({ name }) => { 
      Card.#popupEditeCard.addInputListener({ name }) 
    })
    inputsEditeCreateCard.forEach(({ name, funValid }) => { 
      Card.#popupEditeCard.addChangeListener({ name, funValid })
    })
  }
  static #initPopupDeleteCard() {}
  
  #init({ title, author, src, resDate, id }) {

    this.elements = getElementsNewCard();

    this.elements.elTitle.textContent = title;
    this.elements.elAuthor.textContent = author;
    this.elements.elDate.textContent = resDate;
    this.elements.elImg.src = src;
    this.elements.elCard.dataset.id = id;
    
    this.elements.elCard.dataset.order = Card.#order;
    this.order = Card.#order;

    this.elements.btnLike.addEventListener('click', () => { this.like() })
    this.elements.btnDislike.addEventListener('click', () => { this.dislike() })

    this.elements.btnDelete.addEventListener('click', () => { 
      Card.#popupDeleteCard.open({ id, elCard: this.elements.elCard, availableActions: this.availableActions })
    })
    this.elements.btnEdite.addEventListener('click', () => {
      Card.#popupEditeCard.open({ id, elTitle: this.elements.elTitle, elImg: this.elements.elImg, availableActions: this.availableActions })
    })
    
    Card.#increaseOrder();
  }

  like() {
    const newValue = this.likes + 1;
    this.likes = newValue;
    this.elements.elCountLike.textContent = newValue;
  }

  dislike() {
    const newValue = this.dislikes + 1;
    this.dislikes = newValue;
    this.elements.elCountDislike.textContent = newValue;
  }

  getDataCard() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      src: this.src,
      likes: this.likes,
      dislikes: this.dislikes,
      order: this.order
    }
  }
}
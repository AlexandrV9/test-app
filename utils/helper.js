import { listCards } from "./constants";

export const getRandomId = () => {
  return Math.floor(Math.random() * Date.now()).toString(16);
}
export const clearValueInputsInObj = (obj) => {
  Object.keys(obj).forEach(key => { obj[key].value = ""})
}
export const preventDefaults = (event) => { 
  event.preventDefault()
  event.stopPropagation() 
};
export const handleGetCorrectDate = () => {
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
export const getElementsNewCard = () => {
  const tmplNewCard = document.querySelector('#tmpl-new-card')

  const cloneContent = tmplNewCard.content.cloneNode(true);

  const elCard = cloneContent.querySelector('li');
  const elTitle = elCard.querySelector('.title');
  const elAuthor = elCard.querySelector('.author');
  const elDate = elCard.querySelector('.date');
  const elImg = elCard.querySelector('.image');
  const elCountLike = elCard.querySelector('.likes .value');
  const elCountDislike = elCard.querySelector('.dislike .value');
  
  const btnLike = elCard.querySelector('.btn_type_like');
  const btnEdite = elCard.querySelector('.btn_type_edite');
  const btnDelete = elCard.querySelector('.btn_type_delete');
  const btnAddFavorites = elCard.querySelector('.btn_type_add-favorites');
  
  return {
    elCard,
    elTitle, 
    elAuthor, 
    elDate, 
    elImg,
    elCountLike,
    elCountDislike,
    btnLike,
    btnEdite,
    btnDelete,
    btnAddFavorites
  }
}
export const closePopupByKeyEsc = (event, callback, open) => {
    if(event.key === "Escape" && open) {
      callback();
    }
}
export const isValidHttpUrl = (string, key) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return {
      valid: false,
      message: "Неправильная ссылка на картинку"
    };
  }
  if(url.protocol === "http:" || url.protocol === "https:") {
    return {
      valid: true,
      message: ""
    }
  } else {
    return {
      valid: false,
      message: "Неправильная ссылка на картинку"
    };
  }
}

export const getFieldInputs = (inputs, field) => {
  const resObj = {};
  Object.keys(inputs).forEach(key => { 
    resObj[key] = inputs[key][field];
  });
  return resObj;
}

export const onInput = (event, obj, key) => { 
  obj[key].value = event.target.value;
};

export const settingWidthGridTemplateColumnsListCards = () => {
  listCards.style.gridTemplateColumns = `repeat(${Math.floor((listCards.offsetWidth - 60) / 300) }, 1fr)`
}
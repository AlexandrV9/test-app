export const getRandomId = () => {
  return Math.floor(Math.random() * Date.now()).toString(16);
}
export const clearValueInputsInObj = (obj) => {
  Object.keys(obj).forEach(key => { obj[key] = ""})
}
export const onChangeInput = (event, obj, key) => { obj[key] = event.target.value };
export const handleStopPropagation = (event) => { event.stopPropagation() };
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
  // const card = document.querySelector(`li.card[id="${id}"]`);
  const tmplNewCard = document.querySelector('#tmpl-new-card')
  const cloneContent = tmplNewCard.content.cloneNode(true);
  const elCard = cloneContent.querySelector('.card');
  const elTitle = elCard.querySelector('.card-title');
  const elAuthor = elCard.querySelector('.card-author');
  const elDate = elCard.querySelector('.card-txt-date');
  const elImg = elCard.querySelector('.card-img');

  const elCountLike = elCard.querySelector('.like .value');
  const elCountDislike = elCard.querySelector('.dislike .value');

  const btnLike = elCard.querySelector('.btn-like');
  const btnDislike = elCard.querySelector('.btn-dislike');
  const btnEdit = elCard.querySelector('.btn-edite');
  const btnDelete = elCard.querySelector('.btn-delete');
  const btnAddFavorites = elCard.querySelector('.btn-add-favorites');
  
  return {
    elCard,
    elTitle, 
    elAuthor, 
    elDate, 
    elImg,
    elCountLike,
    elCountDislike,
    btnLike,
    btnDislike,
    btnEdit,
    btnDelete,
    btnAddFavorites
  }
}
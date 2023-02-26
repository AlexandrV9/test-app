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
export const getElementsCard = (id) => {
  const card = document.querySelector(`li.card[id="${id}"]`);
  const title = card.querySelector('.card-title');
  const author = card.querySelector('.card-author');
  const data = card.querySelector('.card-txt-data');
  const img = card.querySelector('.card-img');

  const countLike = card.querySelector('.like .value');
  const countDislike = card.querySelector('.dislike .value');

  const btnLike = card.querySelector('.btn-like');
  const btnDislike = card.querySelector('.btn-dislike');
  const btnEditCard = card.querySelector('.btn-edite');
  const btnDelete = card.querySelector('.btn-delete');
  const btnAddFavorites = card.querySelector('.btn-add-favorites');
  
  return {
    id,
    card,
    title, 
    author, 
    data, 
    img,
    countLike,
    countDislike,
    btnLike,
    btnDislike,
    btnEditCard,
    btnDelete,
    btnAddFavorites
  }
}
export const correctSaveValue = (result, sourse, property = "", keyC = "", keyS = "", keyR = "") => {

  // currentCard.img.src = inputs.urlImg;
  if (keyC && property) {
    result[keyC][property] = sourse[keyC] ? sourse[keyC] : result[keyC][property];
    console.log('1')
  }

  if(keyC && !property) {
    result[keyC] = sourse[keyC] ? sourse[keyC] : result[keyC];
    console.log('2')
  }

  if(keyR && keyS && property) {
    result[keyR][property] = sourse[keyS] ? sourse[keyS] : result[keyR][property];
    console.log('3')
  }

  if(keyR && keyS && !property) {
    result[keyR] = sourse[keyS] ? sourse[keyS] : result[keyR];
    console.log('4')
  }

  if(!keyR && keyS && property) {
    result[property] = sourse[keyS] ? sourse[keyS] : result[property];
    console.log('5')
  }

}
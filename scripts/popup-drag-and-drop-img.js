import { cards } from '../src/index';
import { preventDefaults, closePopupByKeyEsc } from '../utils/helper';

const dragAndDropImgPopup = document.querySelector('.popup-drag-and-drop-img');
const contentPopup = dragAndDropImgPopup.querySelector(".content");
const dropArea = dragAndDropImgPopup.querySelector('.drop-area');
const textOr = dragAndDropImgPopup.querySelector('span');
const label = dragAndDropImgPopup.querySelector('label');
const btnClose = dragAndDropImgPopup.querySelector("#btn-close");

let open = false;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

dropArea.addEventListener('dragenter', () => {
  console.log("dragenter");
  highlight();

}, false);
dropArea.addEventListener('dragover', () => {
  console.log("dragover");
  highlight();
}, false);

dropArea.addEventListener("dragleave", () => {
  console.log("dragleave");
  unhighlight();
}, false);

const handleFiles = (files) => {
  return 
}

dropArea.addEventListener("drop", (event) => {
  unhighlight();
  console.log("drop");
  let dt = event.dataTransfer;
  let files = dt.files
  console.log(dt, files)

}, false)



function highlight() {
  dropArea.classList.add('highlight');
}

function unhighlight() {
  dropArea.classList.remove('highlight')
  console.log()
}

const openPopupDragAndDropImg = () => {
  dragAndDropImgPopup.classList.add("active");
  open = true;
}

const closePopupDragAndDropImg = () => {
  dragAndDropImgPopup.classList.remove("active");
  open = false;
}

document.addEventListener('keyup', () => { closePopupByKeyEsc(event, closePopupDragAndDropImg, open) });
contentPopup.addEventListener('click', preventDefaults);
btnClose.addEventListener('click', closePopupDragAndDropImg);
dragAndDropImgPopup.addEventListener('click', closePopupDragAndDropImg)

export {
  openPopupDragAndDropImg
}


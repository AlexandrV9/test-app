import { isValidText, isValidHttpUrl } from "../../validation";

export const inputsPopupCreateCard = [
  { 
    name: "title", 
    clsInp: "#title", 
    clsErr: ".error-title",
    funValid: isValidText
  },
  { 
    name: "author", 
    clsInp: "#author", 
    clsErr: ".error-author",
    funValid: isValidText
  },
  {
    name: "src", 
    clsInp: "#urlImg", 
    clsErr: ".error-urlImg",
    funValid: isValidHttpUrl
  }
]
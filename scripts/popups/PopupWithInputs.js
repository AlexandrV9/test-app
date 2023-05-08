import Popup from "./Popup";

export default class PopupWithInputs extends Popup {
  constructor(cls) {
    super(cls);
  }


  handleInput = (event, name) => this.inputs[name].value = event.target.value;

  setInputValue = (name, value) => this.inputs[name].value = value;
  setInputValueDOM = (name, value) => this.inputs[name].elInp.value = value;
  setInputErrorValueDOM = (name, value) => this.inputs[name].elErr.textContent = value;
  setInputFocusDOM = name => this.inputs[name].elInp.focus();
  getInputValue = name => this.inputs[name].value;
  clearInput = (name, v = 0, i = 0, e = 0) => {
    if(v === 1) this.inputs[name].value = "";
    if(i === 1) this.inputs[name].elInp.value = "";
    if(e === 1) this.inputs[name].elErr.textContent = "";
  };
}
export default class Popup {
  constructor(cls) {
    this.inputs = {}
    this.isOpen = false;
    this.popup = document.querySelector(`${cls}`);
    this.content = this.popup.querySelector(".content");
    this.btnClose = this.popup.querySelector("#btn-close");
  }

  init() {
    this.btnClose.addEventListener("click", () => { this.close() });
    document.addEventListener('keyup', (event) => {
      if(event.key === "Escape" && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    this.isOpen = true;
    document.body.style.overflow = "hidden";
    this.popup.classList.add('active');
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = "auto";
    this.popup.classList.remove('active');
  }

  addInputListener({ name }) {
    this.inputs[name].elInp.addEventListener("input", (event) => {
      this.inputs[name].value = event.target.value;
    });
  }

  validationInput(value, name) {
    const { valid, message } = this.inputs[name].funValid(name, value);
    this.inputs[name].elErr.textContent = message;
    this.inputs[name].valid = valid;
    this.showErrMessage(valid, name);
  }

  addChangeListener({ name }) {
    this.inputs[name].elInp.addEventListener("change", (event) => {
      this.validationInput(event.target.value, name);
    });
  }
  
  addElInput({ name, clsInp, clsErr, funValid }) {
    this.inputs[name] = {
      value: "",
      valid: false,
      elInp: this.popup.querySelector(`${clsInp}`),
      elErr: this.popup.querySelector(`${clsErr}`),
      funValid: funValid
    };
  }

  validForm() {
    Object.keys(this.inputs).forEach((name) => {
      this.validationInput(this.inputs[name].value, name);
    });
    return !Object.values(this.inputs).map(({ valid }) => valid).includes(false);
  }

  showErrMessage(valid, name) {
    if (!valid) {
      this.inputs[name].elErr.classList.add("active");
    } else {
      this.inputs[name].elErr.classList.remove("active");
    }
  }
}
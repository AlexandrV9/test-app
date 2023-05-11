export default class Popup {
  constructor(cls) {
    this.clsPopup = cls;
    this.isOpen = false;
    this.popup = document.querySelector(`${cls}`);
    this.content = this.getElementFromPopupDOM(".content");
    this.btnClose = this.getElementFromPopupDOM(".btn_type_close");
  }

  init() {
    this.btnClose.addEventListener("click", this.onClose);
    document.addEventListener("keyup", this.onCloseByKey);
  }

  onClose = (event) => this.close(event);
  onCloseByKey = (event) => this.handleCloseByKey(event);

  handleCloseByKey = (event) => {
    if (event.key === "Escape" && this.isOpen) this.close();
  };

  open() {
    this.isOpen = true;
    this.setClassElementDOM(this.clsPopup, "active");
    this.enabledWindowVerticallScroll();
  }

  close() {
    this.isOpen = false;
    this.removeClassElementDOM(this.clsPopup, "active");
    this.enabledWindowVerticallScroll();
  }

  disabledWindowVerticallScroll = () => {
    this.setClassElementDOM("body", "action_popup-open");
    this.setClassElementDOM("header", "action_popup-open");
    this.setClassElementDOM(
      ".panel_type_pagination-list-cards",
      "action_popup-open"
    );
    this.setClassElementDOM("header", "action_popup-open");
  };

  enabledWindowVerticallScroll = () => {
    if (this.hasWindowVerticallScroll()) {
      this.removeClassElementDOM("body", "action_popup-open");
      this.removeClassElementDOM("header", "action_popup-open");
      this.removeClassElementDOM(
        ".panel_type_pagination-list-cards",
        "action_popup-open"
      );
      this.removeClassElementDOM("header", "action_popup-open");
    }
  };

  hasWindowVerticallScroll = () =>
    window.innerWidth !== document.documentElement.clientWidthl;
  getElementFromPopupDOM = (cls) => this.popup.querySelector(cls);
  setClassElementDOM = (selector, cls) =>
    document.querySelector(selector).classList.add(cls);
  removeClassElementDOM = (selector, cls) =>
    document.querySelector(selector).classList.remove(cls);
}

export default class BaseView {
  constructor() {
    this._element = element;
    this._title
  }
  show() {
    this.element.hidden = false;
    this.render();
  }

  hide() {
    this.element.hidden = true;
  }

  render() { }
}

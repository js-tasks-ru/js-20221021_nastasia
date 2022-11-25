export default class NotificationMessage {
  static activeNotification;

  constructor (contentText = '',
    {
      duration = 0,
      type = 'success'
    } = {}) {

    this.contentText = contentText;
    this.duration = duration;
    this.type = type;
    this.durationSec = (this.duration / 1000).toFixed(0);

    this.render();
  }

  render () {
    let element = document.createElement('div');

    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;
    console.log(this.element);
  }

  getTemplate () {
    return `<div class="notification ${this.type}" style="--value:${this.durationSec}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.contentText}
      </div>
    </div>
  </div>`;
  }

  show (element) {
    console.log(this.element);
    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
    NotificationMessage.activeNotification = this.element;
    if (element) {
      element.append(this.element);
    }
    else {
      document.body.append(this.element);
    }

    setTimeout(this.remove.bind(this), this.duration);
  }

  remove() {
    this.element.remove();
    console.log(this.element);
  }

  destroy() {
    console.log(this.element);
    this.remove();
    this.element.remove();
    NotificationMessage.activeNotification = null;
  }
}

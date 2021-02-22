export default class EventChannel extends EventTarget {
  constructor() {
    super();
  }
    on = (event, fn) => {
      // TODO: validationooon
      this.addEventListener(event, fn);
    }
    emit = (event, data) => {
        // TODO: validationooon
        this.dispatchEvent(new CustomEvent(event, data));
    }
}; 
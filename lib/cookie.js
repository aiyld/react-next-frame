import Cookies from "js-cookie";

class Cookie {
  get(key) {
    let value;
    value = Cookies.get(key);
    if (!value) return null;
    try {
      value = JSON.parse(value);
    } catch (e) {}
    return value;
  }

  set(key, value) {
    if (typeof value === "undefined") return undefined;
    if (typeof value === "number" || typeof value === "string") {
      Cookies.set(key, value);
    } else {
      Cookies.set(key, JSON.stringify(value));
    }
  }

  clear(key) {
    Cookies.remove(key);
  }

  remove(key) {
    this.clear(key);
  }
}

export default new Cookie();

import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';

// singleton
let instance = null;

/**
 * Fake API
 */
class Fake {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  
  /**
   * Set initial consumer key/config
   * @param {*String} consumerKey
   * @param {*Object} config
   */
  install(consumerKey, config) {
    if (!isString(consumerKey)) {
      throw new TypeError("Consumer key is required and must be a string");
    }
    if (config && !isPlainObject(config)) {
      throw new TypeError("config must be an object");
    }

    this.consumerKey = consumerKey;
    this.config = config || {};
    this.initialized = true;
  }
  
  /**
   * Returns a list of variation ids
   * @param {*Function} callback 
   */
  getVariations(callback) {
    if (!this.initialized) {
      throw new Error("Fake was not initiallized. Make sure to call 'install' with a consumer key first.");
    }

    const variations = [1, 2, 3, 4, 5];
    // ... xhr request to retrieve list of variations
    callback.call(Fake, variations);
  }
}

const fake = new Fake();
export default fake;

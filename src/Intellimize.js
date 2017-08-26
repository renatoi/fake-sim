// singleton
let instance = null;

/**
 * Intellimize API
 */
class Intellimize {
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
    this.consumerKey = consumerKey;
    this.config = config;
  }
  
  /**
   * Returns a list of variation ids
   * @param {*Function} callback 
   */
  getVariations(callback) {
    const variations = [1, 2, 3, 4, 5];
    // ... xhr request to retrieve list of variations
    callback.call(Intellimize, variations);
  }
}

const intellimize = new Intellimize();
export default intellimize;

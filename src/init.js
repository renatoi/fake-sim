import intellimize from './Intellimize';

(function(w) {
  console.log('api');

  function processQueue() {
    while (intellimizeQueue.length > 0) {
      // remove first item of the queue and convert it to an array (arguments is an object)
      let args = [...intellimizeQueue.shift()];
      let method = args.shift();
      if (method in intellimize) {
        intellimize[method].apply(intellimize, args);
      }
    }
  }
  
  // handle initialization
  w.intellimizeQueue = w.intellimizeQueue || [];
  
  // process queue in case intellimizeQueue was already set
  processQueue();
  
  // Call processQueue() everytime push() is called from now on
  const originalPush = intellimizeQueue.push;
  intellimizeQueue.push = function () {
    originalPush.apply(intellimizeQueue, [...arguments]);
    return processQueue();
  };
})(window);
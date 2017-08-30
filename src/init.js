import fake from './Fake';

(function(w) {
  console.log('api');

  function processQueue() {
    while (fakeQueue.length > 0) {
      // remove first item of the queue and convert it to an array (arguments is an object)
      let args = [...fakeQueue.shift()];
      let method = args.shift();
      if (method in fake) {
        fake[method].apply(fake, args);
      }
    }
  }
  
  // handle initialization
  w.fakeQueue = w.fakeQueue || [];
  
  // process queue in case fakeQueue was already set
  processQueue();
  
  // Call processQueue() everytime push() is called from now on
  const originalPush = fakeQueue.push;
  fakeQueue.push = function () {
    originalPush.apply(fakeQueue, [...arguments]);
    return processQueue();
  };
})(window);
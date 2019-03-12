const observe = (data) => {
  if (!data || typeof data !== 'object') return;

  for (let key in data) {
    const val = data[key];
    Object.defineProperty(data, key, {
      enumerable: true,
      configrable: true,
      get: function () {
        console.log(`key-name: ${key}: val`);
        return val;
      }
    });
    if (typeof val === 'object') {
      observe(val);
    }
  }
};

export default observe;

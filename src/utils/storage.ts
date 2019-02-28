

const tryCatch = (fn: any) => {
  try {
    if (typeof fn === 'function') {
      return fn();
    }
  } catch (e) {
    console.log('error');
  }
  return null;
};

const setV = (key: string, value: string) => {
  if (typeof localStorage != 'undefined') {
    localStorage.setItem(key, value);
  }
};

const getV = (key: string) => {
  if (typeof localStorage !== 'undefined') {
    let res: any = localStorage.getItem(key);
    res = tryCatch(() => JSON.parse(res));
    return res;
  }
  return null;
};

export default {
  setValue: (key: string, value: any) => {
    let cacheableValue: string | undefined = '';
    if (typeof value !== 'string') {
      cacheableValue = tryCatch(() => JSON.stringify(value));
    } else {
      cacheableValue = value;
    }
    if (cacheableValue) {
      setV(key, value);
      cacheableValue = undefined;
    }
  },
  getValue: (key: string) => {
    if (!key) return null;
    return getV(key);
  },
};

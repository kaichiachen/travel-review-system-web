export const setStore = (name, content) => {
  if (!name) return;
  let contents = '';
  if (typeof content !== 'string') {
    contents = JSON.stringify(content);
  } else {
    contents = content;
  }
  window.localStorage.setItem(name, contents);
};

export const getStore = (name) => {
  if (!name) return '';
  return window.localStorage.getItem(name);
};

export const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

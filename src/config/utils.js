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

export const timeConverter = (UNIXtimestamp) => {
  const a = new Date(UNIXtimestamp * 1000);
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  // const hour = a.getHours();
  // const min = a.getMinutes();
  // const sec = a.getSeconds();
  const time = `${year}年${month}${date}日`;
  return time;
};

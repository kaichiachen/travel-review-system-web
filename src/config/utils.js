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
  const a = new Date(UNIXtimestamp);
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

const TreeNode = () => {
  this.val = null;
  this.left = null;
  this.right = null;
};

const sortListToBST = (postinfo) => {
  const middleIndex = parseInt(postinfo.length / 2, 0);
  const n = new TreeNode();
  n.val = postinfo[middleIndex];
  if (middleIndex === 0) {
    n.left = null;
  } else {
    n.left = sortListToBST(postinfo.slice(0, middleIndex));
  }
  if (middleIndex + 1 >= postinfo.length) {
    n.right = null;
  } else {
    n.right = sortListToBST(postinfo.slice(middleIndex + 1, postinfo.length));
  }
  return n;
};

/* eslint arrow-body-style: ["error", "always"] */
export const makeBST = (postinfo) => {
  return sortListToBST(postinfo.sort((a, b) => {
    return a.submittime > b.submittime;
  }));
};

export const displayBST = (postBST) => {
  if (postBST === null) {
    return;
  }
  displayBST(postBST.left);
  /* eslint no-console: ["error", { allow: ["debug"] }] */
  console.debug(postBST.val);
  displayBST(postBST.right);
};

const getPostList = (postList, postBST, searchtime) => {
  if (postBST === null) {
    return;
  }
  getPostList(postList, postBST.Left, searchtime);
  if (searchtime > postBST.time) {
    postList.push(postBST);
  }
  getPostList(postList, postBST.Right, searchtime);
};

export const findPost = (postBST, searchtime, searchString) => {
  const postList = [];
  if (postBST === null) {
    return [];
  }
  postList.push(...findPost(postBST.right, searchtime, searchString));
  /* eslint no-console: ["error", { allow: ["debug"] }] */
  if (searchtime <= postBST.val.submittime && (searchString === '' || searchString === postBST.val.title || searchString === postBST.val.location)) {
    postList.push(postBST.val);
  }
  postList.push(...findPost(postBST.left, searchtime, searchString));
  return postList;
};


export const creteLsp = (target) => {
  const lsp = [];
  let i;
  let j;
  lsp.push(0);
  i = 1;
  j = 0;
  while (i < target.length) {
    if (target[i] === target[j]) {
      j += 1;
      lsp[i] = j;
      i += 1;
    } else if (lsp[j] !== 0) {
      j = lsp[j - 1];
    } else {
      lsp[i] = 0;
      i += 1;
    }
  }
  return lsp;
};
/* eslint arrow-body-style: ["error", "always"] */
export const kmp = (text, target) => {
  let i;
  let j;
  const lsp = creteLsp(target);
  const ret = [];
  i = 0;
  j = 0;

  if (!target.length || !text.length) {
    return [];
  }

  while (i < text.length) {
    if (text[i] === target[j]) {
      if (j === (target.length - 1)) {
        // console.log("targettern found at " + (i-j) + " -> " + target)
        ret.push(i - j);
        i += 1;
        j = 0;
      } else {
        i += 1;
        j += 1;
      }
    } else if (j === 0) {
      i += 1;
    } else {
      j = lsp[j - 1];
    }
  }
  /* eslint consistent-return: "error" */
  return ret;
};

export const replaceStr = (target, str, index) => {
  let saveWord = '*';
  for (let i = 1; i < str.length; i += 1) {
    saveWord += '*';
  }
  // /* eslint no-console: ["error", { allow: ["debug"] }] */
  // console.debug(log);
  const retString = target.substr(0, index).concat(saveWord);
  retString.concat(target.substr(index + str.length, (target.length - index) + str.length));
  return retString;
};


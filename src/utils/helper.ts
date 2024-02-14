import { extensions } from './index';
import img1 from '../assets/images/dollar.png';
import img2 from '../assets/images/medal.png';
import img3 from '../assets/images/trophy.png';

export function getImageByExtension(extension: string) {
  if (extensions[extension]) {
    return `/assets/images/${extensions[extension].icon}`;
  } else {
    return `/assets/images/${extensions['fallback'].icon}`;
  }
}

export const getSiteName = (url: string) => {
  let web = url?.toString()?.trim()?.split('//').pop();
  let link = web?.replace('www.', '');
  return link === '#' ? '' : link;
};

export function getSubscriptionImageByType(type: number) {
  return type === 1 ? img3 : type === 2 ? img2 : img1;
}

export function getSubscriptionName(type: number) {
  return type === 1
    ? 'Premium User'
    : type === 2
    ? 'Standard User'
    : 'Free User';
}

export function joinURL(...args: string[]) {
  return args.join('/');
}

export function UUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const excludingMenuPaths = [
  'login',
  'register',
  '/admin/login',
  'forgot-password',
  'reset',
  'x-studio',
];

const excludingFooterPaths = [
  'xcode',
  'forgot-password',
  'reset',
  'register',
  'file-preview',
  'login',
  'admin/login',
  'project-detail',
  'x-studio',
];

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateUrl(url: string) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    url
  );
}

export function splitPath(path: string) {
  return path.split('/');
}

export function goBackPaths(filepath: string) {
  const path = splitPath(filepath);
  path.pop();
  let newPath = path.length > 1 ? path[path.length - 1] : '';
  if (path.length > 1) path.pop();
  let newRootPath = path.join('/');
  return { prevPath: newRootPath || '/', name: newPath };
}

export function sortObjectByName(a: { name: string }, b: { name: string }) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

export function copyToClipboard(text: string) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? true : false;
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
    throw err;
  }

  document.body.removeChild(textArea);
  return msg;
}

export const excludeFromPaths = (excudingPathArray: string[], path: string) => {
  return excudingPathArray.some((p) => {
    return path.includes(p);
  });
};

export function isAbsoluteURL(url: string) {
  return url.indexOf('://') > 0 || url.indexOf('//') === 0;
}

export const showMenu = (path: string) => {
  let show = true;
  if (excludeFromPaths(excludingMenuPaths, path)) {
    show = false;
  }
  return show;
};

export const showFooter = (path: string) => {
  let show = true;
  if (excludeFromPaths(excludingFooterPaths, path)) {
    show = false;
  }
  return show;
};

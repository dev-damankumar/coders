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

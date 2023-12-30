import extensions from "./extension";
function getImageByExtension(extension: string) {
  if (extensions[extension]) {
    return `/assets/images/${extensions[extension].icon}`;
  } else {
    return `/assets/images/${extensions["fallback"].icon}`;
  }
}

export default getImageByExtension;

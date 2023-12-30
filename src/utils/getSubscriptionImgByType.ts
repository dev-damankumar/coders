import img1 from "../assets/images/dollar.png";
import img2 from "../assets/images/medal.png";
import img3 from "../assets/images/trophy.png";
function getSubscriptionImageByType(type: number) {
  return type === 1 ? img3 : type === 2 ? img2 : img1;
}

export default getSubscriptionImageByType;

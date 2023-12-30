function getSubscriptionName(type: number) {
  return type === 1
    ? "Premium User"
    : type === 2
    ? "Standard User"
    : "Free User";
}

export default getSubscriptionName;

const getSiteName = (url: string) => {
  let web = url?.toString()?.trim()?.split("//").pop();
  let link = web?.replace("www.", "");
  return link === "#" ? "" : link;
};
export default getSiteName;

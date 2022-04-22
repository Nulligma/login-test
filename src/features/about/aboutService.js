import axios from "axios";

const aboutUrl = "https://js1.10up.com/wp-json/wp/v2/pages";

export const fetchAboutService = async () => {
  const response = await axios.get(aboutUrl);

  let aboutObj = response.data.find((o) => o.slug === "about-us");

  return aboutObj.content.rendered;
};

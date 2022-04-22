import axios from "axios";

const fetchBlogURL = "https://js1.10up.com/wp-json/wp/v2/posts";

export const fetchBlogService = async () => {
  const response = await axios.get(fetchBlogURL);

  return response.data;
};

import axios from "axios";

export const fetchAuthorService = async (urls) => {
  const response = await axios.all(urls.map((url) => axios.get(url)));
  const authors = {};

  for (const value of response) {
    authors[value.data.id] = value.data.name;
  }
  return authors;
};

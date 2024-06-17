import axios from "axios";

const Api = axios.create({
  baseURL: "https://api-portfolio.itechdev.my.id",
});

export default Api;

import axios from "axios";

//desahws-001-site1.qtempurl.com/
export default axios.create({
  // baseURL: "http://localhost:5003",
  baseURL: "https://desahws-001-site1.qtempurl.com/",

  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

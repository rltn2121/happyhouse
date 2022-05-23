import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    "auth-token": sessionStorage.getItem("access-token"),
  },
  withCredentials: true, // default: false, false인 경우 sessionid를 매번 신규로 발급
});

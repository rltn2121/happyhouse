import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:9999",
    headers: {
        "Content-type": "application/json",
    },
    withCredentials: true, // default: false , false 인 경우, sessionid 를 매번 신규로 발급
});

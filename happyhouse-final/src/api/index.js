import axios from "axios";

// axios 객체 생성
function apiInstance() {
    const instance = axios.create({
        baseURL: "http://localhost:8080/",
        headers: {
            "Content-type": "application/json",
        },
    });
    return instance;
}

function houseInstance() {
    const instance = axios.create({
        baseURL: "http://localhost:8080/",
        headers: {
            "Content-type": "application/json",
        },
    });
    return instance;
}

export { apiInstance, houseInstance };

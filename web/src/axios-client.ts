import axios from "axios";

// initial axios client
const axiosClient = axios.create({
    baseURL: "http://localhost:8081/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default axiosClient;

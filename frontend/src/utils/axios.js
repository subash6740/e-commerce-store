import axios from "axios";

const BASE_URL = "http://localhost:3008/"

const API = axios.create({ baseURL: BASE_URL, withCredentials: true });

export default API;
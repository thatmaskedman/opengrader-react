import axios from "axios";

const httpService = axios.create({
    baseURL: `/api`
});

export default httpService
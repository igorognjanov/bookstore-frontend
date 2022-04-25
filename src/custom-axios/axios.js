import axios from "axios";

const instance = axios.create({
    baseURL: 'https://warm-ridge-02857.herokuapp.com:80/api',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

export default instance;

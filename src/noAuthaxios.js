import axios from 'axios';

const instance = axios.create({
    baseURL: "https://floating-brook-76207.herokuapp.com"
    // baseURL: "https://nodejs-saivc.run-ap-south1.goorm.io"
});

export default instance;
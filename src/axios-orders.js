import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rent-car-profile-default-rtdb.firebaseio.com/'
});

export default instance;
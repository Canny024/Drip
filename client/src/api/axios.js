import axios from 'axios';

export default axios.create({
    baseURL: 'https://dripapp-main.azurewebsites.net'
});
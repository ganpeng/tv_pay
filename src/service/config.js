import axios from 'axios';

let service = axios.create({
    headers: {
        'Accept': 'application/json',
        'x-tianchi-client': '{"role":"ADVISER","version":"v1.1.1","deviceId":"1234fads"}'
    }
});

service.defaults.baseURL = `${process.env.VUE_APP_API_ROOT}/api`;

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use((response) => {
    response.data.config = response.config;
    if (response.data.code === 0) {
        return response.data;
    }
    return response.data;
}, (err) => {
    return {config: err.config};
});

export default service;

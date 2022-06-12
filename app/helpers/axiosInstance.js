import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import envs from "../config/env"

const headers = {
    
}

const axiosInstance = axios.create({
    baseURL: envs?.BACKEND_URL,
    headers
})
axiosInstance.interceptors.request.use(async (config) => {
        try {
            const token = await AsyncStorage.getItem('@token');
            
        if (token) {
            config.headers.Authorization=`Bearer ${token}`
        }
        return config;

    } catch (e) {
        // saving error
        
      }
 
    
}, (error) => {
    return Promise.reject(error)
})

export default axiosInstance
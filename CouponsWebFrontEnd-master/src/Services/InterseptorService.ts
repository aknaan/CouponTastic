import axios from "axios";
import { authStore } from "../Redux/AuthState";

export function createInterseptor(){
    axios.interceptors.request.use( config =>{
        if(authStore.getState().token){
            config.headers.Authorization ="Bearer " + authStore.getState().token; 
        }
        return config;
    })
}
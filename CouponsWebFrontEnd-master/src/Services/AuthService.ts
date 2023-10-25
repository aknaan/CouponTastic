import { CredentialsModel } from "../Models/CredentialsModel";
import axios from "axios";
import appConfig from "../Util/AppConfig";
import { authStore, loginAction, logoutAction, registerAction } from "../Redux/AuthState";
import UserModel from "../Models/UserModel";
import CustomerModel from "../Models/CustomerModel";

class AuthService{

    public async login(credentials : CredentialsModel){
        const response = await axios.post<string>(appConfig.authUrl + "login", credentials);
        const token = response.data;
        authStore.dispatch(loginAction(token));
    }

    public async register(customer : CustomerModel){
        const response = await axios.post<string>(appConfig.authUrl + "register", customer);
        const token = response.data;
        authStore.dispatch(registerAction(token));  //save the token from the server to the AuthStore
   
       }

    public async logout(){
        authStore.dispatch(logoutAction());
    }
}

const authService = new AuthService();
export default authService;
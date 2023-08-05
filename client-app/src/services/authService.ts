import axios from "axios";
import { Endpoints } from "../constants/Endpoints";
import { LoginUser } from "../app/models/authentication/LoginUser";

class AuthService {
    
    async login(user : LoginUser) {
      const response = await axios.post(Endpoints.Auth + "/login", user);
      if (response.status == 200){
        localStorage.setItem("bearerToken", JSON.stringify(response.data));
      }
    }
  
    logout() {
      localStorage.removeItem("bearerToken");
      window.location.reload();
    }
  
    async register(user : LoginUser) {
      const response = await axios.post(Endpoints.Auth + "/register", user);
      // Accepted response
      if (response.status == 202){
        await this.login(user);
      }
    }
  
    getCurrentUser() {
      const userStr = localStorage.getItem("bearerToken");
      return userStr != null ? JSON.parse(userStr) : null;
    }
  }
  
  export default new AuthService();
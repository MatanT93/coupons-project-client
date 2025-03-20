import axios from "axios";
import { User } from "../Models/User";

class AuthService{
    async login(user: User) {
        return (await axios.post<string>("http://localhost:8080/users/login", user)).data;
    }

    async logout() {
        return (await axios.get<string>("http://localhost:8080/users/logout"));
    }
}

const authService = new AuthService();
export default authService;
import { jwtDecode } from "jwt-decode";
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState{
    username: string;
    role: string;
    name: string;
    iat: number;
    token: string;
}

interface JwtUser{
    username: string;
    role: string;
    name: string;
    iat: number;
    iss: string;
}


const initState = {
    username: localStorage.my_token ? jwtDecode<JwtUser>(localStorage.my_token).username : "",
    role: localStorage.my_token ? jwtDecode<JwtUser>(localStorage.my_token).role : "",
    name: localStorage.my_token ? jwtDecode<JwtUser>(localStorage.my_token).name : "",
    iat: localStorage.my_token ? jwtDecode<JwtUser>(localStorage.my_token).iat : 0,
    token: ""
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: initState,
    reducers:{
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            const decodedToken: JwtUser = jwtDecode<JwtUser>(localStorage.my_token);
            state.username = decodedToken.username;
            state.role = decodedToken.role;
            state.name = decodedToken.name;
            state.iat = decodedToken.iat;
        },
        logout: (state: AuthState) => {
            state.token = "";
            state.username = "";
            state.role = "";
            state.name = "";
            state.iat = 0;
            localStorage.removeItem("my_token");
        }
    }
});

export const {login, logout} = authSlice.actions;
export const authStore = configureStore({
    reducer: authSlice.reducer
});
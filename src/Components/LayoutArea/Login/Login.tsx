import { useNavigate } from "react-router-dom";
import "./Login.css";
import { authStore, login } from "../../../Redux/AuthStore";
import authService from "../../../Services/AuthService";
import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { useState } from "react";
import { User } from "../../../Models/User";

interface JwtUser{
    username: string;
    stam: string;
    iat: number;
    iss: string;
}

export function Login(): JSX.Element {
    const navigate = useNavigate();
    const [type, setType] = useState('');
    let username = "";
    let password = "";
    let user: User = new User("","","");
    //let logged: boolean = false;

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    function handleUsername(event: React.ChangeEvent<HTMLInputElement>) {
        user.email = event.currentTarget.value;
        username = event.currentTarget.value;
    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
        user.password = event.currentTarget.value;
        password = event.currentTarget.value;
    }

    function submitLogin(event: React.FormEvent) {
        event.preventDefault(); // DO NOT RUN ORIGINAL FORM SUBMIT CODE!
        user.clientType = type;
        authService.login(user)
            .then(res=> {
                //localStorage.setItem("my_token",res);
                localStorage.my_token = res;
                authStore.dispatch(login(res));
                alert("Login Succefull");
                switch(type) {
                    case "Admin": return navigate("/admin");
                    case "Company": return navigate("/company"); 
                    case "Customer": return navigate("/customer"); 
                }
            })
            .catch(err=> {
                alert("ERROR! " + err.response.data);
                navigate("/");
            }
            );
        const formElement = event.target as HTMLFormElement;
        if (formElement && typeof formElement.reset === 'function') {
            formElement.reset();
        }
    }

    return (
        <Card className="LoginCard" sx={{ minWidth: 120 }} component="form" onSubmit={submitLogin} >
            <title>Login</title>
            <h2>Please Login</h2>
            <FormControl fullWidth>
                <InputLabel id="clientTypeLabel">User Type</InputLabel>
                <Select labelId = "clientTypeLabel" id="clientType" value={type} required label="User Type" onChange={handleChange} fullWidth>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"Company"}>Company</MenuItem>
                    <MenuItem value={"Customer"}>Customer</MenuItem>   
                </Select><br/>
                <TextField label="Username" type="email" autoComplete="true" required onChange={handleUsername} /><br/>
                <TextField label="Password" type="password" required onChange={handlePassword}/><br/>
                <Button type="submit" variant="contained">Login</Button>
            </FormControl>
        </Card>
    );
}
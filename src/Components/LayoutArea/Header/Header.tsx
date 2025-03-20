import { AppBar, Box, Button, CssBaseline, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Header.css";
import { authStore, logout } from "../../../Redux/AuthStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import authService from "../../../Services/AuthService";

export function Header(): JSX.Element {

    const [username, setUsername] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    function handleClick(event: React.MouseEvent<HTMLElement>) {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    function nav(url: string){
        navigate(url);
        handleClose();
    }
    useEffect(()=>{
        //authStore.dispatch(logout());
        setUsername(authStore.getState().role === "Admin" ? "Admin" : authStore.getState().name);
        setToken(authStore.getState().token);
        authStore.subscribe(()=>{
            setUsername(authStore.getState().role === "Admin" ? "Admin" : authStore.getState().name);
            setToken(authStore.getState().token);
        })
    }, [])

    return (
        <div className="Header">
			<Box sx={{ flexGrow: 1, display: "flex" }}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={handleClick}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Welcome {token === "" ? "" : username} 
                        </Typography>
                        <Paper sx={{ width: 320, maxWidth: '100%' }}>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={()=>nav("/" + token !== "" ? authStore.getState().role : "")}>
                                    <ListItemIcon>
                                        <HomeIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Home</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={()=>nav("/about")}>
                                    <ListItemIcon>
                                        <StoreIcon/>
                                    </ListItemIcon>
                                    <ListItemText>About</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Paper>
                        {
                            token !== "" ? 
                            <span className="user">
                                <Button onClick={()=>{
                                    authStore.dispatch(logout());
                                    authService.logout();
                                    navigate("/");}} 
                                    sx={{color: "inherit"}}><LogoutIcon/>Logout</Button>
                            </span> : <span/>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
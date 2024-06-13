import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import LoginRedirect from "./Oauth2"
import { signout } from "./service/ApiService";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Copyright() {
    return (
        <Typography variant="body2" color= "textSecondary" align = "center">
            {"Copyright ©"}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function Logout() {
    React.useEffect(() => {
        signout();
    }, []);
    
    return <Navigate to="/login" />;
}

class AppRouter extends React.Component {
    render(){
        return (
            <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<SignUp />}/>
                    <Route path="/" element={<App/>}/>
                    <Route path="/login/redirect" element={<LoginRedirect />}/>
                    <Route path="/logout" element={<Logout />}/>
                </Routes>
            </div>
            <div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
            </div>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
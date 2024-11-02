import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () =>{
    const token = localStorage.getItem("isAuthenticated");
    // let auth = {"token": token}
    return(
        // auth.token ? <Outlet/> : <Navigate to="/login"/>
        token ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute;


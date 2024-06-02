import { Outlet, Navigate } from "react-router-dom";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Login from "../pages/Login";

const ProtectedRoutesComponent = () => {
    const [isAuth, setIsAuth] = useState();

    useEffect(() => {
        axios.get("/api/get-token").then(function (data) {
            console.log("Protected Route Component")
            if (data.data.token) {
                setIsAuth(data.data.token);
            }
            return isAuth;
        }).catch((er) => { setIsAuth("") })
    }, [isAuth])

    if (isAuth === "") {
        console.log("Protected Route Component")
        return <Login />
    };
    if (isAuth === undefined) {
        console.log("Protected Route Component")

        return
    };

    return isAuth ? (
        <>
        {console.log("Hi")}
            <Outlet />
        </>
    ) :
    <Navigate to="/login" />

};

export default ProtectedRoutesComponent;

import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const Private = () => {
    const { store, actions } = useContext(Context);
    const [response, setResponse] = useState({});
    const getCredencial = async () => {
        const response = await fetch(
            "http://127.0.0.1:5000/private",
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${store.logged_User.token}`,
                },

            }
        );
        const body = await response.json();
        setResponse(body)
    }
    useEffect(() => {
        getCredencial();
    }, []);
    return (
        <>
            <div>
                <h2>Su email es</h2>
                <p>{response.email}</p>
                <h2>Su contraseña es</h2>
                <p>{response.password}</p>
            </div>
        </>
    )
};
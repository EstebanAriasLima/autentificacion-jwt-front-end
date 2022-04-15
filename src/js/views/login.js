import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

import "../../styles/demo.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const history=useHistory();

	return (
		<div className="container">
			<h1>Inicia sesion</h1>
			<h2>Correo electronico</h2>
			<input name="email"
				onChange={actions.handleInputChange}></input>
			<h2>Contraseña</h2>
			<input name="password"
				type="password"
				onChange={actions.handleInputChange}></input>
			<input style={{ "width": "500px" }} className="my-3 btn btn-primary"
				type="button" value="Iniciar sesión"
				onClick={async (e) => {
					let respuesta = await actions.login();
					if (respuesta) {
						history.push("/")
					}
				}}></input>
		</div>
	);
};
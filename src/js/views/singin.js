import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Singin = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1>Registrate</h1>
			<h2>Correo electronico</h2>
			<input
				placeholder=""
				type="text"
				onChange={actions.handleInputChange}
				name="email"></input>
			<h2>Contraseña</h2>
			<input
				placeholder=""
				type="password"
				onChange={actions.handleInputChange}
				name="password"></input>
			<h2>Confirmar contraseña</h2>
			<input
				placeholder=""
				type="password"
				onChange={actions.handleInputChangePasswordConfirm}
				name="password_confirm"></input>
			<input style={{ "width": "500px" }} className="my-3 btn btn-primary"
				type="button"
				value="Registrarme"
				resource="/sign-in-traveler"
				name="travelers"
				onClick={(e) => {
					actions.handleSubmit(e, "/sign-in")
				}
				}
			></input>
			{store.passRegister ?
				<Redirect to={"/login"} />
				:
				""
			}
		</div>
	);
};

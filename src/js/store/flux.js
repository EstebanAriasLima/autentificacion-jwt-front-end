const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			values: {
				email: "",
				password: ""
			},
			baseUrl: "http://127.0.0.1:5000",
			password_confirm: "",

		},
		actions: {
			//para recibir entradas de inputs de registro
			handleInputChange: (e) => {
				setStore({
					values: {
						...getStore().values, [e.target.name]: e.target.value
					}
				})
			},
			handleInputChangePasswordConfirm: (e) => {
				setStore({
					password_confirm: {
						...getStore().password_confirm, [e.target.name]: e.target.value
					}
				})
			},
			handleSubmit: (e, resource) => {
				//e.preventDefault()
				const actions = getActions()
				console.log(getStore().values)
				if (actions.validationsSubmit(e) == false) {
					return false
				}
				actions.Signin(resource)
			},
			validationsSubmit: (e) => {
				let isValid = true
				if (e.target.name == "companies") {
					if (getStore().values.company_name == "") {
						alert("necesita nombre de la compañía")
						isValid = false
					}
				}
				if (e.target.name == "travelers") {
					if (getStore().values.nickname == "") {
						alert("necesita un apodo")
						isValid = false
					}
				}
				if (getStore().values.phone_number == "") {
					alert("necesita número de teléfono")
					isValid = false
				}
				if (getStore().values.email == "") {
					alert("necesita un email")
					isValid = false
				}
				if (getStore().values.password == "") {
					alert("necesita un password")
					isValid = false
				}
				if (getStore().values.password_confirm == "") {
					alert("necesita confirmar contraseña")
					isValid = false
				}
				if (getStore().password_confirm.password_confirm !== getStore().values.password) {
					alert("Las contraseñas no coinciden")
					isValid = false
				}
				return isValid
			},
			Signin: async () => {
				let requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(getStore().values)
				}
				const response = await fetch(
					`${getStore().baseUrl}/sign-in`, requestOptions)
				if (response.status == 201) {
					alert("Registro completado")
					setStore({ passRegister: true })
				}
				if (response.status == 400) {
					const mensaje = await response.json()
					alert(mensaje.msg)
				}
			},
			login: async () => {
				const resp = await fetch(`${getStore().baseUrl}/token`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: getStore().values.email, password: getStore().values.password })
				})
				console.log({ email: getStore().values.email, password: getStore().values.password })
				if (!resp.ok) {
					alert("Hay un problema con la solicitud")
					return undefined
				}
				if (resp.status === 401) {
					alert("Credencia invalida")
					return undefined
				}
				else if (resp.status === 400) {
					alert("Correo o clave enviado")
					return undefined
				}
				const data = await resp.json()
				// save your token in the localStorage
				//also you should set your user into the store using the setStore function
				localStorage.setItem("jwt-token", data.token)
				localStorage.setItem("user_id", data.user_id)
				setStore({ logged_User: { ...getStore().logged_User, user_id: data.user_id } })
				setStore({ logged_User: { ...getStore().logged_User, token: data.token } })
				return data
			},
			removeUser: (e) => {
				localStorage.removeItem('jwt-token')
				setStore({ logged_User: { ...getStore().logged_User, user_id: "" } })
				setStore({ logged_User: { ...getStore().logged_User, token: "" } })
			},
			isAuthenticated:()=>{
				if(localStorage.getItem('jwt-token')){
					return true;
				}
				return false
			}
			// getPrivateData: (e) => {
			// 	// retrieve token form localStorage
			// 	const token = localStorage.getItem('jwt-token');
			// 	const resp = await fetch(`${baseUrl}/private`, {
			// 		method: 'GET',
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 			'Authorization': 'Bearer ' + token
			// 		}
			// 	})
			// 	if (!resp.ok) throw Error("There was a problem in the login request")
			// 	else if (resp.status === 403) {
			// 		throw Error("Missing or invalid token");
			// 	}
			// 	else {
			// 	const data = await resp.json();
			// 	console.log("This is the data you requested", data);
			// 	return data
			// 	}
			// }
		}
	}
}

export default getState;

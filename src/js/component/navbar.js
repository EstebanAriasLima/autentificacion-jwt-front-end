import React,{useContext} from "react";
import { Link,useHistory } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const history=useHistory();
	let token=actions.isAuthenticated()
	return (
		<nav className="navbar navbar-light bg-light mb-0">
			<div className="d-flex mx-5" style={{ "width": "100vw" }}>

				<Link to="/">
					<h2 className="text-navbar px-2">React boilerplate</h2>
	
				</Link>

				{token == false ?
					<>
						<div className="px-2">
							<Link to={"/singin"}>
								<button className="text-navbar btn btn-primary">
									Registrarme
								</button>
								</Link>
						</div>
						<div className="px-2">
							<div className="nav-item px-2">
								<Link to="/login">
									<button className="text-navbar btn btn-primary px-2">Iniciar sesión</button>
								</Link>
							</div>
						</div>
					</>
					:
					<>
						<div className="px-2">
							<div className="nav-item px-2">
							<button type="button" className="btn btn-light btn btn-primary"
							onClick={(e)=>{actions.removeUser()
								let token=actions.isAuthenticated()
								history.push("/")
							}}
							>Cerrar sesión</button>
							</div>
							<div className="nav-item px-2">
								<Link to="/private">
									<button className="text-navbar btn btn-primary px-2">Ver credencales</button>
								</Link>
							</div>
						</div>
					</>
				}
			</div>
		</nav>
	);
};

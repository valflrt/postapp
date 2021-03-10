import { Route, Switch, Link, Redirect, useLocation } from "react-router-dom";

import "./index.css";
import "./bottombar.css";
import "./app.css";

import { FiHome, FiBell, FiUser, FiMenu } from "react-icons/fi"

import Home from "../components/Home";
import User from "../components/User";

function App() {

	const location = useLocation();

	const activeLink = (pathname) => (location.pathname === pathname && " active");

	//localStorage.setItem("userId", "603fcfdaca7fa518fc24947b");

	return (
		<div id="app">

			{!localStorage.userId && <Redirect to={"/login"} />}

			<Switch>
				<Route path={"/"} exact component={Home} />

				<Route path={"/post/:id"} render={() => <div>post</div>} />
				<Route path={"/user/:id"} component={User} />
				<Route path={"/notifications"} render={() => (
					<div id={"main"}>
						<p className={"title"}>Here are your notifications</p>
					</div>
				)} />

				<Route path={"/create"} render={() => <div>hey</div>} />

				<Route path={"/login"} render={() => <div>login</div>} />

				<Route render={() => <p>404: page not found</p>} />
			</Switch>

			<div className="bottombar">
				<span className={"container"}>
					<FiMenu onClick={() => console.log("menuuuu !")} className={"link menu-button"} />
					<Link to={`/user/${localStorage.getItem("userId")}`} className={"link" + activeLink(`/user/${localStorage.getItem("userId")}`)}>
						<FiUser />
					</Link>
					<Link to={"/"} className={"link" + activeLink("/")}>
						<FiHome />
					</Link>
					<Link to={"/notifications"} className={"link" + activeLink("/notifications")}>
						<FiBell />
					</Link>
				</span>
			</div>

		</div>
	);
};

export default App;
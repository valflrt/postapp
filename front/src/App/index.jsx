import { Route, Switch, Link, useLocation } from "react-router-dom";

import "./index.css";
import "./bottombar.css";
import "./app.css";

import { FiHome, FiBell, FiUser } from "react-icons/fi"

import Home from "../Home";
import UserCard from "../UserCard";

function App() {

	const location = useLocation();

	const focusLink = (pathname) => (location.pathname === pathname && " focus");

	localStorage.setItem("userId", "603fcfdaca7fa518fc24947b");

	return (
		<div id="app">

			<div id="main">
				<Switch>
					<Route path={"/"} exact component={Home} />

					<Route path={"/post/:id"} render={() => <div>post</div>} />
					<Route path={"/user/:id"} component={UserCard} />
					<Route path={"/notifications"} render={() => <div>Here are your notifications</div>} />

					<Route path={"/create"} render={() => <div>hey</div>} />

					<Route path={"/login"} render={() => <div>login</div>} />

					<Route render={() => <p>404: page not found</p>} />
				</Switch>
			</div>

			<div className="bottombar">
				{/*<div className="title">
					<p>postApp</p>
				</div>*/}
				<span className={"container"}>
					<Link to={`/user/${localStorage.getItem("userId")}`} className={"link" + focusLink(`/user/${localStorage.getItem("userId")}`)}>
						<FiUser />
					</Link>
					<Link to={"/"} className={"link" + focusLink("/")}>
						<FiHome />
					</Link>
					<Link to={"/notifications"} className={"link" + focusLink("/notifications")}>
						<FiBell />
					</Link>
				</span>
			</div>

		</div >
	);
};

export default App;
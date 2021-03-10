import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import "./index.css";
import "./topbar.css";
import "./bottombar.css";
import "./main.css";

import Home from "../Home";
import User from "../User";
import Button from "../fragments/Button";

const App = () => (
	<Router>
		<div id="app">

			<div className="topbar">
				<Link to={"/"} className="Link">
					<div className="title">
						<p>postApp</p>
					</div>
				</Link>
			</div>

			<div id="main">
				<Switch>
					<Route path={"/"} exact component={Home} />

					<Route path={"/post/:id"} render={() => <div>post</div>} />
					<Route path={"/user/:id"} component={User} />

					<Route path={"/create"} render={() => <div>hey</div>} />
					<Route path={"/login"} render={() => <div>login</div>} />

					<Route render={() => <p>404: page not found</p>} />
				</Switch>
			</div>

			<div className="bottombar">
				<span className={"container"}>
					<Link to={"/"} className={"Link"}>H</Link>
					<Link to={"/"} className={"Link"}>H</Link>
					<Link to={"/"} className={"Link"}>H</Link>
				</span>
				{/* 				<span>
					<Link to={"/create"} className="Link">
						<Button value="new post" />
					</Link>
					<Link to={"/login"} className="Link">
						<Button value="login" />
					</Link>
				</span> */}
			</div>

		</div>
	</Router>
);

export default App;
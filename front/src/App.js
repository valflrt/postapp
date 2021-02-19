import { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "./App.css";

import Home from "./Home";
import Button from "./fragments/Button";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: "home"
		};
	};

	render() {

		return (
			<Router>
				<div id="app">

					<div className="topbar">
						<Link to={"/"} className="non-formated-text">
							<div id="title">
								<p>postApp</p>
							</div>
						</Link>
						<span>
							<Link to={"/create"} className="non-formated-text">
								<Button value="new post" />
							</Link>
							<Link to={"/login"} className="non-formated-text">
								<Button value="login" />
							</Link>
						</span>
					</div>

					<div className="main">
						<Switch>
							<Route path={"/"} exact component={Home} />
							<Route path={"/create"} render={() => <div>hey</div>} />
							<Route path={"/login"} render={() => <div>login</div>} />
							<Route render={() => <p>404: page not found</p>} />
						</Switch>
					</div >

				</div>
			</Router>
		);
	};
};

export default App;
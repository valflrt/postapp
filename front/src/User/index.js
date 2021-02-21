import { Component } from "react";

import Loader from "../fragments/Loader";
import Button from "../fragments/Button";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: null,
			loadState: {
				loaded: false,
				error: false
			}
		};
	};

	componentDidMount() {
		this.load()
			.then((res) => this.setState({ user: res, loadState: { loaded: true } }))
			.catch((err) => {
				this.setState({ posts: null, loadState: { loaded: false, error: true } });
				console.log(err);
			});
	};

	render() {

		return (
			<>
				{
					this.state.loadState.loaded === false ?
						(this.state.loadState.error === false ? <Loader /> : <Loader error />)
						: (
							<>
								<Button value={"back"} action={() => { this.back() }} />
								<p>username: {this.state.user.username}</p>
								<p>id: {this.state.user.id}</p>
							</>
						)
				}
			</>
		);
	};

	load() {

		return new Promise((resolve, reject) => {

			let { id } = this.props.match.params;

			fetch(`http://127.0.0.1:8080/users/getonebyid/${id}`)
				.then(res => res.json())
				.then(res => resolve(res))
				.catch(err => reject(err));
			fetch(`http://192.168.1.107:8080/users/getonebyid/${id}`)
				.then(res => res.json())
				.then(res => resolve(res))
				.catch(err => reject(err));

		});

	};

	reload() {
		this.setState({ loadState: { loaded: false, error: false } });
		this.load();
	};

	back() {
		this.props.history.goBack();
	};

};

export default Home;
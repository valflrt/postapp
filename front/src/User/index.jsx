import { Component } from "react";

import "./index.css";

import Loader from "../fragments/Loader";
import Button from "../fragments/Button";
import Post from "../fragments/Post";

const map = (map, callback) => {
	let array;

	map.forEach((value, key) => {
		array.push({
			value: value,
			key: key
		});
	});

	return array;
};

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			loadState: {
				loaded: false,
				error: false
			}
		};
	};

	componentDidMount() {
		this.getUser()
			.then((res) => this.setState({ user: res, loadState: { loaded: true } }))
			.catch((err) => {
				this.setState({ user: null, loadState: { loaded: false, error: true } });
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
								<Button value={"back"} action={() => { this.back() }} className={"inpage-button"} />
								<div className={"profile"}>
									<p className={"username"}>@{this.state.user.username}</p>
									{this.state.user.bio && <p className={"bio"}>{this.state.user.bio}</p>}
								</div>
								{
									this.state.user.loaded === false ?
										(this.state.user.error === false ? <Loader /> : <Loader error />)
										: this.state.user.posts.map(post => (
											<Post post={post} key={post._id} />
										))
								}
							</>
						)
				}
			</>
		);
	};

	getUser() {

		return new Promise((resolve, reject) => {

			let { id } = this.props.match.params;

			try {

				fetch(`http://127.0.0.1:8080/users/one/${id}/get`)
					.then(res => res.json())
					.then(res => resolve(res))
					.catch(err => {
						fetch(`http://192.168.1.107:8080/users/one/${id}/get`)
							.then(res => res.json())
							.then(res => resolve(res))
							.catch(err2 => reject(err, err2));
					});

			} catch (err) {
				reject(err);
			};

		});

	};

	reload() {
		this.setState({ user: { loaded: false, error: false } });
		this.load();
	};

	back() {
		this.props.history.goBack();
	};

};

export default Home;
import { Component } from "react";

import "./index.css";

import Loader from "../../fragments/Loader";
import PostWrapper from "../../fragments/PostWrapper";

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				data: null,
				loaded: false,
				error: false
			},
			posts: {
				data: null,
				loaded: false,
				error: false
			}
		};
	};

	componentDidMount() {
		this.getUser()
			.then((res) => this.setState({ user: { data: res, loaded: true } }))
			.catch((err) => {
				this.setState({ user: { data: false, loaded: false, error: true } });
				console.log(err);
			});

		this.getPosts()
			.then((res) => this.setState({ posts: { data: res, loaded: true } }))
			.catch((err) => {
				this.setState({ posts: { data: false, loaded: false, error: true } });
				console.log(err);
			});
	};

	render() {

		return (
			<div id={"main"}>

				{this.state.user.loaded === false ?
					(this.state.user.error === false ? <Loader /> : <Loader error />)
					: (
						<div className={"profile"}>
							<p className={"username"}>@{this.state.user.data.username}</p>
							{this.state.user.data.bio && <p className={"bio"}>{this.state.user.data.bio}</p>}
							<p className={"text-bottom"}>Here are her/his posts:</p>
						</div>
					)}

				{<PostWrapper posts={this.state.posts} />}

			</div>
		);
	};

	getUser() {

		return new Promise((resolve, reject) => {

			let { id } = this.props.match.params;

			try {

				fetch(`http://${window.location.hostname}:8080/users/one/get/${id}`)
					.then(res => res.json())
					.then(res => resolve(res))
					.catch(err => {
						reject(err)
					});

			} catch (err) {
				reject(err);
			};

		});

	};

	getPosts() {

		return new Promise((resolve, reject) => {

			let { id } = this.props.match.params;

			try {

				fetch(`http://${window.location.hostname}:8080/posts/complex/get/id/${id}`)
					.then(res => res.json())
					.then(res => resolve(res))
					.catch(err => {
						reject(err);
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

};

export default User;
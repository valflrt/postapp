import { Component } from "react";

import "./index.css";

import Loader from "../fragments/Loader";
import Button from "../fragments/Button";
import Post from "../fragments/Post";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: null,
			user: {
				loaded: false,
				error: false
			}
		};
	};

	componentDidMount() {
		this.getUser()
			.then((res) => this.setState({ user: { loaded: true, data: res } }))
			.catch((err) => {
				this.setState({ user: { loaded: false, error: true, data: null } });
				console.log(err);
			});
	};

	render() {

		return (
			<>
				{
					this.state.user.loaded === false ?
						(this.state.user.error === false ? <Loader /> : <Loader error />)
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
										: this.state.posts?.map(post => (
											<Post props={post} key={post._id} />
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
				fetch(`http://127.0.0.1:8080/users/getonebyid/${id}`)
					.then(res => res.json())
					.then(res => resolve(res));
				fetch(`http://192.168.1.107:8080/users/getonebyid/${id}`)
					.then(res => res.json())
					.then(res => resolve(res));
			} catch (err) {
				reject(err);
			};

		});

	};

	getPosts() {

		return new Promise((resolve, reject) => {

			try {
				this.user.posts?.forEach(post => {
					fetch(`http://127.0.0.1:8080/posts/getonebyid/${post}`)
						.then(res => res.json())
						.then(res => resolve(res));
					fetch(`http://192.168.1.107:8080/posts/getonebyid/${post}`)
						.then(res => res.json())
						.then(res => resolve(res));
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
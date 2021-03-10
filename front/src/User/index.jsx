import { Component } from "react";

import "./index.css";

import Loader from "../fragments/Loader";
import Button from "../fragments/Button";
import Post from "../fragments/Post";

class Home extends Component {
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
				this.setState({ user: { data: null, loaded: false, error: true } });
				console.log(err);
			});

		this.getPosts()
			.then((res) => this.setState({ posts: { data: res, loaded: true } }))
			.catch((err) => {
				this.setState({ posts: { data: null, loaded: false, error: true } });
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
								<Button value={"back"} action={() => { this.back() }} className={"self-align-end"} />
								<div className={"profile"}>
									<p className={"username"}>@{this.state.user.data.username}</p>
									{this.state.user.data.bio && <p className={"bio"}>{this.state.user.data.bio}</p>}
									<p className={"text-bottom"}>Posts:</p>
								</div>
								{this.state.posts.loaded === false ?
									(this.state.posts.error === false ? <Loader /> : <Loader error />)
									: (this.state.posts.data.length !== 0) ?
										(this.state.posts.data.map(post => (
											<Post post={post} key={post._id} author={false} />
										))) :
										<p className={"info self-align-center self-justify-center"}>How empty O-O</p>
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

				fetch(`http://127.0.0.1:8080/users/one/get/${id}`)
					.then(res => res.json())
					.then(res => resolve(res))
					.catch(err => {
						fetch(`http://192.168.1.107:8080/users/one/get/${id}`)
							.then(res => res.json())
							.then(res => resolve(res))
							.catch(err2 => reject(err, err2));
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

				fetch(`http://127.0.0.1:8080/posts/complex/get/id/${id}`)
					.then(res => res.json())
					.then(res => resolve(res))
					.catch(err => {
						fetch(`http://192.168.1.107:8080/users/complex/get/id/${id}`)
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
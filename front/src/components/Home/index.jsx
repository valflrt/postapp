import { Component } from "react";

import PostWrapper from "../../fragments/PostWrapper";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: {
				data: null,
				loaded: false,
				error: false
			}
		};
	};

	componentDidMount() {
		this.load()
			.then((res) => this.setState({ posts: { data: res, loaded: true } }))
			.catch((err) => {
				this.setState({ posts: { data: false, loaded: false, error: true } });
				console.log(err);
			});
	};

	render() {
		return (
			<div id={"main"}>
				<p className={"title"} onClick={() => this.reload()}>Here are the most recent posts</p>
				{<PostWrapper posts={this.state.posts} />}
			</div>
		);
	};

	load() {

		return new Promise((resolve, reject) => {

			fetch(`http://${window.location.hostname}:8080/posts/all/get`)
				.then(res => res.json())
				.then(res => resolve(res))
				.catch(err => {
					reject(err);
				});

		});

	};

	reload() {
		this.setState({ posts: { loaded: false, error: false } });
		this.load()
			.then((res) => this.setState({ posts: { data: res, loaded: true } }))
			.catch((err) => {
				this.setState({ posts: { data: false, loaded: false, error: true } });
				console.log(err);
			});
	};

};

export default Home;
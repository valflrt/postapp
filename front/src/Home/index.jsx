import { Component } from "react";

import Post from "../fragments/Post"
import Loader from "../fragments/Loader";

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
			.then((res) => this.setState({ posts: res, loadState: { loaded: true } }))
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
						: this.state.posts?.map(post => <Post post={post} key={post._id} />)
				}
			</>
		);
	};

	load() {

		return new Promise((resolve, reject) => {

			fetch("http://127.0.0.1:8080/posts/all/get")
				.then(res => res.json())
				.then(res => resolve(res))
				.catch(err1 => {
					fetch("http://192.168.1.107:8080/posts/all/get")
						.then(res => res.json())
						.then(res => resolve(res))
						.catch(err2 => reject(err2));
				});

		});

	};

	reload() {
		this.setState({ loadState: { loaded: false, error: false } });
		this.load();
	};

};

export default Home;
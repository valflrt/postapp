import { Component } from "react";

import Post from "../fragments/Post"
import Loader from "../fragments/Loader";
//import Button from "./Button";

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

		const postsRendering = () => {
			if (this.state.loadState.loaded === false) {
				return (this.state.loadState.error === false) ? <Loader /> : <Loader error />;
			} else {
				return this.state.posts?.map(post => (<Post props={post} key={post._id} />));
			};
		};

		return (
			<>
				{/* <Button id="reloadButton" value="reload" onClick={() => this.reload()} /> */}
				{postsRendering()}
			</>

		);
	};

	load() {

		return new Promise((resolve, reject) => {

			fetch("http://127.0.0.1:8080/posts/getall")
				.then(res => res.json())
				.then(res => resolve(res))
				.catch(err => reject(err));
			fetch("http://192.168.1.107:8080/posts/getall")
				.then(res => res.json())
				.then(res => resolve(res))
				.catch(err => reject(err));

		});

	};

	reload() {
		this.setState({ loadState: { loaded: false, error: false } });
		this.load();
	};

};

export default Home;
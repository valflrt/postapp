import "./index.css";
import { Component } from "react";

import { Link } from "react-router-dom";
import Image from "../Image";

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			galleryMode: false,
			loadState: {
				loaded: false,
				error: false
			}
		};
	};

	componentDidMount() {
		this.getUser()
			.then(user => this.setState({ user: user, loadState: { loaded: true } }))
			.catch(() => this.setState({ user: null, loadState: { loaded: false, error: true } }))
	};

	render() {

		let post = this.props.post;

		return (
			<div id={"main"}>
				{
					this.state.loadState.loaded === true && (
						<div className="post">
							{post.image === true ? (
								<Image action={() => this.setState({ galleryMode: true })} src={`http://${window.location.hostname}:8080/storage/${post._id}.png`} alt={post._id} />
							) : null}
							<div className="wrapper">
								<div className="main-text">
									{post.text}
								</div>
								<div className="action-bar">
									{(this.props.author !== false) ? (
										<Link to={`/user/${post.authorId}`} className="link">
											@{this.state.user.username}
										</Link>
									) : (<>@{this.state.user.username}</>)}
								</div>
							</div>
							{(this.state.galleryMode === true) && (
								<div className="imageContainer" onClick={() => this.setState({ galleryMode: false })}>
									<Image src={`http://${window.location.hostname}:8080/storage/${post._id}.png`} alt={post._id} />
								</div>
							)}
						</div>
					)
				}
			</div>
		);
	};

	getUser() {

		return new Promise((resolve, reject) => {

			fetch(`http://${window.location.hostname}:8080/users/one/get/${this.props.post.authorId}`)
				.then(res => res.json())
				.then(res => resolve(res))
				.catch(err => {
					reject(err);
				});

		});

	};
};

export default Post;
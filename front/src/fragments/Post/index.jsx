import "./index.css";
import { Component } from "react";

import { Link } from "react-router-dom";
import Image from "../Image";
import Loader from "../Loader";

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
			.catch(err => this.setState({ user: null, loadState: { loaded: false, error: true } }))
	}

	render() {

		let props = this.props.post;

		return (
			<>
				{
					this.state.loadState.loaded === false ?
						(this.state.loadState.error === false ? (
							<div className="post loading">
								<div className="wrapper">
									<Loader />
								</div>
							</div>
						) : (
							<div className="post">
								<div className="wrapper">
									<Loader error />
								</div>
							</div>
						)) : (
							<div className="post">
								{props.image === true ? (
									<Image action={() => this.setState({ galleryMode: true })} src={`http://127.0.0.1:8080/storage/${props._id}.png`} alt={props._id} />
								) : null}
								<div className="wrapper">
									<div className="main-text">
										{props.text}
									</div>
									<div className="action-bar">
										<Link to={`/user/${this.state.user.id}`} className="Link">
											@{this.state.user.username}
										</Link>
									</div>
								</div>
								{(this.state.galleryMode === true) && (
									<div className="imageContainer" onClick={() => this.setState({ galleryMode: false })}>
										<Image src={`http://127.0.0.1:8080/storage/${props._id}.png`} alt={props._id} />
									</div>
								)}
							</div>
						)
				}
			</>
		);
	};

	getUser() {

		return new Promise((resolve, reject) => {

			fetch(`http://127.0.0.1:8080/users/one/${this.props.post.authorId}/get`)
				.then(res => res.json())
				.then(res => resolve(res))
				.catch(err1 => {
					fetch(`http://192.168.1.107:8080/users/one/${this.props.post.authorId}/get`)
						.then(res => res.json())
						.then(res => resolve(res))
						.catch(err2 => reject(err2));
				});

		});

	};
};

export default Post;
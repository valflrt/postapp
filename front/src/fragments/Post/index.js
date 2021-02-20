import "./index.css";
import { Component } from "react";

import { Link } from "react-router-dom";
import { Image } from "../Image";

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			galleryMode: false
		};
	};

	render() {

		let props = this.props.props;

		return (
			<div className="post">
				{props.hasImage === true ? (
					<Image action={() => this.setState({ galleryMode: true })} src={`/posts/${props._id}.png`} alt={props._id} />
				) : null}
				<div className="wrapper">
					<div className="main-text">
						{props.description}
					</div>
					<div className="action-bar">
						<Link to={`/user/${props.author._id}`} className="non-formated-text">
							@{props.author.username}
						</Link>
					</div>
				</div>
				{(this.state.galleryMode === true) && (
					<div className="imageContainer" onClick={() => this.setState({ galleryMode: false })}>
						<img className="image" src={`/posts/${props._id}.png`} alt={props._id} />
					</div>
				)}
			</div>
		);
	};
};

export default Post;
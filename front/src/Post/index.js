import "./index.css";
import { Component } from "react";
import { Link } from "react-router-dom";

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isImageFocused: false
		};
	};

	render() {

		let props = this.props.props;

		return (
			<div className="post">
				{props.hasImage === true ? (
					<img className="image" onClick={() => this.setState({ isImageFocused: true })} src={`/posts/${props._id}.png`} alt={props._id} />
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
				{(this.state.isImageFocused === true) && (
					<div className="imageContainer" onClick={() => this.setState({ isImageFocused: false })}>
						<img className="image" src={`/posts/${props._id}.png`} alt={props._id} />
					</div>
				)}
			</div>
		);
	};
};

export default Post;
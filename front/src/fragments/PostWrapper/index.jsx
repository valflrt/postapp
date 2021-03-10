import Post from "../Post";

import "./index.css";

function PostWrapper({ posts, author }) {

	return (
		<div className="wrapper">
			{
				(posts.length !== 0) ?
					(posts.map(post => (
						<Post post={post} key={post._id} author={author} />
					))) :
					<p className={"self-align-center self-justify-center"}>How empty O-O</p>
			}
		</div>
	);
};

export default PostWrapper;
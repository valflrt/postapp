import Post from "../Post";
import Loader from "../Loader";

import "./index.css";

function PostWrapper({ posts, author }) {

	const { data, loaded, error } = posts;

	return (
		<div className="wrapper">
			{
				(!data || data === null || data.length === 0) ?
					<p className={"self-align-center self-justify-center"}>How empty O-O</p>
					: !loaded ? ((!error || data !== false) ? <Loader /> : <Loader error />)
						: data.map(post => (<Post post={post} key={post._id} author={author} />))
			}
		</div>
	);
};

export default PostWrapper;
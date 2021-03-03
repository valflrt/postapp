import "./index.css";

const Loader = ({ error }) => (
	<div id="loaderContainer">

		{(error === true) ? (
			<p className="centeredText">Ooops !	An error appeared (as a Pokemon) while we were trying to connect to our servers.<br />
				Reconnecting to your network could solve the problem (as Pokeballs).</p>
		) : (<span className="loader"></span>)}
	</div>
);

export default Loader;
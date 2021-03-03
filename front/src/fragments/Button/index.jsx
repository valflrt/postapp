import "./index.css";

const Button = ({ value, title, action }) => (
	<div className="button" title={title || null} onClick={action}>
		<p>{value}</p>
	</div>
);

export default Button;
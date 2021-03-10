import "./index.css";

const Button = ({ value, title, action, className }) => (
	<div className={`button ${className}`} title={title || null} onClick={action}>
		<p>{value}</p>
	</div>
);

export default Button;
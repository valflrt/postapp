const Image = ({ action, src, alt }) => (<img onClick={action} src={src} alt={alt || ""} className={"image"} />);

export default Image;
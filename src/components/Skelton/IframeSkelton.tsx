import classes from "./IframeSkelton.module.css"
const IframeSkelton = () => {
	return (
		<div className={['loading',classes['iframe-img']].join(" ")}/>
	);
};

export default IframeSkelton;

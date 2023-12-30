import React from 'react';
import classes from "./FileListSkelton.module.css"
const FileListSkelton = (props) => {
	return (
		<div className={`${classes['file-list']} ${props.dark?classes['search-dark-theme']+" "+"search-dark-theme":""}`}>
			<div className={classes['file-div']}>
				<div className={classes['file-icon']}>
					<div className={['loading',classes.img].join(" ")}></div>
				</div>
				<div className={classes['file-info']}>
					<h3><span className={['loading',classes.mainHeading].join(" ")}>index.jpg</span></h3>
					<p className={['loading',classes.mainHeading].join(" ")}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque, laborum!</p>
				</div>
			</div>
		</div>
	);
};

export default FileListSkelton;

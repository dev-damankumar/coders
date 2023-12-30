import React from 'react';
import classes from "./ProjectDetailSkelton.module.css"
const ProjectDetailSkelton = props => {
	return (
		<div className="jumbotron bg-light project-detail-div">
			<div className="info-header">
				<h1 className={['loading',classes.heading].join(" ")}>Popup Chat</h1>
				<a className="shrink-box"><i className="bx bx-chevron-down"/></a>
			</div>
			<div className="info-body ">
				<div className="project-content">
					<p className={'loading'}>Pa$$w0rd!</p>
					<p className="web-url loading"><b>Website Url:</b>
						<a target="_blank" rel="noreferrer">http://localhost:5000/webapp/popup-chat</a>
					</p>
					<div className="tags">
						<div className="tag loading">CSS</div>
						<div className="tag loading">JS</div>
						<div className="tag loading">React</div>
						<div className="tag loading">Angular</div>
					</div>
					<div className="gallery-grid">
						<div className="gallery-item">
							<div className={['loading',classes['project-img-loader']].join(" ")}/>
						</div>
						<div className="gallery-item">
							<div className={['loading',classes['project-img-loader']].join(" ")}/>
						</div>
						<div className="gallery-item">
							<div className={['loading',classes['project-img-loader']].join(" ")}/>
						</div>
					</div>
				</div>
				<div className="info-footer" style={{marginTop: '15px'}}>
					<a onClick={(e)=>{e.preventDefault()}} className="btn btn-primary loading">Live Preview</a>
				</div>
			</div>
		</div>
	);
};


export default ProjectDetailSkelton;

import React from 'react';

const FileLoader = (props) => {
	return (
		<ul id="file-explorer" className="file-expand" style={{userSelect:"none",pointerEvents:"none"}}>
			<li className="parent">
				<span className="caret caret-down loading">
					<i className='bx bx-chevron-right'></i>Lorem ipsum dolor sit.</span>
				<ul className="nested file-expand">
					<li style={{height:"23px",margin:"5px  0",display:"flex"}}>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{marginRight:"5px",width:"20px",height:"20px",display:"inline-block"}}></span>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{height:"20px"}}>Lorem ipsum dolor.</span>
					</li>
					<li style={{height:"23px",margin:"5px  0",display:"flex"}}>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{marginRight:"5px",width:"20px",height:"20px",display:"inline-block"}}></span>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{height:"20px"}}>Lorem ipsum dolor. ipsum dolor.</span>
					</li>
					<li style={{height:"23px",margin:"5px  0",display:"flex"}}>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{marginRight:"5px",width:"20px",height:"20px",display:"inline-block"}}></span>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{height:"20px"}}>Lorem ipsum dolor. ipsum dolor.</span>
					</li>
					<li style={{height:"23px",margin:"5px  0",display:"flex"}}>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{marginRight:"5px",width:"20px",height:"20px",display:"inline-block"}}></span>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{height:"20px"}}>Lorem ipsum dolor dolor..</span>
					</li>
					<li style={{height:"23px",margin:"5px  0",display:"flex"}}>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{marginRight:"5px",width:"20px",height:"20px",display:"inline-block"}}></span>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{height:"20px"}}>Lo dolor. ipsum dolor.</span>
					</li>
					<li style={{height:"23px",margin:"5px  0",display:"flex"}}>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{marginRight:"5px",width:"20px",height:"20px",display:"inline-block"}}></span>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{height:"20px"}}>ffdolfffffffor. Lorem ipsum dolor.</span>
					</li>
					<li style={{height:"23px",margin:"5px  0",display:"flex"}}>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{marginRight:"5px",width:"20px",height:"20px",display:"inline-block"}}></span>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{height:"20px"}}>ffdolfffffffor. Lorem ipsum dolor.</span>
					</li>
					<li style={{height:"23px",margin:"5px  0",display:"flex"}}>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{marginRight:"5px",width:"20px",height:"20px",display:"inline-block"}}></span>
						<span className={`loading ${props.dark?"loading-dark":""}`} style={{height:"20px"}}>Lorem ipsum dolor.</span>
					</li>
					
				</ul>
			</li>
		</ul>
	);
};

export default FileLoader;

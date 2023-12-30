import React from 'react';
import getImageByExtension from "../../utils/getImageByExtension";

const XStudioTabs = ({tabs,fetchFileContentHandler,activeTab,closeTab}) => {
	return (
		<div className="x-tabs">
			{tabs.map((v,i) => {
				return <li key={i} onClick={(e) => {
					fetchFileContentHandler(e, v)
				}} className={activeTab === v ? "x-studio-active-tab" : ""}>
					<button title={v} type="button" className="x-tab"><img
						src={getImageByExtension(v.split(".")[1])}/> <span>{v}</span>
					</button>
					<button type="button" onClick={(e) => {
						closeTab(e, v)
					}} className="x-tab-close">&times;</button>
				</li>
			})}
		</div>
	);
};

export default XStudioTabs;

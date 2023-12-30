import React from 'react';

const FormControl = (props) => {
	let input = null;
	const inputClasses = '';

	let uuidv4 = () => {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	if (props.config.type !== "radio" && props.config.type !== "checkbox") {
		input = <div
			className={`form-group ${props.className?props.className:""} ${props.config.type === 'file' ? 'form-file-group' : ''} ${props.invalid && props.shouldValidate && props.touched ? 'hasError' : ''}`}>
			{props.label ? <label className={props.labelClass?props.labelClass:""} htmlFor={props.config.id?props.config.id:""}>{props.label}:</label> : ''}
			{props.config.type === 'file' ?
				(
					<div className={`main-file-wrap`}>
						<div className={`file-make-div ${props.selected ? 'form-file-selected' : ''}`}>
							<input {...props.config}
								   className={"form-input " + props.config.className?props.config.className:""}
								   onChange={props.onChange}
							/>
							<i className='bx bx-plus'></i>
						</div>
						{props?.preview?.map(v=>{
							return <img src={v}/>
						})}
						<div className="preview-img-wrap">

						</div>
						<p>{props.selectedName}</p>
					</div>
				)
				: <input {...props.config} className={"form-input " + props.config.className}
						 value={props.value}
						 onChange={props.onChange}
				/>}
		</div>
	}
	if (props.config.type === "select") {
		input =
			<div className={`form-group  ${props.className?props.className:""} ${props.invalid && props.shouldValidate && props.touched ? 'hasError' : ''}`}>
				{props.label ? <label className={props.labelClass?props.labelClass:""} htmlFor={props.config.id?props.config.id:""}>{props.label}:</label> : ''}
				<select {...props.config} className="form-input" value={props.value}
						onChange={props.onChange}>
					{props.options.map(option => (
						<option key={uuidv4()}
								value={option.value} {...option.config}>{option.value}</option>
					))}
				</select>
			</div>
	}
	if (props.config.type === "radio" || props.config.type === "checkbox") {
		input =
			<div className={`form-group ${props.className?props.className:""}  ${props.invalid && props.shouldValidate && props.touched ? 'hasError' : ''}`}>
				{
					props.options.map((option, i) => (
						<div key={uuidv4()}
							 className={`custom-control ${props.config.type === 'radio' ? 'custom-radio' : 'custom-checkbox'}`}>
							<input  {...props.config} {...option.config}
									className="custom-control-input" value={option.value}
									onChange={props.onChange}/>
							<label className="custom-control-label input-warning"
								   htmlFor={option.config.id ? option.config.id : ""}>{option.label || option.value}</label>
						</div>
					))
				}
			</div>
	}
	if (props.element === "textarea") {
		input =
			<div className={`form-group ${props.className?props.className:""}  ${props.invalid && props.shouldValidate && props.touched ? 'hasError' : ''}`}>
				{props.label ? <label className={props.labelClass?props.labelClass:""} htmlFor={props.config.id?props.config.id:""}>{props.label}:</label> : ''}
				<textarea  {...props.config} className={"form-input " + props.config.className} value={props.value}
						   onChange={props.onChange}/>
			</div>
	}

	if (props.element === "button" || props.element === "submit" || props.element === "reset") {
		input = <div className={`form-group ${props.className?props.className:""} `}>
			<button  {...props.config}
					 className={"btn btn-dark btn-sm " + props.config.className}>{props.config.value}</button>
		</div>
	}

	return (
		<>
			{input}
		</>
	);

};

export default FormControl;

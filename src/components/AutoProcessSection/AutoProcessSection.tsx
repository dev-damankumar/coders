import Heading from "../Heading/Heading";
import processImg from "../../assets/images/process.webp";
const AutoProcessSection = () => {
	return (
		<section className="section form-creation-wrap dark-main-section">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="process-wrap">
							<Heading>Complete Automated Project Uploading Process</Heading>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aperiam aut
								consequatur doloremque ducimus ex expedita, minima nobis placeat quam repellat
								suscipit vel! Aperiam est iste magnam mollitia perferendis.</p>
							<img alt="processing-img" src={processImg}/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AutoProcessSection;

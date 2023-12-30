import securityImg from "../../assets/images/security.svg";
import scaleImg from "../../assets/images/scale.svg";
import supportImg from "../../assets/images/support.svg";

const WhyChoose = () => {
  return (
    <section className="why-choose-section section form-creation-wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="achieve_main">
              <div className="edu_sub_mainheaidng edu_center_mainheaidng">
                <h2>Why choose us</h2>
              </div>
              <div className="achieve_listings">
                <ul>
                  <li>
                    <div className="lsiting_achieve_inner">
                      <span className="why_choosecion">
                        <img src={securityImg} />
                      </span>
                      <h3>100% Data Security</h3>
                    </div>
                  </li>
                  <li>
                    <div className="lsiting_achieve_inner">
                      <span className="why_choosecion">
                        <img src={scaleImg} />
                      </span>
                      <h3>Highly Scalable Solution</h3>
                    </div>
                  </li>
                  <li>
                    <div className="lsiting_achieve_inner">
                      <span className="why_choosecion">
                        <img src={supportImg} />
                      </span>
                      <h3>24X7 Customer Support</h3>
                    </div>
                  </li>
                </ul>
                <div className="edu_button">
                  <button type="button" className="btn btn-primary">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

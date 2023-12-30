import step1 from "../../assets/images/steps/1step.jpg";
import step2 from "../../assets/images/steps/2step.jpg";
import step3 from "../../assets/images/steps/3step.jpg";
import step5 from "../../assets/images/steps/5step.jpg";

const Roadmap = () => {
  return (
    <section className="section tech-section form-creation-wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="main-h or-bg">
              Roadmap & Features<span> to work fluently...</span>
            </h2>
          </div>
          <div className="col-md-12">
            <div className="service-wrap">
              <ul className="nav nav-pills service-tab">
                <li className="nav-item">
                  <a className="nav-link active-warning">
                    <span>Open and Login to your account</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>Select the desired project you want to preview</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>Manage project Preferences and privacy</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>One click control over your entire project</span>
                  </a>
                </li>
              </ul>
              <div className=" service-content">
                <div
                  className="tab-pane container "
                  id="mobile1"
                  style={{ display: "block" }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="laptop">
                          <div className="content">
                            <img alt="step1" src={step1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="timeline">
              <div className="phone-line phone-line1" />
              <div className="phone-line phone-line3" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="service-wrap invert-warp">
              <div className=" service-content">
                <div
                  className="tab-pane container "
                  id="mobile2"
                  style={{ display: "block" }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="laptop">
                          <div className="content">
                            <img src={step2} alt={"step2"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="nav nav-pills service-tab">
                <li className="nav-item">
                  <a className="nav-link active-warning">
                    <span>Get preview of your site instantly</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>View your project statistics and description</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>Get your project's live URL to share</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>Manage your project code within the app</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-12">
            <div className="timeline">
              <div className="phone-line phone-line2" />
              <div className="phone-line phone-line4" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="service-wrap">
              <ul className="nav nav-pills service-tab">
                <li className="nav-item">
                  <a className="nav-link active-warning">
                    <span>Modern and Easy to use project panel</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>Create and upload file instantly</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>Download or scan your project in one touch</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>Have a bird eye view on all the activities</span>
                  </a>
                </li>
              </ul>

              <div className="service-content">
                <div
                  className="tab-pane container"
                  id="mobile3"
                  style={{ display: "block" }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="laptop">
                          <div className="content">
                            <img src={step3} alt={"step3"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="timeline">
              <div className="phone-line phone-line1" />
              <div className="phone-line phone-line3" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="service-wrap invert-warp">
              <div className=" service-content">
                <div
                  className="tab-pane container "
                  id="mobile2"
                  style={{ display: "block" }}
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="laptop">
                          <div className="content">
                            <img src={step5} alt={"step4"} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="nav nav-pills service-tab">
                <li className="nav-item">
                  <a className="nav-link active-warning">
                    <span>View and Edit Your code within the app</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>Easy to use and navigate throughout the project</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>One touch action to perform on your project</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">
                    <span>
                      Built-In Code editor (X Studio) for mangaing your project
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

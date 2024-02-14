import securityImg from '../../../assets/images/security.svg';
import scaleImg from '../../../assets/images/scale.svg';
import supportImg from '../../../assets/images/support.svg';
import classes from './index.module.css';

const WhyChoose = () => {
  return (
    <section className={`section ${classes.whyChooseSection}`}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className={classes.main}>
              <div className={classes.subHeading}>
                <h2>Why choose us</h2>
              </div>
              <div className={classes.listings}>
                <ul>
                  <li>
                    <div className={classes.listInner}>
                      <span className={classes.icon}>
                        <img src={securityImg} />
                      </span>
                      <h3>100% Data Security</h3>
                    </div>
                  </li>
                  <li>
                    <div className={classes.listInner}>
                      <span className={classes.icon}>
                        <img src={scaleImg} />
                      </span>
                      <h3>Highly Scalable Solution</h3>
                    </div>
                  </li>
                  <li>
                    <div className={classes.listInner}>
                      <span className={classes.icon}>
                        <img src={supportImg} />
                      </span>
                      <h3>24X7 Customer Support</h3>
                    </div>
                  </li>
                </ul>
                <div className={classes.buttonWrap}>
                  <button type='button' className='btn btn-primary'>
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

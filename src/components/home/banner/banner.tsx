import { NavLink } from 'react-router-dom';
import classes from './Banner.module.css';
import Heading from '../../ui/Heading';

const BannerSection = () => {
  return (
    <section
      className='section main-bg-section'
      style={{ paddingTop: '70px', marginTop: '30px' }}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-md-7 col-lg-6'>
            <div className={classes.heading}>
              <h6>developer data and customized platform</h6>
              <Heading style={{ fontSize: '35px' }}>
                Grow Your Project Easily With Coders
              </Heading>
              <p className='sub-title'>
                Coders is great tool to manage and develop your project. you
                will get one touch access to your each project and can easily
                manage and customize that project and even you can decide what
                to show to public and what to not. Get you integrated In-Build
                Code editor to easily edit your code on the go and see the
                change live instantly.
              </p>
              <div className='footerWrap footer' style={{ marginTop: '45px' }}>
                <NavLink to='/register'>
                  <button
                    style={{ padding: '10px 25px' }}
                    type='button'
                    className='btn btn-primary inc-btn'
                  >
                    Get Started
                    <i className='bx bx-right-arrow-alt' />
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            {/* <div className="banner-content">
							<div className="wrap-react" ><img alt="react" className="floating-item react" src='/assets/images/atom.svg'/></div>
							<div className="wrap-css" ><img alt="css" className="floating-item css" src='/assets/images/css-3.svg'/></div>
							<div className="wrap-html" ><img alt="html" className="floating-item html" src='/assets/images/html.svg'/></div>
							<div className="wrap-js" ><img alt="js" className="floating-item js" src='/assets/images/js.png'/></div>
							<div className="wrap-json" ><img alt="json" className="floating-item json" src='/assets/images/json.svg'/></div>
							<div className="wrap-angular" ><img alt="angular" className="floating-item angular" src='/assets/images/ng.png'/></div>
							<div className="wrap-vue" ><img alt="vue" className="floating-item vue" src='/assets/images/vue.png'/></div>
							<div className="wrap-php" ><img alt="php" className="floating-item php" src='/assets/images/php.svg'/></div>
							<div className="wrap-photoshop"><img alt="photoshop" className="floating-item photoshop" src='/assets/images/ps.svg'/></div>
							<div className="wrap-python" ><img alt="python" className="floating-item python" src='/assets/images/python.svg'/></div>
							<div className="wrap-scss" ><img alt="scss" className="floating-item scss" src='/assets/images/scss.svg'/></div>
							<div className="wrap-typescript"><img alt="typescript" className="floating-item typescript" src='/assets/images/ts.svg'/></div>
						</div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;

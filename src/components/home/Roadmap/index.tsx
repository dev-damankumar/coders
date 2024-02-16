import step1 from '../../../assets/images/steps/1step.jpg';
import step2 from '../../../assets/images/steps/2step.jpg';
import step3 from '../../../assets/images/steps/3step.jpg';
import step5 from '../../../assets/images/steps/5step.jpg';
import Heading from '../../ui/Heading';
import classes from './index.module.css';

const Roadmap = () => {
  return (
    <section className={`section tech-section ${classes.techSection}`}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Heading as='h2' style={{ marginBottom: '30px' }}>
              Roadmap & Features to work fluently...
            </Heading>
          </div>
          <div className='col-md-12'>
            <div className={classes.blocks}>
              <ul className={classes.serviceTab}>
                <li>
                  <span>Open and Login to your account</span>
                </li>
                <li>
                  <span>Select the desired project you want to preview</span>
                </li>
                <li>
                  <span>Manage project Preferences and privacy</span>
                </li>
                <li>
                  <span>One click control over your entire project</span>
                </li>
              </ul>
              <div className={classes.serviceContent}>
                <div
                  className={classes.container}
                  id='mobile1'
                  style={{ display: 'block' }}
                >
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className={classes.laptop}>
                          <div className={classes.content}>
                            <img alt='step1' src={step1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className={classes.timeline}>
              <div className={classes.phoneLine1} />
              <div className={classes.phoneLine3} />
            </div>
          </div>
          <div className='col-md-12'>
            <div className={`${classes.blocks} ${classes.invertWarp}`}>
              <div className={classes.serviceContent}>
                <div
                  className='container '
                  id='mobile2'
                  style={{ display: 'block' }}
                >
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className={classes.laptop}>
                          <div className={classes.content}>
                            <img src={step2} alt={'step2'} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className={classes.serviceTab}>
                <li>
                  <span>Get preview of your site instantly</span>
                </li>
                <li>
                  <span>View your project statistics and description</span>
                </li>
                <li>
                  <span>Get your project's live URL to share</span>
                </li>
                <li>
                  <span>Manage your project code within the app</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-12'>
            <div className={classes.timeline}>
              <div className={classes.phoneLine2} />
              <div className={classes.phoneLine4} />
            </div>
          </div>
          <div className='col-md-12'>
            <div className={classes.blocks}>
              <ul className={classes.serviceTab}>
                <li>
                  <span>Modern and Easy to use project panel</span>
                </li>
                <li>
                  <span>Create and upload file instantly</span>
                </li>
                <li>
                  <span>Download or scan your project in one touch</span>
                </li>
                <li>
                  <span>Have a bird eye view on all the activities</span>
                </li>
              </ul>

              <div className={classes.serviceContent}>
                <div
                  className={classes.container}
                  id='mobile3'
                  style={{ display: 'block' }}
                >
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className={classes.laptop}>
                          <div className={classes.content}>
                            <img src={step3} alt={'step3'} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className={classes.timeline}>
              <div className={classes.phoneLine1} />
              <div className={classes.phoneLine3} />
            </div>
          </div>
          <div className='col-md-12'>
            <div className={`${classes.blocks} ${classes.invertWarp}`}>
              <div className={classes.serviceContent}>
                <div
                  className='container '
                  id='mobile2'
                  style={{ display: 'block' }}
                >
                  <div className='container'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <div className={classes.laptop}>
                          <div className={classes.content}>
                            <img src={step5} alt={'step4'} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className={classes.serviceTab}>
                <li>
                  <span>View and Edit Your code within the app</span>
                </li>
                <li>
                  <span>Easy to use and navigate throughout the project</span>
                </li>
                <li>
                  <span>One touch action to perform on your project</span>
                </li>
                <li>
                  <span>
                    Built-In Code editor (X Studio) for mangaing your project
                  </span>
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

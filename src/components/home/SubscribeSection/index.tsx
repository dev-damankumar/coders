import Heading from '../../ui/Heading';
import { NavLink } from 'react-router-dom';
import bg from '../../../assets/images/home-bg.webp';

const SubscribeSection = () => {
  return (
    <section className={`section `} style={{ background: `url(${bg})` }}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div>
              <Heading>Start Growing with your own instance of Coders</Heading>
              <p>
                What are you waiting for get you own instance of the project
                right now and start building you project with the right tools we
                can offer.
              </p>
              <NavLink to='/register'>
                <button className='btn btn-primary btn-small'>Start Now</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;

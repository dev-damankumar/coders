import { useLocation } from 'react-router-dom';
import styles from './footer.module.css';
import { showFooter } from '../../../utils/helper';
import SocialIcons from '../../profile/SocialIcons';
import SiteLogo from '../../../assets/icons/SiteLogo';

function Footer() {
  const path = useLocation().pathname;
  let show = showFooter(path);
  if (!show) return;
  return (
    <section className={`section ${styles.footerSection}`}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <SiteLogo />
          </div>
          <div className='col-md-6'>
            <p>
              Coders is great tool to manage and develop your project. you will
              get one touch access to your each project and can easily manage
              and customize that project and even you can decide what to show to
              public and what to not. Get you integrated In-Build Code editor to
              easily edit your code on the go and see the change live instantly.
            </p>
          </div>
          <div className='col-md-6'>
            <div className='iframeMap'>
              {/* <iframe
                src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13590.662992618576!2d74.8624088!3d31.615617499999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1641377255338!5m2!1sen!2sin'
                allowFullScreen
                loading='lazy'
              ></iframe> */}
            </div>
          </div>
        </div>
        <div className='social-row row'>
          <div className='col-md-6'></div>
          <div className='col-md-6'>
            <div className='social-icons'>
              <SocialIcons />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <p>Coders {new Date().getFullYear()} | All Rights Reserved</p>
          </div>
          <div className='col-sm-6'>
            <p className='terms'>&copy; Copyright {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;

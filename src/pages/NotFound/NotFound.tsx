import img from '../../assets/images/not-found.svg';
import './NotFound.css';
import securityImg from '../../assets/images/security.svg';
import scaleImg from '../../assets/images/scale.svg';
import supportImg from '../../assets/images/support.svg';

function NotFound() {
  return (
    <section className='why-choose-section not-found-page'>
      <div className='container'>
        <div className='achieve_main'>
          <div className='edu_sub_mainheaidng edu_center_mainheaidng'>
            <h2>Page Not Found</h2>
          </div>
          <img alt='not found' src={img} className='not-found-img' />
          <p>
            The specified page was not found. Please check the URL for mistakes
            and try again.
          </p>
          <div className='achieve_listings'>
            <ul>
              <li>
                <div className='lsiting_achieve_inner'>
                  <span className='why_choosecion'>
                    <img src={securityImg} />
                  </span>
                  <h3>100% Data Security</h3>
                </div>
              </li>
              <li>
                <div className='lsiting_achieve_inner'>
                  <span className='why_choosecion'>
                    <img src={scaleImg} />
                  </span>
                  <h3>Highly Scalable Solution</h3>
                </div>
              </li>
              <li>
                <div className='lsiting_achieve_inner'>
                  <span className='why_choosecion'>
                    <img src={supportImg} />
                  </span>
                  <h3>24X7 Customer Support</h3>
                </div>
              </li>
            </ul>
            <div className='edu_button'>
              <a href='/' className='btn btn-primary'>
                Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;

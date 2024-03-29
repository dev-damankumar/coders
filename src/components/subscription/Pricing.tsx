import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SaveRowIcon from '../../assets/icons/SaveRowIcon';
import Heading from '../ui/Heading';
import img1 from '../../assets/images/dollar.png';
import Loading from '../ui/Loading';
import NoData from '../ui/NoData/NoData';

type Plan = {
  unit_amount: number;
  id: string;
  product: {
    images: string[];
    name: string;
    description: string;

    metadata: {
      plan_name: string;
      features: string;
    };
  };
};
const Pricing = () => {
  const [plans, setPlans] = useState<Plan[] | null>(null);
  // useEffect(() => {
  //   async function getPrices() {
  //     try {
  //       let plansArray = await http.post(
  //         `${env['REACT_APP_BASE_URL']}/api/get-plans/`
  //       );
  //       if (plansArray) {
  //         setPlans(plansArray.plans.reverse());
  //       } else {
  //         setPlans([]);
  //       }
  //     } catch (e) {
  //       setPlans([]);
  //       toast.error(e.message);
  //     }
  //   }
  //   getPrices();
  // }, []);

  if (!plans) return <Loading />;
  return (
    <section
      id='pricing'
      className='section'
      style={{ paddingTop: '130px', marginTop: '-100px' }}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-md-12' style={{ padding: 0 }}>
            <div className='start-section text-center pricing-section'>
              <Heading>Get Started With Us</Heading>
              <p>
                You can get started with us according to your need of plan. we
                offer a good service at very affordable subscription.Get your
                plan today and start building amazing stuff.
              </p>
              <div className='container'>
                <div
                  className='row'
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <NoData
                    message='No Pricing Plans Found'
                    if={plans.length === 0}
                  />
                  {plans.map((plan, index) => {
                    const product = plan.product;
                    return (
                      <div className='col-md-6 col-lg-4' key={index}>
                        <div
                          className={`jumbotron pricing-card ${
                            product.name === 'projectx_enterprises' ||
                            product.name === 'projectx_enterprise'
                              ? 'premium-card'
                              : ''
                          }`}
                        >
                          <img
                            src={product.images[0] || img1}
                            className='plan-img'
                          />
                          <Heading>{product.metadata.plan_name}</Heading>
                          <p className='des-pricing-p'>{product.description}</p>
                          <p className='price-para'>
                            <span>&#8377;</span>
                            {plan.unit_amount / 100}
                            <span className='month-span'>/ month</span>
                          </p>
                          <ul className='plan-feature-list'>
                            {product.metadata.features
                              .split(',')
                              .map((feature, i) => {
                                return (
                                  <li key={i}>
                                    <div className='feature-div'>
                                      <SaveRowIcon />
                                      <p>{feature}</p>
                                    </div>
                                  </li>
                                );
                              })}
                          </ul>
                          <NavLink to={`/register/${plan.id}`}>
                            <button type='button' className='btn btn-primary'>
                              Get Started
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

import React from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Http from '../../hooks/http';
import './CheckoutForm.css';
import { loader } from '../../utils/';
import { env } from '../../utils';

const inputStyle = {
  border: '0',
  outline: 'none',
  borderBottom: '2px solid #dedede',
  borderImageSlice: '1',
  textDecoration: 'none',
  borderRadius: '0',
  fontSize: '15px',
  padding: '0.5rem 1rem',
  paddingLeft: '0',
  display: 'block',
  fontFamily: 'Nunito, sans-serif',
  width: '100%',
  fontWeight: 500,
  color: '#1d293e',
  background: '#fff',
  backgroundClip: 'padding-box',
  transition: 'border-color .15s ease-in-out, box-shadow .15s ease-in-out',
  height: 'calc(1.5em + 1rem + 2px) !important',
  lineHeight: 1.5,
  '::placeholder': {
    color: 'rgb(159, 159, 159)',
  },
};
const invalidStyle = {
  color: '#ff304f',
};

const CheckoutForm = (props) => {
  let {
    currentUser,
    dataHandler,
    setCurrentUser,
    done,
    setDone,
    initialStep,
    setStep,
  } = props;
  const stripe = useStripe();
  const elements = useElements();
  let http = Http();

  let resetEveryThing = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('plan');
    setCurrentUser(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(currentUser?.email && currentUser?._id)) {
      toast.error('Error occured while registering');
      window.location.href = '/';
      return;
    }
    loader.show();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(
        CardNumberElement,
        CardExpiryElement,
        CardCvcElement
      ),
    });

    if (error) {
      toast.error(error.message);
      resetEveryThing();
      return;
    }

    try {
      const response = await http.post(
        `${env['REACT_APP_BASE_URL']}/api/payment/`,
        {
          paymentMethod: paymentMethod.id,
          id: props.id,
          user: currentUser._id,
          email: currentUser?.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response?.payment_status === 'requires_action') {
        return stripe
          .confirmCardPayment(response.subscription.client_secret, {
            payment_method: paymentMethod.id,
          })
          .then(async (result) => {
            if (result.error) {
              const data = await http.post(
                `${env['REACT_APP_BASE_URL']}/api/payment-incomplete/`,
                {
                  user: currentUser._id,
                  email: currentUser?.email,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                }
              );
              await dataHandler(data);
              throw result;
            } else {
              if (result.paymentIntent.status === 'succeeded') {
                const data = await http.post(
                  `${env['REACT_APP_BASE_URL']}/api/payment-3d-secure/`,
                  {
                    paymentMethod: paymentMethod.id,
                    id: props.id,
                    user: currentUser._id,
                    email: currentUser?.email,
                  },
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                );
                // Show a success message to your customer.
                await dataHandler(data);
              }
            }
          })
          .catch((error) => {
            console.log('error', error);
          });
      } else {
        await dataHandler(response);
        if (response.type === 'success') {
          resetEveryThing();
        }
      }
    } catch (error) {
      toast.error(error.message);
      resetEveryThing();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 payment-col'>
              <div className='form-payment-group'>
                <label className='main-payment-label'>
                  <i className='bx bxs-credit-card'></i>
                  Card Number
                </label>
                <div className='main-input-wrap'>
                  <CardNumberElement
                    options={{
                      style: {
                        base: inputStyle,
                        invalid: invalidStyle,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-6 payment-col' style={{ paddingLeft: '0' }}>
              <div className='form-payment-group'>
                <label className='main-payment-label'>Card Expiry Date</label>
                <div className='main-input-wrap'>
                  <CardExpiryElement
                    options={{
                      style: {
                        base: inputStyle,
                        invalid: invalidStyle,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-6 payment-col' style={{ paddingRight: '0' }}>
              <div className='form-payment-group'>
                <label className='main-payment-label'>Card CVV</label>
                <div className='main-input-wrap'>
                  <CardCvcElement
                    options={{
                      style: {
                        base: inputStyle,
                        invalid: invalidStyle,
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12 payment-col'>
              <button className='btn btn-primary'>Payment</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;

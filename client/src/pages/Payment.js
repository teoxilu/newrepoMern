import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';
import transition from '~/utils/transition';
import StickyHeader from '~/components/StickyHeader';

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
    return (
        <>
            <StickyHeader />
            <Elements stripe={promise}>
                <StripeCheckout />
            </Elements>
        </>
    );
};

export default transition(Payment);

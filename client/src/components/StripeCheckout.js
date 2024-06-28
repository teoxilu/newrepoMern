import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { Link, useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined, SwapOutlined } from '@ant-design/icons';
import { createOrder, emptyUserCart, getUserOrders } from '../functions/user';
import spongepay from '../images/spongepay.jpg';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';
import numeral from 'numeral';
import config from '~/config';
import images from '~/images';

const StripeCheckout = () => {
    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({ ...state }));

    const [orderInfo, setOrderInfo] = useState(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');

    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);

    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();
    let cart = [];

    useEffect(() => {
        createPaymentIntent(user.token, coupon).then((res) => {
            console.log('create payment intent', res.data);
            setClientSecret(res.data.clientSecret);
            // additional response received on successful payment
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            setPayable(res.data.payable);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            // here you get result after successful payment
            // create order and save in database for admin to process
            createOrder(payload, user.token).then((res) => {
                if (res.data.ok) {
                    // empty cart from local storage
                    if (typeof window !== 'undefined') localStorage.removeItem('cart');
                    // empty cart from redux
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: [],
                    });
                    // reset coupon to false
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: false,
                    });
                    // empty cart from database
                    emptyUserCart(user.token);

                    // Open dialog
                    setTimeout(async () => {
                        await getUserOrders(user.token).then((res) => setOrderInfo(res.data[res.data.length - 1]));
                        setIsOpenDialog(true);
                    }, 1000);
                }
            });
            // empty user cart from redux store and local storage
            console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (e) => {
        // listen for changes in the card element
        // and display any errors as the custoemr types their card details
        setDisabled(e.empty); // disable pay button if errors
        setError(e.error ? e.error.message : ''); // show error message
    };

    const cartStyle = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#32325d',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    return (
        <>
            <Dialog
                size="sm"
                open={isOpenDialog}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: 100 },
                }}
            >
                <DialogHeader className="text-light-on-surface flex items-center space-x-2">
                    <Typography
                        className="text-2xl font-semibold text-light-on-surface"
                        style={{
                            color: '#8f0000',
                            backgroundImage: '-webkit-linear-gradient(0deg, #8f0000 0%, #a7382a 50%, #603f00 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textFillColor: 'transparent',
                        }}
                    >
                        Thanks for ordering
                    </Typography>
                    <img
                        className="w-12 h-12 flex-shrink-0 animate-bounce"
                        src={images.shoeShopIcon}
                        alt="Shoe Shop icon"
                    />
                </DialogHeader>
                <DialogBody className="flex flex-col space-y-2 text-light-on-surface">
                    <p>
                        Order Id: <b>{orderInfo?._id}</b>
                    </p>
                    <p>
                        Date: <b>{new Date(orderInfo?.paymentIntent.created * 1000).toLocaleString()}</b>
                    </p>
                    <p>
                        <span className="text-light-on-surface-variant">Total amount:</span>{' '}
                        <b className="text-light-primary">
                            {numeral(orderInfo?.paymentIntent.amount).format('0,0')}{' '}
                            {orderInfo?.paymentIntent.currency.toUpperCase()}
                        </b>
                    </p>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        className="text-light-primary hover:bg-light-primary/8 mr-2 rounded-full"
                        onClick={() => {
                            setIsOpenDialog(false);
                            history.replace(config.routes.home);
                        }}
                    >
                        Go back Shopping
                    </Button>
                    <Button
                        className="bg-light-primary text-light-on-primary rounded-full"
                        onClick={() => {
                            setIsOpenDialog(false);
                            history.replace(config.routes.history);
                        }}
                    >
                        View order history
                    </Button>
                </DialogFooter>
            </Dialog>

            {!succeeded && (
                <div>
                    {coupon && totalAfterDiscount !== undefined ? (
                        <p className="alert alert-success">{`Total after discount: ${totalAfterDiscount} VND`}</p>
                    ) : (
                        <p className="alert alert-danger">No coupon applied</p>
                    )}
                </div>
            )}
            <div className="text-center pb-5">
                <Card
                    cover={
                        <img
                            src={spongepay}
                            style={{
                                height: '480px',
                                objectFit: 'cover',
                                marginBottom: '-50px',
                            }}
                            alt="illustrate"
                        />
                    }
                    actions={[
                        <>
                            <DollarOutlined className="text-info" /> <br /> Total:
                            {cartTotal} VND
                        </>,
                        <>
                            <CheckOutlined className="text-info" /> <br /> Total payable:
                            {(payable / 100).toFixed(2)} VND
                        </>,
                    ]}
                />
            </div>

            <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
                <button className="stripe-button" disabled={processing || disabled || succeeded}>
                    <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : 'Pay'}</span>
                </button>
                <br />
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                <br />
                <p className={succeeded ? 'result-message' : 'result-message hidden'}>
                    Payment Successful. <Link to="/user/history">See it in your purchase history.</Link>
                </p>
            </form>
        </>
    );
};

export default StripeCheckout;

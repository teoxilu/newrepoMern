import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { Link, useHistory } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined, SwapOutlined } from '@ant-design/icons';
import { createOrder, emptyUserCart, getUserOrders, createGhnOrder, updateOrder } from '../functions/user';
import spongepay from '../images/spongepay.jpg';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';
import numeral from 'numeral';
import config from '~/config';
import images from '~/images';
import { sendConfirmationEmail } from '../functions/email';
import { toast } from 'react-toastify';

const StripeCheckout = () => {
    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({ ...state }));
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

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
        createPaymentIntent(user?.token, coupon).then((res) => {
            console.log('create payment intent', res.data);
            setClientSecret(res.data.clientSecret);
            // additional response received on successful payment
            setCartTotal(res.data.cartTotal);
            setTotalAfterDiscount(res.data.totalAfterDiscount);
            setPayable(res.data.payable);
        });
    }, []);

    useEffect(() => {
        // Lấy address và phone từ localStorage
        const storedAddress = localStorage.getItem('address');
        const storedPhone = localStorage.getItem('phone');
        const storedProducts = localStorage.getItem('products');
        const storedTotal = localStorage.getItem('total');

        if (storedAddress) {
            setAddress(storedAddress);
        }

        if (storedPhone) {
            setPhone(storedPhone);
        }

        if (storedProducts) {
            setProducts(storedProducts);
        }

        if (storedTotal) {
            setTotal(storedTotal);
        }
    }, []);

    const handleOrderCompletion = () => {
        // Xóa address và phone khỏi localStorage
        localStorage.removeItem('address');
        localStorage.removeItem('phone');
        localStorage.removeItem('products');
        localStorage.removeItem('total');
        
    };

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
            createOrder(payload, user?.token).then((res) => {
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
                    dispatch({
                        type: 'COD',
                        payload: false,
                    });
                    // empty cart from database
                    emptyUserCart(user?.token);

                    // Open dialog
                    setTimeout(async () => {
                        getUserOrders(user.token).then((res) => {
                            setOrderInfo(res.data[res.data.length - 1]);
                            setIsOpenDialog(true);
                            console.log(products);
                            sendConfirmationEmail(user.email, res.data[res.data.length - 1], user.token);
                            const tempOrder = res.data[res.data.length - 1];
                            console.log('Total after discount:', totalAfterDiscount);
                            console.log('Total:', total);
    
                            // Create GHN order
                            const orderData = {
                                items: [
                                    {
                                        name: 'Shoes',
                                        quantity: tempOrder.products[0].count,
                                        price: Number(total),
                                        weight: 500,
                                    },
                                ],
                                from_name: '2HS',
                                from_phone: '0338778921',
                                from_address: 'Binh An',
                                from_ward_name: 'Phường Bình An',
                                from_district_name: 'Thành phố Dĩ An',
                                from_province_name: 'Binh Duong',
    
                                to_name: user.name, // Make sure to get the user's name
                                to_address: address, // Ensure address is correctly set
                                to_phone: phone, // Ensure phone is correctly set
                                to_ward_code: '440502',
                                to_district_id: 1540,
                                weight: 300,
                                length: 20,
                                width: 10,
                                height: 10,
                                service_type_id: 2,
                                service_id: 3,
                                payment_type_id: 1,
                                // Weight: 200, // Example weight, adjust as needed
                                required_note: 'CHOXEMHANGKHONGTHU', // or any required note per your GHN settings
                                // total: totalAfterDiscount > 0 ? totalAfterDiscount : total,
                            };
                            createGhnOrder(orderData).then((ghnRes) => {
                                console.log('hello');
                                updateOrder(user.token, tempOrder._id, ghnRes.data.data.order_code).then((resp) => {
                                    console.log(resp);
                                });
    
                                if (ghnRes.data) {
                                    toast.success('GHN order created successfully');
                                } else {
                                    toast.error('GHN order creation failed');
                                    console.log('hello');
                                }
                            });
                        });
                    }, 1000);
                }
                handleOrderCompletion();
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
        // and display any errors as the customer types their card details
        setDisabled(e.empty); // disable pay button if errors
        setError(e.error ? e.error.message : ''); // show error message
    };

    const cartStyle = {
        style: {
            // base: {
            //     color: '#281714',
            //     fontFamily: 'Arial, sans-serif',
            //     fontSmoothing: 'antialiased',
            //     fontSize: '16px',
            //     '::placeholder': {
            //         color: '#5d403b',
            //     },
            // },
            invalid: {
                color: '#ba1a1a',
                iconColor: '#ba1a1a',
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

            {/* {!succeeded && (
                <div>
                    {coupon && totalAfterDiscount !== undefined ? (
                        <p className="alert alert-success">{`Total after discount: ${totalAfterDiscount} VND`}</p>
                    ) : (
                        <p className="alert alert-danger">No coupon applied</p>
                    )}
                </div>
            )} */}
            <div className="grid grid-cols-3 px-40 pt-28 text-light-on-surface h-fit">
                <div className="col-span-1">
                    <img
                        src={images.checkoutImage}
                        alt={'checkout shoe'}
                        className="w-full h-auto rounded-ss-lg rounded-es-lg object-cover shadow-xl"
                    />
                </div>
                <div className="col-span-2">
                    <form
                        id="payment-form"
                        className="stripe-form flex flex-col justify-between h-full border border-light-outline outline-none shadow-xl rounded-ee-lg rounded-se-lg"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <h1 className="text-xl">Payment Information</h1>
                            <div className="flex flex-col space-y-2 py-2 border-t border-b border-light-outline-variant mt-4">
                                <div className="flex items-center justify-between">
                                    <h1>Subtotal:</h1>
                                    <p className="text-light-on-surface font-medium">{numeral(cartTotal).format('0,0')} VND</p>
                                </div>

                                {coupon && totalAfterDiscount !== undefined ? (
                                    <div className="flex items-center justify-between">
                                        <h1>Total after discount:</h1>
                                        <p className="text-light-on-surface font-medium">
                                            {numeral(totalAfterDiscount).format('0,0')} VND
                                        </p>
                                    </div>
                                ) : (
                                    <p className="italic text-light-on-surface-variant">No coupon applied</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <h1>Total:</h1>
                                <p className="text-light-primary font-bold text-base">
                                    {numeral(payable).format('0,0')} VND
                                </p>
                            </div>

                            <CardElement
                                id="card-element"
                                options={cartStyle}
                                className="!text-light-on-surface placeholder:!text-light-on-surface-variant/80 rounded-lg mt-4"
                                onChange={handleChange}
                            />
                            <br />
                            {error && (
                                <div className="text-light-error" role="alert">
                                    {error}
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            className="bg-light-primary text-light-on-primary rounded-full mt-8"
                            disabled={processing || disabled || succeeded || error}
                        >
                            <span id="button-text">
                                {processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
                            </span>
                        </Button>
                        {/* <p className={succeeded ? 'result-message' : 'result-message hidden'}>
                            Payment Successful. <Link to="/user/history">See it in your purchase history.</Link>
                        </p> */}
                    </form>
                </div>
            </div>
        </>
    );
};

export default StripeCheckout;

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
    Button,
    ButtonGroup,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    IconButton,
    Typography,
} from '@material-tailwind/react';
import {
    getUserCart,
    emptyUserCart,
    saveUserAddress,
    applyCoupon,
    createCashOrderForUser,
    getUserOrders,
} from '~/functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useHistory } from 'react-router-dom';
import numeral from 'numeral';
import config from '~/config';
import images from '~/images';
import transition from '~/utils/transition';
import { ShoppingCartIcon } from '~/components/Icons';
import { AnimatePresence, motion } from 'framer-motion';
import { CouponIcon, CloseIcon } from '~/components/Icons';

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [addressSaved, setAddressSaved] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [headerHeight, setHeaderHeight] = useState(null);
    const [orderInfo, setOrderInfo] = useState(null);
    const [isCheckout, setIsCheckout] = useState(false);

    // discount price
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    const { user, COD } = useSelector((state) => ({ ...state }));
    const couponTrueOrFalse = useSelector((state) => state.coupon);

    useEffect(() => {
        getUserCart(user?.token).then((res) => {
            // console.log("user cart res", JSON.stringify(res.data, null, 4));
            setProducts(res.data.products);
            setTotal(res.data.cartTotal);
        });
    }, []);

    const saveAddressToDb = () => {
        // console.log(address);
        saveUserAddress(user?.token, address).then((res) => {
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success('Address saved');
            }
        });
    };

    const applyDiscountCoupon = () => {
        // console.log('send coupon to backend', coupon);
        applyCoupon(user?.token, coupon).then((res) => {
            if (res.data) {
                setTotalAfterDiscount(res.data);
                // update redux coupon applied true/false
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: true,
                });
            }
            // error
            if (res.data.err) {
                setDiscountError(res.data.err);
                // toast.error(res.data.err);

                // update redux coupon applied true/false
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: false,
                });
            }
        });
    };

    const createCashOrder = () => {
        createCashOrderForUser(user?.token, COD, couponTrueOrFalse).then((res) => {
            // console.log('USER CASH ORDER CREATED RES ', res);
            // empty cart form redux, local Storage, reset coupon, reset COD, redirect
            if (res.data.ok) {
                // empty local storage
                if (typeof window !== 'undefined') localStorage.removeItem('cart');
                // empty redux cart
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: [],
                });
                // empty redux coupon
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: false,
                });
                // empty redux COD
                dispatch({
                    type: 'COD',
                    payload: false,
                });
                // mepty cart from backend
                emptyUserCart(user?.token);

                // redirect
                // setTimeout(async () => {
                getUserOrders(user.token).then((res) => setOrderInfo(res.data[res.data.length - 1]));
                setIsOpenDialog(true);
                // }, 1000);
            }
        });
    };

    useEffect(() => {
        const headerHeight = document.getElementById('header')?.offsetHeight;
        setHeaderHeight(headerHeight);
    }, []);

    useEffect(() => {
        const cartIconCheckout = document.getElementById('cart-checkout');
        const labelBtnCheckout = document.getElementById('label-checkout');
        const labelSuccessCheckout = document.getElementById('label-success');
        const buttonCheckout = document.getElementById('btn');

        return () => {
            setTimeout(() => {
                cartIconCheckout?.classList.remove('animate-rollOut');
                labelBtnCheckout?.classList.remove('animate-slideUpFade');
                labelSuccessCheckout?.classList.remove('animate-slideInFade');
                buttonCheckout?.classList.remove('animate-changeColor');

                setIsCheckout(false);
            }, 3000);
        };
    }, [isCheckout]);

    return (
        <div className="grid grid-cols-12 grid-flow-row px-40 pt-28 gap-x-6">
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
            <div className="flex flex-col space-y-12 col-span-7 text-light-on-surface">
                {/* Address Container */}
                <div>
                    <p className="text-2xl font-normal">Shipping Address</p>
                    <input
                        type="text"
                        className="w-1/2 focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                        label="Address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Typography
                        variant="small"
                        className="mt-2 flex items-center text-xs gap-1 font-normal text-light-on-surface"
                    >
                        Please enter your address details
                    </Typography>
                </div>
                {/* Product Container */}
                <div className="flex flex-col space-y-2">
                    <p className="text-2xl font-normal">Order Details</p>
                    <div className="flex flex-col space-y-2 divide-y divide-light-outline-variant">
                        {products.map((p, i) => {
                            const isFirst = i === 0;
                            const classes = isFirst ? undefined : 'pt-2';
                            return (
                                <div className={`flex items-center justify-between ${classes}`} key={i}>
                                    <p className="font-medium">{p.product.title}</p>
                                    <div className="flex flex-col items-end">
                                        <span className="text-base font-medium text-light-primary">
                                            {numeral(p.product.price).format('0,0')}
                                        </span>
                                        <span>x{p.count}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={`col-span-5 sticky z-49 mt-4 top-[${headerHeight + 16}px]`}>
                <div
                    className={`flex flex-col space-y-8 p-6 rounded-xl bg-light-surface-container-medium text-light-on-surface`}
                >
                    <span className="text-xl">Order Summary</span>
                    <div className="flex items-center justify-between">
                        <span>
                            Subtotal <b>({products?.length}</b> items)
                        </span>
                        <span className="font-bold">{numeral(total).format('0,0')} VND</span>
                    </div>

                    <div>
                        <AnimatePresence mode="wait">
                            {totalAfterDiscount <= 0 && (
                                <motion.div
                                    initial={{ opacity: 0, transform: 'translateX((-200px)' }}
                                    animate={{ opacity: 1, transform: 'translateX(0)' }}
                                    exit={{ opacity: 0, transform: 'translateX(-200px)' }}
                                    className="flex items-center justify-between space-x-2"
                                >
                                    <input
                                        onChange={(e) => {
                                            setCoupon(e.target.value.trim());
                                            setDiscountError('');
                                        }}
                                        value={coupon || ''}
                                        type="text"
                                        className="w-[50%] h-11 focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                                        placeholder="Enter promotion code"
                                    />
                                    <Button
                                        onClick={applyDiscountCoupon}
                                        variant="outlined"
                                        disabled={coupon ? false : true}
                                        className="text-light-tertiary border !border-light-tertiary outline-none hover:bg-light-tertiary/8 rounded-full focus:"
                                    >
                                        Apply
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            {totalAfterDiscount > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, transform: 'translateX((200px)' }}
                                    animate={{ opacity: 1, transform: 'translateX(0)' }}
                                    exit={{ opacity: 0, transform: 'translateX(200px)' }}
                                    className="flex items-center justify-between bg-light-tertiary-container text-light-on-tertiary-container p-2 rounded-lg"
                                >
                                    <div className="flex items-center space-x-2">
                                        <CouponIcon className="!text-light-on-tertiary-container" />
                                        <p className="uppercase">{coupon}</p>
                                    </div>
                                    <IconButton
                                        variant="text"
                                        className="hover:bg-light-tertiary-container/8 rounded-full"
                                        onClick={() => {
                                            dispatch({
                                                type: 'COUPON_APPLIED',
                                                payload: false,
                                            });
                                            setCoupon('');
                                            setTotalAfterDiscount(0);
                                        }}
                                    >
                                        <CloseIcon className="!text-light-on-tertiary-container" />
                                    </IconButton>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {discountError && (
                                <motion.p
                                    initial={{ opacity: 0, transform: 'translateY(-16px)' }}
                                    animate={{ opacity: 1, transform: 'translateY(0)' }}
                                    exit={{ opacity: 0, transform: 'translateY(-16px)' }}
                                    className="text-light-error"
                                >
                                    {discountError}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                    <hr style={{ background: '#ffffff' }} />
                    <div className="flex flex-col space-y-6">
                        <div className="flex items-center justify-between space-x-2">
                            <span className="text-base font-medium">Order Total</span>
                            {totalAfterDiscount > 0 ? (
                                <span className="font-bold text-base text-light-primary">
                                    {numeral(totalAfterDiscount).format('0,0')} VND
                                </span>
                            ) : (
                                <span className="text-base font-bold text-light-primary">
                                    {numeral(total).format('0,0')} VND
                                </span>
                            )}
                        </div>
                        {COD ? (
                            <Button
                                id="btn"
                                disabled={products.length > 0 && !!address.length > 0 ? false : true}
                                className="flex items-center justify-center space-x-2 rounded-full bg-light-primary text-light-on-primary mt-28"
                                onClick={() => {
                                    // setIsCheckout(true);
                                    const cartIconCheckout = document.getElementById('cart-checkout');
                                    const labelBtnCheckout = document.getElementById('label-checkout');
                                    const labelSuccessCheckout = document.getElementById('label-success');
                                    const buttonCheckout = document.getElementById('btn');

                                    cartIconCheckout?.classList.add('animate-rollOut');
                                    labelBtnCheckout?.classList.add('animate-slideUpFade');
                                    labelSuccessCheckout?.classList.add('animate-slideInFade');
                                    buttonCheckout?.classList.add('animate-changeColor');

                                    setIsCheckout(true);
                                    setTimeout(() => {
                                        createCashOrder();
                                    }, 1500);
                                }}
                            >
                                <svg
                                    id="cart-checkout"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    width="27"
                                    viewBox="0 0 576 512"
                                >
                                    <path
                                        fill="#ffffff"
                                        d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                                    />
                                </svg>
                                <p id="label-checkout">Place Order</p>
                                <p id="label-success" className="opacity-0 translate-y-4 absolute left-[50% -12px]">
                                    Order Success
                                </p>
                            </Button>
                        ) : (
                            <Button
                                className="rounded-full bg-light-primary text-light-on-primary"
                                disabled={products.length > 0 && !!address.length > 0 ? false : true}
                                onClick={() => {
                                    saveAddressToDb();
                                    history.push('/payment');
                                }}
                            >
                                Check out with Stripe
                            </Button>
                        )}
                    </div>
                    <Typography className="text-xs font-normal text-light-on-surface text-pretty">
                        By placing your order, you agree to 2HS’s <b className="underline">privacy notice</b> and{' '}
                        <b className="underline">conditions of use</b>.
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default transition(Checkout);

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserCart, emptyUserCart, saveUserAddress, applyCoupon, createCashOrderForUser } from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';
import Typography from 'antd/lib/typography/Typography';
import numeral from 'numeral';
import { Button, ButtonGroup } from '@material-tailwind/react';

const Checkout = () => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [headerHeight, setHeaderHeight] = useState(null);

    // discount price
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    // const [discountError, setDiscountError] = useState('');

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

    const emptyCart = () => {
        // remove from local storage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('cart');
        }
        // remove from redux
        dispatch({
            type: 'ADD_TO_CART',
            payload: [],
        });
        // remove from backend
        emptyUserCart(user?.token).then((res) => {
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0);
            setCoupon('');
            toast.success('Cart is empty. Continue shopping.');
        });
    };

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
            // console.log('RES ON COUPON APPLIED', res.data);
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
                toast.error(res.data.err);
                // update redux coupon applied true/false
                dispatch({
                    type: 'COUPON_APPLIED',
                    payload: false,
                });
            }
        });
    };

    const showAddress = () => (
        <>
            <ReactQuill theme="snow" value={address} onChange={setAddress} />
        </>
    );

    const showProductSummary = () =>
        products.map((p, i) => (
            <div key={i}>
                <p>
                    {p.product.title} x {p.count} = {p.product.price * p.count}
                </p>
            </div>
        ));

    const showApplyCoupon = () => (
        <>
            <input
                onChange={(e) => {
                    setCoupon(e.target.value);
                    // setDiscountError('');
                }}
                value={coupon}
                type="text"
                className="form-control"
            />
            <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
                Apply
            </button>
        </>
    );

    const createCashOrder = () => {
        createCashOrderForUser(user?.token, COD, couponTrueOrFalse).then((res) => {
            console.log('USER CASH ORDER CREATED RES ', res);
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
                setTimeout(() => {
                    history.push('/user/history');
                }, 1000);
            }
        });
    };

    const pushToPayMent = () => {
        history.push('/payment');
    };
    console.log(products);

    useEffect(() => {
        const headerHeight = document.getElementById('header')?.offsetHeight;
        setHeaderHeight(headerHeight);
    }, []);

    return (
        <div className="grid grid-cols-12 grid-flow-row px-40 pt-28 gap-x-6">
            <div className="flex flex-col space-y-12 col-span-7 text-light-on-surface">
                {/* Address Container */}
                <div>
                    <p className="text-2xl font-normal">Shipping Address</p>
                    <input
                        type="text"
                        className="w-1/2 rounded-lg outline-none border border-light-outline py-2 px-3 text-light-on-surface"
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
                    className={`flex flex-col space-y-8 p-6 rounded-xl bg-light-tertiary-container text-light-on-tertiary-container`}
                >
                    <span className="text-xl">Order Summary</span>
                    <div className="flex items-center justify-between">
                        <span>Subtotal ({products?.length} items)</span>
                        <span className="font-bold">{numeral(total).format('0,0')} VND</span>
                    </div>
                    {/* {totalAfterDiscount > 0 && (
                        <div className="flex items-center justify-between">
                            <span>Discount</span>
                            <span className="font-bold">{numeral(totalAfterDiscount).format('0,0')} VND</span>
                        </div>
                    )} */}
                    <div className="flex items-center justify-between space-x-2">
                        <input
                            onChange={(e) => {
                                setCoupon(e.target.value);
                            }}
                            value={coupon || ''}
                            type="text"
                            className="w-[50%] rounded-lg outline-none border border-light-outline p-2 text-light-on-surface"
                            placeholder="Enter Promo Code"
                        />
                        <Button
                            disabled={coupon ? false : true}
                            className="bg-light-secondary text-light-on-secondary rounded-full"
                        >
                            Apply
                        </Button>
                    </div>
                    <hr style={{ background: '#ffffff' }} />
                    <div className="flex flex-col space-y-6">
                        <div className="flex items-center justify-between space-x-2">
                            <span className="text-base font-medium">Order Total</span>
                            {totalAfterDiscount > 0 ? (
                                <span className="font-bold">{numeral(totalAfterDiscount).format('0,0')} VND</span>
                            ) : (
                                <span className="text-base font-bold">{numeral(total).format('0,0')} VND</span>
                            )}
                        </div>
                        {COD ? (
                            <Button
                                className="rounded-full bg-light-primary text-light-on-primary"
                                disabled={products.length > 0 && !!address.length > 0 ? false : true}
                                onClick={() => {
                                    saveAddressToDb();
                                    createCashOrder();
                                }}
                            >
                                Place Order
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
                                Place Order
                            </Button>
                        )}
                    </div>
                    <Typography className="text-xs font-normal text-light-on-tertiary-container text-pretty">
                        By placing your order, you agree to 2HS’s <b className="underline">privacy notice</b> and{' '}
                        <b className="underline">conditions of use</b>.
                    </Typography>
                </div>
            </div>
        </div>
        // <div className="row">
        //     <div className="col-md-6">
        //         <h4>Delivery Address</h4>
        //         <br />
        //         <br />
        //         {showAddress()}
        //         <hr />
        //         <h4>Got Coupon?</h4>
        //         <br />
        //         {showApplyCoupon()}
        //         <br />
        //         {discountError && <p className="bg-danger p-2">{discountError}</p>}
        //     </div>

        //     <div className="col-md-6">
        //         <h4>Order Summary</h4>
        //         <hr />
        //         <p>Products {products.length}</p>
        //         <hr />
        //         {showProductSummary()}
        //         <hr />
        //         <p>Cart Total: {total}</p>

        //         {totalAfterDiscount > 0 && (
        //             <p className="bg-success p-2">Discount Applied: Total Payable: {totalAfterDiscount} VND</p>
        //         )}

        //         <div className="row">
        //             <div className="col-md-6">
        //                 {COD ? (
        //                     <button
        //                         className="btn btn-primary"
        //                         disabled={!products.length || !address.length}
        //                         onClick={() => {
        //                             saveAddressToDb();
        //                             createCashOrder();
        //                         }}
        //                     >
        //                         Place Order
        //                     </button>
        //                 ) : (
        //                     <button
        //                         className="btn btn-primary"
        //                         disabled={!products.length || !address.length}
        //                         onClick={() => {
        //                             saveAddressToDb();
        //                             history.push('/payment');
        //                         }}
        //                     >
        //                         Place Order
        //                     </button>
        //                 )}
        //             </div>

        //             <div className="col-md-6">
        //                 <button disabled={!products.length} onClick={emptyCart} className="btn btn-primary">
        //                     Empty Cart
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Checkout;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';
import config from '~/config';
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react';
import numeral from 'numeral';
import { useEffect } from 'react';
import transition from '~/utils/transition';
import StickyHeader from '~/components/StickyHeader';

const Cart = () => {
    const [headerHeight, setHeaderHeight] = useState(null);
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [outOfStockItems, setOutOfStockItems] = useState([]);
    const [availableItems, setAvailableItems] = useState([]);

    const handleOpen = () => setIsOpenDialog(!isOpenDialog);

    const history = useHistory();
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const saveOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        dispatch({
            type: 'COD',
            payload: false,
        });
        userCart(cart, user.token)
            .then((res) => {
                // console.log('CART POST RES', res);
                if (res.data.ok) history.push('/checkout');
                else if (res.data.isSomeItemsOutOfStock) {
                    setAvailableItems(res.data.availableItems);
                    setOutOfStockItems(res.data.outOfStockItems);
                    setIsOpenDialog(true);
                }
            })
            .catch((err) => console.log('cart save err', err));
    };

    const saveCashOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        dispatch({
            type: 'COD',
            payload: true,
        });
        userCart(cart, user.token)
            .then((res) => {
                // console.log('CART POST RES', res);
                if (res.data.ok) history.push('/checkout');
                else if (res.data.isSomeItemsOutOfStock) {
                    setAvailableItems(res.data.availableItems);
                    setOutOfStockItems(res.data.outOfStockItems);
                    setIsOpenDialog(true);
                }
            })
            .catch((err) => console.log('cart save err', err));
    };

    function removeFromCart() {
        outOfStockItems.forEach((item) => {
            dispatch({ type: 'REMOVE_FROM_CART', payload: { _id: item.product } });
        });
    }
    const handleProceedWithAvailableItems = async () => {
        removeFromCart().then(() => {
            userCart(cart, user.token)
                .then((res) => {
                    // console.log('CART POST RES', res);
                    if (res.data.ok) history.push('/checkout');
                    else if (res.data.isSomeItemsOutOfStock) {
                        setAvailableItems(res.data.availableItems);
                        setOutOfStockItems(res.data.outOfStockItems);
                        setIsOpenDialog(true);
                    }
                })
                .catch((err) => console.log('cart save err', err));
        });

        setIsOpenDialog(false);
    };

    useEffect(() => {
        const headerHeight = document.getElementById('header')?.offsetHeight;
        setHeaderHeight(headerHeight);
    }, []);
    const showCartItems = () => (
        <Card className={`h-full w-full overflow-y-scroll`}>
            <table className="table table-auto table-bordered">
                <thead className="thead-light text-center">
                    <tr>
                        <th scope="col" className="!bg-light-surface-container-lowest">
                            <Typography
                                variant="small"
                                className="font-normal leading-none opacity-70 text-light-on-surface"
                            >
                                Image
                            </Typography>
                        </th>
                        <th scope="col" className="!bg-light-surface-container-lowest">
                            <Typography
                                variant="small"
                                className="font-normal leading-none opacity-70 text-light-on-surface"
                            >
                                Title
                            </Typography>
                        </th>
                        <th scope="col" className="!bg-light-surface-container-lowest">
                            <Typography
                                variant="small"
                                className="font-normal leading-none opacity-70 text-light-on-surface"
                            >
                                Price
                            </Typography>
                        </th>
                        <th scope="col" className="!bg-light-surface-container-lowest">
                            <Typography
                                variant="small"
                                className="font-normal leading-none opacity-70 text-light-on-surface"
                            >
                                Brand
                            </Typography>
                        </th>
                        <th scope="col" className="!bg-light-surface-container-lowest">
                            <Typography
                                variant="small"
                                className="font-normal leading-none opacity-70 text-light-on-surface"
                            >
                                Size
                            </Typography>
                        </th>
                        <th scope="col" className="!bg-light-surface-container-lowest">
                            <Typography
                                variant="small"
                                className="font-normal leading-none opacity-70 text-light-on-surface"
                            >
                                Quantity
                            </Typography>
                        </th>
                        <th scope="col" className="!bg-light-surface-container-lowest">
                            <Typography
                                variant="small"
                                className="font-normal leading-none opacity-70 text-light-on-surface"
                            >
                                Remove
                            </Typography>
                        </th>
                    </tr>
                </thead>

                {cart.map((p) => (
                    <ProductCardInCheckout key={p._id} p={p} />
                ))}
            </table>
        </Card>
    );

    return (
        <>
            <StickyHeader />
            <div className="grid grid-cols-12 px-40 pt-28 gap-x-6">
                <div className="col-span-8">
                    <Typography className="text-light-on-background font-normal ">
                        Cart / <span className="text-light-primary font-medium">{cart.length}</span> Product
                    </Typography>

                    {cart.length === 0 ? (
                        <Typography className="text-center translate-y-4 text-light-on-background ">
                            No products in cart.{' '}
                            <Link
                                to={config.routes.shop}
                                className="opacity-80 hover:opacity-100 transition-opacity hover:text-light-primary underline hover:no-underline"
                            >
                                Continue Shopping.
                            </Link>
                        </Typography>
                    ) : (
                        showCartItems()
                    )}
                </div>
                <div
                    className={`sticky z-49 flex-col space-y-5 col-span-4 rounded-xl divide-y divide-light-outline-variant bg-light-surface-container-medium p-6 mt-6 top-[${headerHeight + 16}px] h-fit`}
                >
                    <div className="flex-col">
                        <div className="w-full inline-flex items-center justify-between text-light-on-surface">
                            <Typography className="font-medium">Subtotal ({cart.length})</Typography>
                            <b>{numeral(getTotal()).format('0,0')} VND</b>
                        </div>
                        <Typography variant="small" className="text-light-on-surface-variant">
                            (excluding delivery)
                        </Typography>
                    </div>
                    {user ? (
                        <div className="flex flex-col space-y-4 pt-2">
                            <Button
                                onClick={saveOrderToDb}
                                variant="text"
                                className="hidden lg:inline-block rounded-full  hover:bg-light-primary/8"
                                disabled={!cart.length}
                            >
                                <span className="text-light-primary">Pay with Stripe</span>
                            </Button>
                            <Button
                                onClick={saveCashOrderToDb}
                                variant="filled"
                                className="hidden lg:inline-block rounded-full bg-light-primary "
                                disabled={!cart.length}
                            >
                                <span className="text-light-on-primary">Pay Cash on Delivery</span>
                            </Button>
                        </div>
                    ) : (
                        <div className="pt-2">
                            <Link
                                to={{
                                    pathname: '/login',
                                    state: { from: 'cart' },
                                }}
                            >
                                <Button ripple fullWidth variant="filled" className="rounded-full bg-light-primary">
                                    <span className="text-on-light-primary font-bold">Login to Checkout</span>
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <Dialog open={isOpenDialog} handler={handleOpen}>
                <DialogHeader className="text-light-on-surface flex items-center space-x-2">Some items are out of stock</DialogHeader>
                <DialogBody className='text-light-on-surface'>
                    <ol className='flex flex-col space-y-2'>
                        {outOfStockItems.map((item) => (
                            <li key={item._id} className='text-light-on-surface font-medium text-xl list-item'>{item.title}</li>
                        ))}
                    </ol>
                    <p className='text-light-on-surface-variant'>not enough quantity to proceed with payment</p>
                </DialogBody>
                <DialogFooter>
                    {/* {availableItems.length > 0 ? (
                        <>
                            <Button
                                onClick={() => setIsOpenDialog(false)}
                                variant="text"
                                className="rounded-full text-light-primary hover:bg-light-primary/8 transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleProceedWithAvailableItems}
                                className="rounded-full bg-light-primary text-light-on-primary"
                            >
                                Proceed with Available Items
                            </Button>
                        </>
                    ) : ( */}
                    <Button
                        onClick={() => setIsOpenDialog(false)}
                        className="rounded-full bg-light-primary text-light-on-primary"
                    >
                        Got it!
                    </Button>
                    {/* )} */}
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default transition(Cart);
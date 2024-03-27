import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';
import config from '~/config';
import { Button, Typography } from '@material-tailwind/react';
const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    console.log(cart);
    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const saveOrderToDb = () => {
        // console.log("cart", JSON.stringify(cart, null, 4));
        userCart(cart, user.token)
            .then((res) => {
                console.log('CART POST RES', res);
                if (res.data.ok) history.push('/checkout');
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
                console.log('CART POST RES', res);
                if (res.data.ok) history.push('/checkout');
            })
            .catch((err) => console.log('cart save err', err));
    };

    const showCartItems = () => (
        <table className="table table-bordered">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Size</th>
                    <th scope="col">Count</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>

            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} p={p} />
            ))}
        </table>
    );

    return (
        <div className="grid grid-cols-12 px-40 pt-2 gap-x-6">
            <div className="col-span-8">
                <Typography className="text-light-on-background ">
                    Cart / <span className="text-light-primary">{cart.length}</span> Product
                </Typography>

                {!cart.length ? (
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
                {showCartItems()}
            </div>
            <div className="flex-col space-y-5 col-span-4 rounded-xl bg-light-surface-container-medium p-6">
                <div className="flex-col">
                    <div className="w-full inline-flex items-center justify-between text-light-on-surface">
                        <Typography className="font-medium">Subtotal ({cart.length})</Typography>
                        <b>{getTotal()} VND</b>
                    </div>
                    <Typography variant="small" className="text-light-on-surface-variant">
                        (excluding delivery)
                    </Typography>
                </div>
                {!user ? (
                    <div className="flex divide-y divide-light-outline-variant">
                        <Button
                            onClick={saveOrderToDb}
                            variant="outlined"
                            className="hidden lg:inline-block rounded-full border-light-outline hover:bg-light-primary/8"
                            disabled={!cart.length}
                        >
                            <span className="text-light-primary">Pay with Credit/Debit Card</span>
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
                    <div>
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
            <br />
        </div>
    );
};

export default Cart;

import React from 'react';
import ModalImage from 'react-modal-image';
import unknown from '../../images/unknown.jpg';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import numeral from 'numeral';
import { IconButton } from '@material-tailwind/react';
import { CloseIcon } from '~/components/Icons';

const ProductCardInCheckout = ({ p }) => {
    const sizes = ['36', '37', '38', '39', '40', '41', '42', '42.5', '43', '44', '40.5', '41.5', '43.5'];

    const dispatch = useDispatch();

    const handleSizeChange = (e) => {
        console.log('size changed', e.target.value);

        let cart = [];
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.forEach((product, i) => {
                if (product._id === p._id) {
                    cart[i].size = e.target.value;
                }
            });

            //   console.log("cart updated size", cart);
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            });
        }
    };

    const handleQuantityChange = (e) => {
        // console.log("available quantity", p.quantity);

        let count = e.target.value < 1 ? 1 : e.target.value;

        if (count > p.quantity) {
            toast.error(`Max available quantity: ${p.quantity}`);
            return;
        }

        let cart = [];

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }

            cart.forEach((product, i) => {
                if (product._id === p._id) {
                    cart[i].count = count;
                }
            });

            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type: 'ADD_TO_CART',
                payload: cart,
            });
        }
    };

    const handleRemove = () => {
        const confirmed = window.confirm('Are you sure you want to delete product?');
        let cart = [];
        if (confirmed) {
            if (typeof window !== 'undefined') {
                if (localStorage.getItem('cart')) {
                    cart = JSON.parse(localStorage.getItem('cart'));
                }

                cart.forEach((product, i) => {
                    if (product._id === p._id) {
                        cart.splice(i, 1);
                    }
                });

                localStorage.setItem('cart', JSON.stringify(cart));
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: cart,
                });
            }
        }
    };

    return (
        <tbody>
            <tr>
                <td className='bg-light-tertiary-container/50'>
                    <div style={{ width: '100px', heigh: 'auto' }}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url} large={p.images[0].url} className="object-cover rounded-lg" />
                        ) : (
                            <ModalImage small={unknown} large={unknown} className='object-cover rounded-lg'/>
                        )}
                    </div>
                </td>
                <td className='text-light-on-surface'>{p.title}</td>
                <td className='bg-light-tertiary-container/50 text-light-on-primary-container'>{numeral(p.price).format('0,0')} VND</td>
                <td className='text-light-on-surface'>{p.brand}</td>
                <td className="min-w-28 bg-light-tertiary-container/50">
                    <select
                        onChange={handleSizeChange}
                        name="size"
                        className="form-control focus:border-light-on-tertiary-container focus:shadow focus:shadow-light-on-tertiary-container focus:outline-none "
                    >
                        {p.size ? (
                            <option  value={p.size}>
                                {p.size}
                            </option>
                        ) : (
                            <option>Select</option>
                        )}
                        {sizes
                            .filter((s) => s !== p.size)
                            .map((s) => (
                                <option  key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                    </select>
                </td>
                <td className="text-center max-w-[100px] bg-light-tertiary-container/50">
                    <input
                        type="number"
                        className="form-control-plaintext border-none outline-none bg-light-on-tertiary-container text-light-on-surface rounded-lg p-2"
                        value={p.count}
                        onChange={handleQuantityChange}
                    />
                </td>
                <td className="text-center">
                    <IconButton onClick={handleRemove} variant="text" className="hover:bg-light-primary/8 rounded-full">
                        <CloseIcon  />
                    </IconButton>
                </td>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;

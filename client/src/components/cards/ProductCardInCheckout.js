import React, { useState } from 'react';
import ModalImage from 'react-modal-image';
import unknown from '../../images/unknown.jpg';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import numeral from 'numeral';
import { Button, Dialog, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react';
import { CloseIcon } from '~/components/Icons';
import { Link } from 'react-router-dom';

const ProductCardInCheckout = ({ p }) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const handleOpen = () => setIsOpenDialog(!isOpenDialog);
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
        let cart = [];
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
    };

    return (
        <tbody className="text-center">
            <tr>
                <td className="bg-light-tertiary-container/50 w-[20%] h-full" style={{ verticalAlign: 'middle' }}>
                    <div className="w-full m-auto">
                        {p.images.length ? (
                            <ModalImage
                                small={p.images[0].url}
                                large={p.images[0].url}
                                className="w-full h-full !max-h-[100px] object-cover rounded-lg"
                            />
                        ) : (
                            <ModalImage small={unknown} large={unknown} className="object-cover rounded-lg" />
                        )}
                    </div>
                </td>
                <td className="text-light-on-surface w-[20%]" style={{ verticalAlign: 'middle' }}>
                    <Link to={`/product/${p.slug}`} className='hover:text-light-primary'>
                    {p.title}
                    </Link>
                </td>
                <td
                    className="bg-light-tertiary-container/50 text-light-on-primary-container w-[10%]"
                    style={{ verticalAlign: 'middle' }}
                >
                    {numeral(p.price).format('0,0')} VND
                </td>
                <td className="text-light-on-surface w-[10%]" style={{ verticalAlign: 'middle' }}>
                    {p.brand}
                </td>
                <td className="bg-light-tertiary-container/50 w-[15%]" style={{ verticalAlign: 'middle' }}>
                    <select
                        onChange={handleSizeChange}
                        name="size"
                        className="form-control focus:border-light-on-tertiary-container focus:shadow focus:shadow-light-on-tertiary-container focus:outline-none "
                    >
                        {p.size ? <option value={p.size}>{p.size}</option> : <option>Select</option>}
                        {sizes
                            .filter((s) => s !== p.size)
                            .map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                    </select>
                </td>
                <td
                    className="text-center max-w-[100px] bg-light-tertiary-container/50 w-[15%]"
                    style={{ verticalAlign: 'middle' }}
                >
                    <input
                        type="number"
                        className="form-control-plaintext border-none outline-none bg-light-on-tertiary-container text-light-on-surface rounded-lg p-2"
                        value={p.count}
                        onChange={handleQuantityChange}
                    />
                </td>
                <td className="text-center w-[10%]" style={{ verticalAlign: 'middle' }}>
                    <IconButton onClick={handleOpen} variant="text" className="hover:bg-light-primary/8 rounded-full">
                        <CloseIcon className="text-light-primary" />
                    </IconButton>
                </td>
                <Dialog size="sm" handler={handleOpen} open={isOpenDialog}>
                    <DialogHeader className="text-light-on-surface flex items-center space-x-2">
                        Delete selected product?
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="text"
                            className="text-light-primary hover:bg-light-primary/8 mr-2 rounded-full"
                            onClick={() => {
                                handleOpen();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-light-primary text-light-on-primary rounded-full"
                            onClick={() => {
                                handleOpen();
                                handleRemove();
                            }}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </Dialog>
            </tr>
        </tbody>
    );
};

export default ProductCardInCheckout;

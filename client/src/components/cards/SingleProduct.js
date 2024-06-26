import React, { useState } from 'react';
import { Card } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import unknown from '../../images/unknown.jpg';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { addToWishlist } from '../../functions/user';

import config from '~/config';
import { Button } from '@material-tailwind/react';


//children component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
    const { _id, title, images, description } = product;
    const [tooltip, setTooltip] = useState('Click to add');

    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    let history = useHistory();

    const handleAddToCart = () => {
        //create cart array
        let cart = [];
        if (typeof window !== 'undefined') {
            //if cart is in local storage, GET
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            //push new products to cart
            cart.push({
                ...product,
                count: 1,
            });
            //remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            //save to localstorage
            localStorage.setItem('cart', JSON.stringify(unique));

            //show Tooltip
            setTooltip('Added!');

            //add to redux state
            dispatch({
                type: 'ADD_TO_CART',
                payload: unique,
            });

            //show cart item in side drawer
            dispatch({
                type: 'SET_VISIBLE',
                payload: true,
            });
        }
    };

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        if (user && user.token) {
            addToWishlist(product?._id, user.token).then((res) => {
                // console.log('ADDED TO WISHLIST', res.data);
                toast.success('Added to wishlist');
                history.push(config.routes.wishList);
            });
        } else {
            toast.error('Please log in first.');
            history.push('/login');
        }
    };

    return (
        <>
            <div className="grid grid-cols-12 grid-flow-row gap-4">
                <div className="col-span-7">
                    {images && images.length ? (
                        <Carousel showArrows={true} autoPlay infiniteLoop>
                            {images &&
                                images.map((i) => (
                                    <img
                                        src={i.url}
                                        key={i.public_id}
                                        alt={title}
                                        className="object-cover w-full rounded-lg"
                                    />
                                ))}
                        </Carousel>
                    ) : (
                        <Card cover={<img src={unknown} className="mb-3 card-image" alt="fallback" />}></Card>
                    )}

                  
                </div>

                <div className="col-span-5 text-light-on-surface">
                    <h1 className="text-2xl font-medium">{title}</h1>

                    {product && product.ratings && product.ratings.length > 0 ? (
                        showAverage(product)
                    ) : (
                        <div className="text-center pt-1 pb-3 text-base">No ratings yet</div>
                    )}

                    <Card
                        className="rounded-lg border "
                        actions={[
                            <Button
                                // fullWidth
                                onClick={handleAddToCart}
                                className="text-light-on-primary bg-light-primary rounded-lg "
                            >
                                <ShoppingCartOutlined className="text-light-on-primary" /> <br /> Add To Cart
                            </Button>,
                            <Button variant="outlined" onClick={handleAddToWishlist} className="text-light-primary border-light-primary hover:bg-light-primary/8">
                                <HeartOutlined className="text-light-primary rounded-lg" /> <br /> Add to Wishlist
                            </Button>,
                            <RatingModal>
                                <StarRating
                                    name={_id}
                                    numberOfStars={5}
                                    rating={star}
                                    changeRating={onStarClick}
                                    isSelectable={true}
                                    starRatedColor="gold"
                                />
                            </RatingModal>,
                        ]}
                    >
                        <ProductListItems product={product} />
                    </Card>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;

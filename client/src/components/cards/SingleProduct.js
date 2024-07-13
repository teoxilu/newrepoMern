import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'antd';
import { HeartOutlined, ShoppingCartOutlined, HeartFilled } from '@ant-design/icons';
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
import { addToWishlist, getWishlist, removeWishlist } from '../../functions/user';

import config from '~/config';
import { Button } from '@material-tailwind/react';

//children component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
    const { user, cart } = useSelector((state) => ({ ...state }));

    const [userWishList, setUserWishList] = useState(() => {
        let result = [];
        getWishlist(user?.token).then((res) => {
            result.push(res.data.wishlist);
        });
        return result;
    });
    const [isAddToWishList, setIsAddToWishList] = useState(false);

    const { _id, title, images, description, slug, price } = product;

    const addWishListRef = useRef();
    const removeWishListRef = useRef();

    //redux
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

    var result = [];
    console.log(typeof result);
    const isProductInWishList = () => {
        const result = userWishList.find((wishlist) => {
            return wishlist._id === product._id;
        });
        setIsAddToWishList(result === undefined ? false : true);
    };

    const loadWishlist = () =>
        getWishlist(user?.token).then((res) => {
            setUserWishList(res.data.wishlist);
        });

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        if (user && user?.token) {
            addToWishlist(product?._id, user?.token).then(() => {
                loadWishlist();
                toast.success('Added to wishlist');
                addWishListRef.current.blur();
            });
        } else {
            toast.error('Please log in first.');
            history.push('/login');
        }
    };

    const handleRemove = (productId) => {
        removeWishlist(productId, user.token).then(() => {
            loadWishlist();
            toast.success('Removed item from wishlist successfully');
            removeWishListRef.current.blur();
        });
    };

    useEffect(() => {
        loadWishlist();
    }, []);

    useEffect(() => {
        isProductInWishList();
    }, [userWishList]);

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
                                        className="object-cover w-full max-h-[480px] h-auto rounded-lg"
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
                                onClick={handleAddToCart}
                                disabled={product.quantity < 1}
                                className="text-light-on-primary bg-light-primary rounded-lg "
                            >
                                {product.quantity < 1 ? (
                                    <div>
                                        <ShoppingCartOutlined className="text-light-on-primary" /> <br /> Out of stock
                                    </div>
                                ) : (
                                    <div>
                                        <ShoppingCartOutlined className="text-light-on-primary" /> <br /> Add To Cart
                                    </div>
                                )}
                            </Button>,
                            isAddToWishList ? (
                                <Button
                                    ref={removeWishListRef}
                                    variant="outlined"
                                    ripple
                                    onClick={() => handleRemove(product._id)}
                                    className="*:text-light-primary border-light-primary focus:outline-none focus:ring-light-primary bg-light-primary/8 hover:bg-light-primary *:hover:text-light-on-primary"
                                >
                                    <HeartFilled className="rounded-lg" />
                                    <br /> <p>Remove</p>
                                </Button>
                            ) : (
                                <Button
                                    ref={addWishListRef}
                                    variant="outlined"
                                    ripple
                                    onClick={handleAddToWishlist}
                                    className="*:text-light-primary border-light-primary focus:outline-none focus:ring-light-primary hover:bg-light-primary/8"
                                >
                                    <HeartOutlined className="rounded-lg" /> <br /> <p>Add to Wishlist</p>
                                </Button>
                            ),
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

import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';

import { getProduct, productStar, getRelated } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

const { TabPane } = Tabs;

const Product = () => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const [related, setRelated] = useState([]);
    //redux
    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = useParams();

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString());
            existingRatingObject && setStar(existingRatingObject.star); //current user's star
        }
    },[product.ratings,user]);

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);

            //load related
            getRelated(res.data._id).then((res) => setRelated(res.data));
        });
    };

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        // console.table(newRating, name);
        productStar(name, newRating, user.token).then((res) => {
            console.log('rating clicked', res.data);
            loadSingleProduct();
        });
    };

    return (
        <div className="pt-28 px-4 text-light-on-surface">
            <div className="row">
                <SingleProduct product={product} onStarClick={onStarClick} star={star} />
            </div>

            <div className="row w-full py-5">
                <Tabs type="card" className="w-full" >
                    <TabPane tab="Description" key="1">
                        {product.description && product.description}
                    </TabPane>

                    <TabPane tab="More" key="2">
                        Reach us at xxx-xxxx-xxx to learn more about this product.
                    </TabPane>
                </Tabs>
            </div>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <Typography className="w-full py-4 text-center text-[32px] leading-10 bg-gradient-to-r from-light-secondary via-light-primary to-light-tertiary text-light-on-primary-container ">
                        Related Products
                    </Typography>
                </div>
            </div>
            <div className="row pb-5">
                {related.length ? (
                    related.map((r) => (
                        <div key={r._id} className="col-md-4">
                            <ProductCard product={r} />
                        </div>
                    ))
                ) : (
                    <div className="text-center col text-base font-normal">No products found.</div>
                )}
            </div>
        </div>
    );
};

export default Product;

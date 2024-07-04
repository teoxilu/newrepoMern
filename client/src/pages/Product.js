import React, { useEffect, useState } from 'react';
// import { Tabs } from 'antd';

import { getProduct, productStar, getRelated } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { useParams } from 'react-router-dom';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader, Typography } from '@material-tailwind/react';
import transition from '~/utils/transition';

// const { TabPane } = Tabs;
const DATA_TAB = [
    {
        label: 'Description',
        value: 'description',
        desc: '',
    },
    {
        label: 'More',
        value: 'more',
        desc: 'Reach us at xxx-xxxx-xxx to learn more about this product.',
    },
];
const Product = () => {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const [related, setRelated] = useState([]);
    const [dataTab, setDataTab] = useState([]);
    const [activeTab, setActiveTab] = useState(() => DATA_TAB[0]?.value || 'description');
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
    }, [product.ratings, user]);

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data);

            setDataTab(() => {
                return DATA_TAB.map((tab) => {
                    return tab.value === 'description' ? { ...tab, desc: res.data?.description } : tab;
                });
            });

            //load related
            getRelated(res.data._id).then((res) => setRelated(res.data));
        });
    };

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        // console.table(newRating, name);
        productStar(name, newRating, user.token).then((res) => {
            // console.log('rating clicked', res.data);
            loadSingleProduct();
        });
    };

    return (
        <div className="pt-28 px-40 text-light-on-surface">
            <div className="row">
                <SingleProduct product={product} onStarClick={onStarClick} star={star} />
            </div>

            <Tabs value={activeTab} className="my-20">
                <TabsHeader
                    className="rounded-none border-b border-light-outline/50 bg-transparent p-0"
                    indicatorProps={{
                        className: 'bg-transparent border-b-2 border-light-outline shadow-none rounded-none',
                    }}
                >
                    {dataTab.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={
                                activeTab === value
                                    ? 'text-light-on-surface font-medium'
                                    : 'text-light-on-surface-variant'
                            }
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody
                    animate={{
                        initial: { y: 250 },
                        mount: { y: 0 },
                        unmount: { y: 250 },
                    }}
                >
                    {dataTab.map(({ value, desc }) => (
                        <TabPanel key={value} value={value} className="text-light-on-surface font-normal">
                            {desc}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>

            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <Typography className="mx-[-160px] font-normal py-4 text-center text-[32px] leading-10 bg-gradient-to-r from-light-secondary via-light-primary to-light-tertiary text-light-on-primary-container rounded-lg">
                        Related Products
                    </Typography>
                </div>
            </div>
            <div className="row">
                <div className="w-full grid gap-5 grid-flow-col">
                    {related.length ? (
                        related.map((r) => (
                            <div key={r._id}>
                                <ProductCard product={r} />
                            </div>
                        ))
                    ) : (
                        <Typography className="w-full text-center text-base font-normal m-auto">
                            No products found.
                        </Typography>
                    )}
                </div>
            </div>
        </div>
    );
};

export default transition(Product);

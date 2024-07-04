import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getProducts, getProductsCount } from '../../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { ConfigProvider, Pagination } from 'antd';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import CustomSlider from '~/components/Slider';
import images from '~/images';
import { Tab, Tabs, TabsHeader, Typography } from '@material-tailwind/react';
import { FireIcon, HeartIcon, BestIcon, TopPickIcon } from '~/components/Icons';

const categorySections = [
    {
        id: 1,
        img: images.advertisingShoe,
        title: 'Hot trend',
        icon: <FireIcon />,
        bgColor: 'bg-light-surface-container-high',
        textColor: {
            fromColor: {
                color: '#6F0D0D',
                position: '0%',
            },
            viaColor: { color: '#D39467', position: '50%' },
            toColor: { color: '#6C1919', position: '100%' },
        },
    },
    {
        id: 2,
        img: images.advertisingShoe2,
        title: 'Best Seller',
        icon: <BestIcon />,
        bgColor: 'bg-light-surface-container-highest',
        textColor: {
            fromColor: {
                color: '#3F4017',
                position: '0%',
            },
            viaColor: { color: '#d1d1b0', position: '50%' },
            toColor: { color: '#111104', position: '100%' },
        },
    },
    {
        id: 3,
        img: images.advertisingShoe3,
        title: 'Top Pick',
        icon: <TopPickIcon />,
        bgColor: 'bg-light-surface-container-medium',
        textColor: {
            fromColor: {
                color: '#8f0000',
                position: '0%',
            },
            viaColor: { color: '#a7382a', position: '50%' },
            toColor: { color: '#603f00', position: '100%' },
        },
    },
    {
        id: 4,
        img: images.advertisingShoe4,
        title: 'Best Rating',
        icon: <HeartIcon />,
        bgColor: 'bg-light-surface-container-low',
        textColor: {
            fromColor: {
                color: '#074E58',
                position: '0%',
            },
            viaColor: { color: '#464702', position: '50%' },
            toColor: { color: '#080707', position: '100%' },
        },
    },
];

const filterSection = {
    RATING: 'rating',
    BEST_SELLER: 'sold',
};
const CategoriesSection = () =>{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1);
    const [indexSection, setIndexSection] = useState(0);
    // const progress = useMotionValue(page - 1);

    const loadAllProducts = () => {
        var filter = filterSection.BEST_SELLER;

        setLoading(true);
        // sort, order, limit
        if (page === 4) filter = filterSection.RATING;
        getProducts(filter, 'desc', filter === filterSection.RATING ? 1 : page).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };

    useLayoutEffect(() => {
        setIndexSection(page - 1);
        loadAllProducts();
    }, [page]);

    useLayoutEffect(() => {
        const bg = document.querySelector('.App');
        bg.classList.add(`${categorySections[indexSection].bgColor}`);

        return () => {
            bg.classList.remove(`${categorySections[indexSection].bgColor}`);
        };
    }, [indexSection]);

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data));
    }, []);

    return (
        <LayoutGroup>
            <div className="flex items-center justify-between px-24">
                <AnimatePresence mode="wait">
                    <motion.Typography
                        key={categorySections[indexSection].id}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        layout
                        className="font-normal text-4xl text-light-on-surface transition-opacity"
                        style={{
                            color: `${categorySections[indexSection].textColor.fromColor.color}`,
                            backgroundImage: `-webkit-linear-gradient(0deg, ${categorySections[indexSection].textColor.fromColor.color} ${categorySections[indexSection].textColor.fromColor.position}, ${categorySections[indexSection].textColor.viaColor.color} ${categorySections[indexSection].textColor.viaColor.position}, ${categorySections[indexSection].textColor.toColor.color} ${categorySections[indexSection].textColor.toColor.position})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textFillColor: 'transparent',
                        }}
                    >
                        {categorySections[indexSection].title}
                    </motion.Typography>
                </AnimatePresence>

                {/* <Pagination
                    responsive
                    current={page}
                    total={Math.ceil((productsCount / 3) * 10)}
                    onChange={(value) => {
                        setPage(value);
                        // setIndexSection(page - 1);
                    }}
                /> */}
                <Tabs value={categorySections[0].id}>
                    <TabsHeader
                        className="flex items-center space-x-2 bg-transparent rounded-none border-b border-light-outline-variant p-0"
                        indicatorProps={{
                            className: 'bg-transparent border-b-2 border-light-primary shadow-none rounded-none',
                        }}
                    >
                        {categorySections.map((category) => (
                            <Tab
                                key={category.id}
                                value={category.id}
                                onClick={() => setPage(category.id)}
                                className={`transition-colors
                                    ${page === category.id ? 'text-light-secondary' : 'text-light-on-surface-variant/80'}
                                    `}
                            >
                                <div className="flex items-center space-x-2">
                                    {category?.icon}
                                    <p className="whitespace-nowrap">{category.title}</p>
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </div>
            <div className="grid grid-cols-4 px-24 mt-4 w-full gap-2">
                <div className="col-span-3">
                    {loading ? (
                        <div className="flex items-center space-x-2 justify-evenly">
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </div>
                    ) : (
                        <CustomSlider>
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </CustomSlider>
                    )}
                </div>

                <div className="col-span-1 overflow-y-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={categorySections[indexSection].id}
                            src={categorySections[indexSection].img}
                            alt="Shoe"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            layout
                            className={`w-fit h-full object-cover rounded-lg transition-opacity`}
                        />
                    </AnimatePresence>
                </div>
            </div>
        </LayoutGroup>
    );
};

export default CategoriesSection;

import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import { getAllProducts } from '~/functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import CustomSlider from '~/components/Slider';
import { CustomLeftArrowIcon, CustomRightArrowIcon } from '~/components/Icons';
const customSettings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: true,
    focusOnSelect: true,
    className: 'center',
    centerMode: true,
    centerPadding: '0px',
    arrows: true,
    dots: true,
    prevArrow: <CustomLeftArrowIcon />,
    nextArrow: <CustomRightArrowIcon />,
};

function YouMayLikeSection() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const loadAllProducts = () => {
        setLoading(true);
        getAllProducts().then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };
    useEffect(() => {
        loadAllProducts();
    }, []);

    return (
        <div>
            <Typography className="font-normal text-4xl text-light-on-surface transition-opacity uppercase px-40">
                You may like
            </Typography>
            <div className="mt-4 px-40">
                {loading ? (
                    <div className="flex items-center space-x-2 justify-evenly">
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                    </div>
                ) : (
                    <CustomSlider customSettings={customSettings}>
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </CustomSlider>
                )}
            </div>
        </div>
    );
}

export default YouMayLikeSection;

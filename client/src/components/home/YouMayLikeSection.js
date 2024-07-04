import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

import CategoriesSection from './CategoriesSection';
import { getProductsCount, getProducts } from '~/functions/product';

function YouMayLikeSection() {
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(null);

    useEffect(() => {
        getProductsCount().then((res) => setProductCount(res));
    }, []);

    useEffect(() => {
        getProducts('ratings', 'desc', 1).then((res) => setProducts(res.data));
    }, [productCount]);

    return (
        <div>
            <Typography className="font-normal text-4xl text-light-on-surface transition-opacity uppercase text-center">
                You may like
            </Typography>
            <CategoriesSection />
        </div>
    );
}

export default YouMayLikeSection;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

import { getSub } from '../../functions/sub';
import ProductCard from '../../components/cards/ProductCard';
import transition from '~/utils/transition';
import StickyHeader from '~/components/StickyHeader';

const SubHome = () => {
    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = useParams();

    useEffect(() => {
        setLoading(true);
        getSub(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setSub(res.data.sub);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, []);

    return (
        <>
        <StickyHeader/>
            <div className="px-40 text-light-on-surface mt-28">
                <div className="row">
                    <div className="col text-center py-2">
                        {loading ? (
                            <Typography className="mx-[-160px] py-4 text-center text-[32px] leading-10 bg-gradient-to-r from-transparent via-light-secondary to-transparent text-light-on-primary-container animate-pulse">
                                Loading...
                            </Typography>
                        ) : (
                            <Typography className="mx-[-160px] py-4 text-center text-[32px] leading-10 bg-gradient-to-r from-light-secondary via-light-primary to-light-tertiary text-light-on-primary-container">
                                {products.length} Product(s) in "{sub.name}" sub-category
                            </Typography>
                            // <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                            //   {products.length} Product(s) in "{sub.name}" sub-cagetory
                            // </h4>
                        )}
                    </div>
                </div>
    
                <div className="row mt-2">
                    <div className="w-full grid gap-5 grid-flow-col">
                        {products.map((p) => (
                            <div key={p._id}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default transition(SubHome);

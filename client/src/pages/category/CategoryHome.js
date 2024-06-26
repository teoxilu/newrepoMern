import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/category';
import ProductCard from '../../components/cards/ProductCard';
import { Typography } from '@material-tailwind/react';

const CategoryHome = ({ match }) => {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params;

    useEffect(() => {
        setLoading(true);
        getCategory(slug).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setCategory(res.data.category);
            setProducts(res.data.products);
            setLoading(false);
        });
    }, []);

    return (
        <div className="px-40 text-light-on-surface mt-28">
            <div className="row">
                <div className="col text-center py-2">
                    {loading ? (
                        <Typography className="text-center text-[32px] leading-10 p-3 mt-5 mb-5 display-4 jumbotron text-light-on-surface">
                            Loading...
                        </Typography>
                    ) : (
                        <Typography className="mx-[-160px] py-4 text-center text-[32px] leading-10 bg-gradient-to-r from-light-secondary via-light-primary to-light-tertiary text-light-on-primary-container ">
                            {products.length} Product(s) in "{category.name}" category
                        </Typography>
                    )}
                </div>
            </div>

            <div className="row">
                <div className="w-full grid gap-5 grid-flow-col">
                  {products.map((p) => (
                      <div key={p._id}>
                          <ProductCard product={p} />
                      </div>
                  ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryHome;

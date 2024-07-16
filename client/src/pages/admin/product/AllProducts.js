import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import StickyHeader from '~/components/StickyHeader';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    //redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleRemove = (slug) => {
        let answer = window.confirm('Delete product?');
        if (answer) {
            // console.log("send delete request", slug);
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
                    toast.success(`${res.data.title} is deleted successfully`);
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 400) toast.error(err.response.data);
                });
        }
    };

    return (
        <>
            <StickyHeader isAdmin />
            <div className="container-fluid pt-28">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>

                    <div className="col">
                        {loading ? (
                            <h4 className="text-danger">Loading...</h4>
                        ) : (
                            <h1 className="font-medium text-base text-left">All Products</h1>
                        )}
                        <hr className="text-light-outline-variant" />
                        <div className="row mt-4">
                            {products.map((product) => (
                                <div key={product._id} className="col-md-4 pb-3">
                                    <AdminProductCard product={product} handleRemove={handleRemove} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllProducts;

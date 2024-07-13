import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { SpinnerIcon } from '~/components/Icons';

const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    sizes: ['36', '37', '38', '39', '40', '40.5', '41', '41.5', '42', '42.5', '43', '43.5', '44'],
    brands: ['Asics', 'Bronze 56k', 'Converse', 'Vans', 'Nike', 'Last Resort AB', 'Adidas', 'Etnies', 'Reebok'],
    size: '',
    brand: '',
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    const isEnable =
        values?.title.length > 0 &&
        values?.description.length > 0 &&
        values?.price.length > 0 &&
        values?.quantity.length > 0 &&
        values?.category.length > 0 &&
        values?.size.length > 0 &&
        values?.brand.length > 0;

    //redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => getCategories().then((c) => setValues({ ...values, categories: c.data }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                toast.success(`"${res.data.title}" is created`)
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log('CLICKED CATEGORY', e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value).then((res) => {
            console.log('SUBS OPTIONS ON CATEGORY CLICK', res);
            setSubOptions(res.data);
        });
        setShowSub(true);
    };

    return (
        <div className="container-fluid pt-28">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <div className="flex items-center space-x-2">
                            <SpinnerIcon />
                            <p className="font-medium text-base text-left text-light-primary">Loading...</p>
                        </div>
                    ) : (
                        // <LoadingOutlined className="text-danger h1" />
                        <h1 className="font-medium text-base text-left">Product Create</h1>
                    )}
                    <hr className="text-light-outline-variant" />
                    <div className="p-3 mt-4">
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    </div>

                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                        isEnable={isEnable}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;

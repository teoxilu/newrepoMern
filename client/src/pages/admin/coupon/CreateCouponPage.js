import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from '../../../functions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import { Button } from '@material-tailwind/react';
import StickyHeader from '~/components/StickyHeader';

const CreateCouponPage = () => {
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState(new Date());
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState('');
    const [coupons, setCoupons] = useState([]);

    const isEnable = name.valueOf() !== '' && discount.valueOf() !== '' && expiry.valueOf() !== '';
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllCoupons();
    }, []);

    const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // console.table(name, expiry, discount);
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setLoading(false);
                loadAllCoupons(); // load all coupons
                setName('');
                setDiscount('');
                setExpiry('');
                toast.success(`"${res.data.name}" is created`);
            })
            .catch((err) => console.error('create coupon err', err));
    };

    const handleRemove = (couponId) => {
        if (window.confirm('Delete?')) {
            setLoading(true);
            removeCoupon(couponId, user.token)
                .then((res) => {
                    loadAllCoupons(); // load all coupons
                    setLoading(false);
                    toast.success(`Coupon "${res.data.name}" deleted successfully`);
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <>
            <StickyHeader isAdmin/>
            <div className="container-fluid pt-28">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col-md-10">
                        {loading ? (
                            <h1 className="text-light-on-surface-variant">Loading...</h1>
                        ) : (
                            <h1 className="font-medium text-base text-left">Coupon</h1>
                        )}
                        <hr className="text-light-outline-variant" />

                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="form-group">
                                <label className="text-muted required">Name</label>
                                <input
                                    type="text"
                                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    autoFocus
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-muted required">Discount (%)</label>
                                <input
                                    type="number"
                                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                                    onChange={(e) => setDiscount(e.target.value)}
                                    value={discount}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-muted required">Expired</label>
                                <br />
                                <DatePicker
                                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                                    selected={expiry}
                                    onChange={(date) => setExpiry(date)}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="btn bg-light-primary text-light-on-primary rounded-full hover:text-light-on-primary"
                                disabled={!isEnable}
                            >
                                Save
                            </Button>
                        </form>

                        <br />

                        <div className="mt-2">
                            <h4>
                                <b>{coupons.length}</b> Coupons
                            </h4>

                            <table className="table table-bordered mt-2">
                                <thead className="thead-light text-center">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Expired</th>
                                        <th scope="col">Discount</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {coupons.map((c) => (
                                        <tr key={c._id}>
                                            <td className="w-[30%]">{c.name}</td>
                                            <td className="w-[30%]">{new Date(c.expiry).toLocaleDateString()}</td>
                                            <td className="w-[30%]">{c.discount}%</td>
                                            <td className="w-[10%]">
                                                <DeleteOutlined
                                                    onClick={() => handleRemove(c._id)}
                                                    className="text-danger pointer"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateCouponPage;

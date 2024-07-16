import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import numeral from 'numeral';
import ModalImage from 'react-modal-image';

import ShowPaymentInfo from '~/components/cards/ShowPaymentInfo';
import UserNav from '~/components/nav/UserNav';
import { getUserOrders } from '~/functions/user';
import Invoice from '~/components/order/Invoice';
import unknown from '~/images/unknown.jpg';
import transition from '~/utils/transition';
import StickyHeader from '~/components/StickyHeader';

const History = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const history = useHistory();

    useEffect(() => {
        if (user?.role !== 'customer') history.push('/');
    }, [user, history]);

    useEffect(() => {
        loadUserOrders();
    }, []);

    const loadUserOrders = () =>
        getUserOrders(user.token).then((res) => {
            // console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });
    const showOrderInTable = (order) => (
        <table className="table table-auto table-bordered ">
            <thead className="thead-light">
                <tr>
                    <th scope="col" className="!bg-light-surface-container-lowest">
                        <Typography variant="small" className="font-normal opacity-70 text-light-on-surface">
                            Image
                        </Typography>
                    </th>
                    <th scope="col" className="!bg-light-surface-container-lowest">
                        <Typography variant="small" className="font-normal opacity-70 text-light-on-surface">
                            Title
                        </Typography>
                    </th>
                    <th scope="col" className="!bg-light-surface-container-lowest">
                        <Typography variant="small" className="font-normal opacity-70 text-light-on-surface">
                            Price
                        </Typography>
                    </th>
                    <th scope="col" className="!bg-light-surface-container-lowest">
                        <Typography variant="small" className="font-normal opacity-70 text-light-on-surface">
                            Brand
                        </Typography>
                    </th>
                    <th scope="col" className="!bg-light-surface-container-lowest">
                        <Typography variant="small" className="font-normal opacity-70 text-light-on-surface">
                            Size
                        </Typography>
                    </th>
                    <th scope="col" className="!bg-light-surface-container-lowest">
                        <Typography variant="small" className="font-normal opacity-70 text-light-on-surface">
                            Quantity
                        </Typography>
                    </th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i}>
                        <td className="bg-light-tertiary-container/50 w-[20%] h-full">
                            <div className="w-full m-auto ">
                                {p.product?.images.length > 0 ? (
                                    <ModalImage
                                        small={p.product?.images[0].url}
                                        large={p.product?.images[0].url}
                                        className="w-full h-full !max-h-32 object-cover rounded-lg"
                                    />
                                ) : (
                                    <ModalImage
                                        small={unknown}
                                        large={unknown}
                                        className="w-full h-full !max-h-24  object-cover rounded-lg"
                                    />
                                )}
                            </div>
                        </td>
                        <td style={{ verticalAlign: 'middle' }} className="m-auto w-[20%]">
                            <p>{p.product?.title}</p>
                        </td>
                        <td style={{ verticalAlign: 'middle' }} className="bg-light-tertiary-container/50 w-[15%]">
                            <p className="text-light-on-tertiary-container">
                                {numeral(p.product?.price).format('0,0')}
                            </p>
                        </td>
                        <td style={{ verticalAlign: 'middle' }} className="w-[15%]">
                            {p.product?.brand}
                        </td>
                        <td style={{ verticalAlign: 'middle' }} className="bg-light-tertiary-container/50 w-[15%]">
                            <p className="text-light-on-tertiary-container">{p.size}</p>
                        </td>
                        <td style={{ verticalAlign: 'middle' }} className="w-[15%]">
                            {p.count}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const showDownloadLink = (order) => (
        <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName="Invoice.pdf"
            className="btn btn-sm max-w-[75%] w-full mb-3 text-light-primary border-light-primary hover:bg-light-primary/8 hover:text-light-primary transition-colors"
        >
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
    );

    const showEachOrders = () =>
        orders.reverse().map((order, i) => (
            <div key={i} className="mt-4 card">
                <ShowPaymentInfo order={order} />
                {showOrderInTable(order)}
                <div className="row">
                    <div className="col">{showDownloadLink(order)}</div>
                </div>
            </div>
        ));

    return (
        <>
            <StickyHeader />
            <div className="container-fluid pt-28 text-light-on-surface">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div className="col text-center">
                        <h1 className="font-medium text-base text-left">
                            {orders.length > 0 ? 'Purchase Orders' : 'No Purchase Orders'}
                        </h1>
                        {showEachOrders()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default transition(History);

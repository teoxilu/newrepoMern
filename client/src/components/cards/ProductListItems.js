import { Button } from '@material-tailwind/react';
import numeral from 'numeral';
import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {
    const { price, category, subs, brand, quantity, sold } = product;
    const sizes = ['37', '38', '39', '40', '41', '42', '42.5', '43', '44', '40.5', '41.5', '43.5', '36'];
    return (
        <ul className="list-group text-light-on-surface rounded-lg border outline-none">
            <li className="list-group-item">
                Price <span className="label label-default label-pill float-right text-xl text-light-primary font-bold">{numeral(price).format('0,0')} VND</span>
            </li>

            {category && (
                <li className="list-group-item">
                    Category
                    <Link to={`/category/${category.slug}`} className="label label-default label-pill float-right hover:text-light-on-secondary-container">
                        <Button className="bg-light-secondary-container text-light-on-secondary-container rounded-lg">{category.name}</Button>
                    </Link>
                </li>
            )}

            {subs && (
                <li className="list-group-item">
                    Sub Categories
                    {subs.map((s) => (
                        <Link key={s._id} to={`/sub/${s.slug}`} className="label label-default label-pill float-right ml-2">
                            <Button size='sm' className="bg-light-tertiary-container text-light-on-tertiary-container rounded-lg">{s.name}</Button>
                        </Link>
                    ))}
                </li>
            )}

            <li className="list-group-item">
                Brand <span className="label label-default label-pill float-right text-base">{brand}</span>
            </li>

            <li className="list-group-item">
                Available{' '}
                {quantity < 0 ? (
                    <span className="label label-default label-pill float-right text-base">0</span>
                ) : (
                    <span className="label label-default label-pill float-right text-base">{quantity}</span>
                )}
            </li>

            <li className="list-group-item">
                Sold <span className="label label-default label-pill float-right text-base">{sold}</span>
            </li>
        </ul>
    );
};

export default ProductListItems;

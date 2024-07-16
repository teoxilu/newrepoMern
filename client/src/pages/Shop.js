import React, { useState, useEffect } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../functions/product';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '~/components/cards/ProductCard';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import Star from '../components/forms/Star';
import { Typography } from '@material-tailwind/react';
import { useDebounce } from '~/hooks';
import StickyHeader from '~/components/StickyHeader';
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredItem, setFilteredItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState('');
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState('');
    const [brands, setBrands] = useState([
        'Last Resort AB',
        'Adidas',
        'Nike',
        'Asics',
        'Vans',
        'Converse',
        'Reebok',
        'All',
    ]);
    const [brand, setBrand] = useState('');
    const [sizes, setSizes] = useState([
        '36',
        '37',
        '38',
        '39',
        '40',
        '40.5',
        '41',
        '41.5',
        '42',
        '42.5',
        '43',
        '43.5',
        '44',
        'All',
    ]);
    const [starList, setStarList] = useState([5, 4, 3, 2, 1, 0]);
    const [size, setSize] = useState('');

    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();
        // fetch categories
        getCategories().then((res) => setCategories(res.data));
        // fetch subcategories
        getSubs().then((res) => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setFilteredItem(res.data);
            setProducts(res.data);
        });
    };

    // 1. load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setFilteredItem(p.data);
            setProducts(p.data);
            setLoading(false);
        });
    };

    // 2. load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if (!text) {
                loadAllProducts();
            }
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    // 3. load products based on price range
    const [choosePrice, setChoosePrice] = useState([]);
    const fetchPrice = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setChoosePrice(res.data);
        });
    };
    useEffect(() => {
        console.log('ok to request');
        fetchPrice({ price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });

        // reset
        // setCategoryIds([]);
        setPrice(value);
        // setStar('');
        // setSub('');
        // setBrand('');
        // setSize('');
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    // 4. load products based on category
    // show categories in a list of checkbox
    const [chooseCat, setChooseCat] = useState([]);
    const fetchCat = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setChooseCat(res.data);
        });
    };
    const showCategories = () =>
        categories.map((c) => (
            <div key={c._id}>
                <Checkbox
                    onChange={handleCheck}
                    className="pb-2 pl-4 pr-4"
                    value={c._id}
                    name="category"
                    checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));

    // handle check for categories
    const handleCheck = (e) => {
        // reset
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        // setPrice([0, 0]);
        // setStar('');
        // setSub('');
        // setBrand('');
        // setSize('');
        // console.log(e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1

        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            // if found pull out one item from index
            inTheState.splice(foundInTheState, 1);
        }

        setCategoryIds(inTheState);
        // console.log(inTheState);
        fetchCat({ category: inTheState });
    };

    // 5. show products by star rating
    const [chooseRate, setChooseRate] = useState([]);
    const fetchRate = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setChooseRate(res.data);
        });
    };
    const handleStarClick = (num) => {
        // console.log(num);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        // setPrice([0, 0]);
        // setCategoryIds([]);
        if (num === 0) {
            setStar('');
            setChooseRate([]);
        } else {
            setStar(num);
            // setSub('');
            // setBrand('');
            // setSize('');
            fetchRate({ stars: num });
        }
    };

    const showStars = () => (
        <div>
            {starList.map((b) => (
                <div
                    className="pr-4 pl-4 pb-2"
                    style={{ display: 'flex', gap: '10px', alignItems: 'center', maringTop: '10px' }}
                    key={b}
                >
                    <Radio
                        key={b}
                        value={b === 0 ? '' : b}
                        name={b}
                        checked={(b === 0 ? '' : b) === star}
                        onChange={(e) => handleStarClick(b)}
                        // className="pb-1 pl-4 pr-4"
                    >
                        {b === 0 ? <b>All Rate</b> : <Star starClick={handleStarClick} numberOfStars={b} />}
                    </Radio>
                </div>
            ))}
            {/* <Radio key={5} value={5} name={5} checked={5 === star} onChange={(e)=>handleStarClick(5)} className="pb-1 pl-4 pr-4">
                {' '}
                <Star starClick={handleStarClick} numberOfStars={5} />

            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} /> */}
        </div>
    );

    // 6. show products by sub category
    const [chooseSub, setChooseSub] = useState([]);
    const fetchSub = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setChooseSub(res.data);
        });
    };
    // console.log(sub);
    const showSubs = () => (
        <div>
            {subs.map((s) => (
                <div
                    key={s._id}
                    onClick={() => handleSub(s)}
                    className={s.name === sub.name ? 'p-1 m-1 badge badge-primary' : 'p-1 m-1 badge badge-secondary'}
                    style={{ cursor: 'pointer' }}
                >
                    {s.name}
                </div>
            ))}
            <div
                key={'All'}
                onClick={() => handleSub('All')}
                className={sub === '' ? 'p-1 m-1 badge badge-primary' : 'p-1 m-1 badge badge-secondary'}
                style={{ cursor: 'pointer' }}
            >
                All
            </div>
        </div>
    );

    const handleSub = (sub) => {
        // console.log("SUB", sub);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        if (sub === 'All') {
            setSub('');
            setChooseSub([]);
        } else {
            setSub(sub);

            // setPrice([0, 0]);
            // setCategoryIds([]);
            // setStar('');
            // setBrand('');
            // setSize('');
            fetchSub({ sub });
        }
    };

    // 7. show products based on brand name
    const [chooseBrand, setChooseBrand] = useState([]);
    const fetchBrand = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setChooseBrand(res.data);
        });
    };
    const showBrands = () =>
        brands.map((b) => (
            <Radio
                key={b}
                value={b}
                name={b}
                checked={(b === 'All' ? '' : b) === brand}
                onChange={handleBrand}
                className="pb-1 pl-4 pr-4"
            >
                {b}
            </Radio>
        ));

    const handleBrand = (e) => {
        // setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        // setPrice([0, 0]);
        // setCategoryIds([]);
        // setStar('');
        // setSize('');
        if (e.target.value === 'All') {
            setBrand('');
            setChooseBrand([]);
        } else {
            setBrand(e.target.value);
            fetchBrand({ brand: e.target.value });
        }
    };

    // 8. show products based on size
    const [chooseSize, setChooseSize] = useState([]);
    const fetchSize = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setChooseSize(res.data);
        });
    };
    const showSizes = () =>
        sizes.map((s) => (
            <Radio
                key={s}
                value={s}
                name={s}
                checked={(s === 'All' ? '' : s) === size}
                onChange={handleSize}
                className="pb-1 pl-4 pr-4"
            >
                {s}
            </Radio>
        ));

    const handleSize = (e) => {
        // setSub('');
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' },
        });
        // setPrice([0, 0]);
        // setCategoryIds([]);
        // setStar('');
        // setBrand('');
        if (e.target.value === 'All') {
            setSize('');
            setChooseSize([]);
        } else {
            setSize(e.target.value);
            fetchSize({ size: e.target.value });
        }
    };
    useEffect(() => {
        if (
            sub === '' &&
            price[1] === 0 &&
            price[0] === 0 &&
            star === '' &&
            brand === '' &&
            categoryIds.length === 0 &&
            size === ''
        ) {
            loadAllProducts();
        } else {
            let arrays = [chooseBrand, chooseCat, choosePrice, chooseRate, chooseSub, chooseSize];
            // console.log(arrays);
            let validArrays = arrays.filter((array) => array && array.length > 0);
            // console.log(validArrays.length);
            if (
                (sub !== '' && chooseSub.length === 0) ||
                (price[1] !== 0 && choosePrice.length === 0) ||
                (star !== '' && chooseRate.length === 0) ||
                (brand !== '' && chooseBrand.length === 0) ||
                (categoryIds.length !== 0 && chooseCat.length === 0) ||
                (size !== '' && chooseSize.length === 0)
            ) {
                setFilteredItem([]);
            } else
                setFilteredItem(
                    validArrays.length > 1
                        ? validArrays.reduce(
                              (acc, curr) => acc.filter((element) => curr.some((item) => item.sold === element.sold)),
                              validArrays[0],
                          )
                        : validArrays[0],
                );
        }
    }, [chooseBrand, chooseCat, choosePrice, chooseRate, chooseSize, chooseSub]);

    let arrayItem = filteredItem;
    // chooseSub.length === 0 &&
    // choosePrice.length === 0 &&
    // chooseRate.length === 0 &&
    // chooseBrand.length === 0 &&
    // chooseCat.length === 0 &&
    // chooseSize.length === 0
    //     ? filteredItem
    //     : arrays.length > 1
    //       ? validArrays.reduce((acc, curr) =>
    //             acc.length > 0 ? acc.filter((element) => curr.includes(element)) : curr,
    //         )
    //       : validArrays;
    // const ArrayItem =

    return (
       <>
       <StickyHeader isShopPage/>
            <div className="grid grid-cols-12 px-40 pt-28 gap-x-2">
                <div className="col-span-3">
                    <Menu
                        defaultOpenKeys={['1', '2', '3', '4', '5', '6']}
                        mode="inline"
                        className="bg-light-surface-container-lowest shadow-xl shadow-light-outline"
                        borderRadius={24}
                    >
                        {/* price */}
                        <SubMenu
                            key="1"
                            title={
                                <span className="font-normal text-base text-light-on-surface">
                                    <DollarOutlined /> Price
                                </span>
                            }
                        >
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    formatter={(v) => `${v} VND`}
                                    range
                                    value={price}
                                    onChange={handleSlider}
                                    max="5000000"
                                />
                            </div>
                        </SubMenu>
    
                        {/* brands */}
                        <SubMenu
                            key="2"
                            title={
                                <span className="font-normal text-base text-light-on-surface">
                                    <DownSquareOutlined /> Brands
                                </span>
                            }
                        >
                            <div style={{ maringTop: '-10px' }} className="pr-5">
                                {showBrands()}
                            </div>
                        </SubMenu>
    
                        {/* Rating */}
                        <SubMenu
                            key="3"
                            title={
                                <span className="font-normal text-base text-light-on-surface">
                                    <StarOutlined /> Rating
                                </span>
                            }
                        >
                            <div style={{ maringTop: '-10px' }}>{showStars()}</div>
                        </SubMenu>
    
                        {/* size */}
                        <SubMenu
                            key="4"
                            title={
                                <span className="font-normal text-base text-light-on-surface">
                                    <DownSquareOutlined /> Sizes
                                </span>
                            }
                        >
                            <div style={{ maringTop: '-10px' }} className="pr-5">
                                {showSizes()}
                            </div>
                        </SubMenu>
    
                        {/* category */}
                        <SubMenu
                            key="5"
                            title={
                                <span className="font-normal text-base text-light-on-surface">
                                    <DownSquareOutlined /> Categories
                                </span>
                            }
                        >
                            <div style={{ maringTop: '-10px' }}>{showCategories()}</div>
                        </SubMenu>
    
                        {/* sub category */}
                        <SubMenu
                            key="6"
                            title={
                                <span className="font-normal text-base text-light-on-surface">
                                    <DownSquareOutlined /> Sub Categories
                                </span>
                            }
                        >
                            <div style={{ maringTop: '-10px' }} className="pl-4 pr-4">
                                {showSubs()}
                            </div>
                        </SubMenu>
                    </Menu>
                </div>
    
                <div className="col-span-9">
                    {loading ? <h4 className="text-3xl text-danger text-center translate-y-16">Loading...</h4> : <></>}
    
                    {arrayItem.length < 1 ? (
                        <Typography className="text-3xl text-center translate-y-16 ">No products found</Typography>
                    ) : (
                        <div className="grid grid-cols-3">
                            {arrayItem.map((p) => (
                                <div key={p._id} className="col-md-4 mt-3">
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
       </>
    );
};

export default Shop;

import React, { useState, useEffect, useRef } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/forms/CategoryForm';
import { getCategories } from '../../../functions/category';
import { createSub, getSubs, removeSub, getSub } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [subs, setSubs] = useState([]);
    //step 1
    const [keyword, setKeyword] = useState('');

    const categoryRef = useRef();
    const isEnabled = categoryRef.current?.value !== 'Please select'

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () => getCategories().then((c) => setCategories(c.data));

    const loadSubs = () => getSubs().then((s) => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setName('');
                toast.success(`"${res.data.name}" is created`);
                loadSubs();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        // let answer = window.confirm("Delete?");
        // console.log(answer, slug);
        if (window.confirm('Delete?')) {
            setLoading(true);
            removeSub(slug, user.token)
                .then((res) => {
                    console.log('HI');
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadSubs();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        console.log('HELLO');
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    //step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid pt-28">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h1 className="font-medium text-base text-left">Create subcategory</h1>
                    )}
                    <hr className="text-light-outline-variant" />

                    <div className="form-group mt-4">
                        <label className='required'>Category</label>
                        <select
                            ref={categoryRef}
                            name="category"
                            className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option>Please select</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} isFromSubCategory={true} isEnabled={isEnabled} />
                    {/* step 2 & 3 */}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/* step 5 */}

                    {subs.filter(searched(keyword)).map((s) => (
                        <div className="alert alert-secondary" key={s._id}>
                            {s.name}
                            <span onClick={() => handleRemove(s.slug)} className="btn btn-sm float-right">
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link to={`/admin/sub/${s.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubCreate;

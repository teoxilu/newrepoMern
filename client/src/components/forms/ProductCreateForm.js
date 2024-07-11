import React from 'react';
import { Select } from 'antd';
import { Button } from '@material-tailwind/react';
import CustomInput from '~/components/CustomInput';

const { Option } = Select;

const ProductCreateForm = ({
    handleSubmit,
    handleChange,
    setValues,
    values,
    handleCategoryChange,
    subOptions,
    showSub,
    isEnable,
}) => {
    //destructure
    const { title, description, price, categories, category, subs, quantity, images, sizes, brands, brand } = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <CustomInput title="title" value={title} onChange={handleChange} placeholder="Enter title" isRequired />
            </div>

            <div className="form-group">
                <CustomInput
                    title="description"
                    value={description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    isRequired
                />
            </div>

            <div className="form-group">
                <CustomInput title="price" value={price} onChange={handleChange} placeholder="Enter price" isRequired />
            </div>

            <div className="form-group">
                <CustomInput
                    title="quantity"
                    value={quantity}
                    onChange={handleChange}
                    placeholder="Enter quantity"
                    isRequired
                />
            </div>

            <div className="form-group">
                <label className='required'>Size</label>
                <select
                    name="size"
                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                    onChange={handleChange}
                >
                    <option>Select Size</option>
                    {sizes.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className='required'>Brand</label>
                <select
                    name="brand"
                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                    onChange={handleChange}
                >
                    <option>Select Brand</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className='required'>Category</label>
                <select
                    name="category"
                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                    onChange={handleCategoryChange}
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

            {showSub && (
                <div>
                    <label>Sub Category</label>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        value={subs}
                        onChange={(value) => setValues({ ...values, subs: value })}
                    >
                        {subOptions.length &&
                            subOptions.map((s) => (
                                <Option key={s._id} value={s._id}>
                                    {s.name}
                                </Option>
                            ))}
                    </Select>
                </div>
            )}
            <br />

            <Button type="submit" disabled={!isEnable} className="bg-light-primary text-light-on-primary rounded-full">
                Save
            </Button>
        </form>
    );
};

export default ProductCreateForm;

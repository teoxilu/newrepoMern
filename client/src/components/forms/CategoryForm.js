import { Button } from '@material-tailwind/react';
import React, { useEffect } from 'react';

const CategoryForm = ({ handleSubmit, name, setName, isFromSubCategory = false, isEnabled = false }) => {
    
    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="form-group">
                <label className='required'>Name</label>
                <input
                    type="text"
                    className="form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                    placeholder={isFromSubCategory ? 'Type subcategory name' : 'Type category name'}
                />
                <br />
                <Button
                    type="submit"
                    className="bg-light-primary text-light-on-primary rounded-full"
                    disabled={isFromSubCategory ? !(isEnabled && name?.length > 0) : !(name?.length > 0)}
                >
                    Save
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;

function CustomInput({ title, value, onChange, className: customClassName, placeholder, isRequired = false }) {
    return (
        <div className="form-group">
            <label className={`capitalize ${isRequired ? 'required' : ''}`}>{title}</label>
            <input
                required={isRequired}
                type="text"
                name={title}
                className={`form-control focus:border-light-primary focus:shadow focus:shadow-light-primary focus:outline-none px-3 py-2 text-base text-light-on-surface bg-light-surface-container-lowest border rounded-lg border-light-outline ${customClassName}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default CustomInput;

function Input({
    type,
    placeholder,
    onChange,
    className, 
    label,
    objeto,
    campo,
    ...rest
}) {
    return (
        <div>
           { label && 
            (
                <>
                <label>{label}:
                <br/>
                <input required type={type} placeholder={placeholder} className={className} onChange={(e) => onChange({...objeto, [campo]: e.target.value})} {...rest} />
                <br/>
                <br/>
                </label>
                </>
            )
           }
        </div>
    );
}
export {Input}
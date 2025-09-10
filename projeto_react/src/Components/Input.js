function Input({
    type,
    placeholder,
    onChange,
    className, 
    label,
    objeto,
    campo
}) {
    return (
        <div>
           { label && 
            (
                <>
                <label>{label} :
                <br/>
                <input type={type} placeholder={placeholder} className={className} onChange={(e) => onChange({...objeto, [campo]: e.target.value})} />
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
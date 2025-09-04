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
        <>
           { label && 
            (
                <>
                <label>{label} :</label>
                <br/>
                </>
            )
           }
           <input type={type} placeholder={placeholder} className={className} onChange={(e) => onChange({...objeto, [campo]: e.target.value})} />
           <br/>
           <br/>
        </>
    );
}
export {Input}
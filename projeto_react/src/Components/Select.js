function Select({
    label,
    name,
    placeholder,
    onChange,
    objeto,
    campo,
    options
}) {
    return (
        <>
            {label && (
                <label>{label}:</label>
            )} 
            <select name={name} value={objeto[campo]} placeholder={placeholder} onChange={(e) => onChange({...objeto, [campo]: e.target.value})}><br />
                {options.map(
                    o => (
                        <option value={o.value}>{o.label}</option>
                    )
                )}


            </select>
        </>
    );
}

export { Select }
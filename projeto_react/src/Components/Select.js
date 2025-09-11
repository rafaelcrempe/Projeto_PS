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
        <div>
            {label && (
                <>
                    <label>{label}:</label>
                    <br />
                </>
            )}
            <select name={name} value={objeto[campo]} placeholder={placeholder} onChange={(e) => onChange({ ...objeto, [campo]: e.target.value })}><br />


                {options.map(
                    o => (
                        <option value={o.value}>{o.label}</option>
                    )
                )}


            </select>
            <br />
            <br />
        </div>
    );
}

export { Select }
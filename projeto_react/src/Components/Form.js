import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Form({
    func,
    title,
    children, //variável reservada pelo React, sempre é o que vai dentro do formulário
    buttonText
}) {

    const [loading, setLoading] = useState(false);

    async function send() {
        setLoading(true)
        var any = await func()
        setLoading(false)
        return any
    }

    return (

        <div className=''>
            <h2>{title}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                {children}


                <button className='buttonBase' onClick={() => send()} disabled={loading}>
                    {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>

                    ) : (
                        <>{buttonText? buttonText : 'CADASTRAR'}</>
                    )}
                </button>
            </form>
        </div>

    );
}

export { Form }

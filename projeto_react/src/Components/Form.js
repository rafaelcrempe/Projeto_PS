import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Form({
    func,
    title,
    children //variável reservada pelo React, sempre é o que vai dentro do formulário
}) {

    const [loading, setLoading] = useState(false);

    async function send() {
        setLoading(true)
        var any = await func()
        setLoading(false)
        return any
    }

    return (

        <div className='cardForm'>
            <h2>{title}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                {children}


                <Button onClick={() => send()} disabled={loading}>
                    {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>

                    ) : (
                        <>SALVAR</>
                    )}
                </Button>
            </form>
        </div>

    );
}

export { Form }
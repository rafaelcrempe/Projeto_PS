import { useNavigate, useParams } from 'react-router-dom';
import "./Services.css"

import Button from "react-bootstrap/esm/Button";


export default function Services(attr) {

    const nav = useNavigate();

    return (
        <div className='CardServico'>

            {/* <h1>{attr.servico.professional_id}</h1> */}
            <div style={{ margin: '10px 0' }}>
            <p className='adaiopsdd'>{attr.servico.status}</p>

            <p>{attr.servico.review}</p>
                {attr.starRating}
            </div>
            {/*<Button variant="danger"onclick={() => delServices(s.id)}>Excluir</Button>*/}
            {/* <Button variant="primary" onClick={() => nav(`/services/${attr.servico.id}`, { replace: true })}>Ver</Button>
            <Button variant="warning" onClick={() => nav(`/services/edit/${attr.servico.id}`, { replace: true })}>Editar</Button> */}

        </div>
    )
}
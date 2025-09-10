import { useNavigate, useParams } from 'react-router-dom';

import Button from "react-bootstrap/esm/Button";


export default function Services(attr) {

    const nav = useNavigate();

    let statusServico = attr.servico.status;
    if(statusServico == "Em andamento") statusServico = "andamento";
    if(statusServico == "Pendente") statusServico = "pendente";
    if(statusServico == "Concluído") statusServico = "concluido";

    return (
        <div style={{marginBottom: 15, padding: "10px 20px", borderRadius: 10, boxShadow: "1px 2px 5px rgb(14, 35, 59)"}} >

            <div>
                <p style={{marginBottom: 0}} >{attr.servico.review}</p>
                {attr.starRating}
            </div>

        </div>
    )
}
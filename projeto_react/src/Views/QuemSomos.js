import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import Footer from '../Components/Footer';


export default function QuemSomos() {
    return (
        <>
            <div className='backgroundQS'>
                <img src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/logos/quemsomos.png' />

                <div>
                    O <strong>Ajuda Aqui!</strong> foi idealizado por <i><b>Rafael Crempe, Marcos Curila e Renan Victorino</b></i> como projeto integrador
                    do curso de Programador de Sistemas do SENAC São Carlos.
                    <br />
                    <br />
                    A ideia surgiu da necessidade de buscar prestadores de serviços que estivessem disponíveis para reparos rápidos, listando e conectando usuários necessitados a prestadores de serviços.
                    <br />
                    <br />
                    Para esse projeto, utilizamos React para a criação do sistema e Supabase para o banco de dados.
                </div>
            </div>
        </>
    );

}
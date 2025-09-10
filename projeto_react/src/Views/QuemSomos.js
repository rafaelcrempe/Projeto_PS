import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import NavBar from '../Components/NavBar';


function QuemSomos() {
    return (
        <>
            <div className='backgroundScreen'>
                <h2>QUEM SOMOS</h2>
                <p>
                    O Ajuda Aqui! foi um projeto idealizado por Rafael Crempe, Marcos Curila e Renan Victorino como projeto integrador
                    do curso de Programador de Sistemas do SENAC São Carlos.
                </p>
            </div>
            <Footer />
        </>
    );

}
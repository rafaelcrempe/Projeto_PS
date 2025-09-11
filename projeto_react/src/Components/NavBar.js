import { data, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function NavBar({

}) {
  const hasSession = !!localStorage.getItem('supaSession');

  const nav = useNavigate();

  const [ showRating, setShowRating ] = useState(false);
  const [ service, setService ] = useState({})

  const [inputStars, setInputStars] = useState(0);
  const [inputComment, setInputComment] = useState("")

  useEffect(()=> {
    readService()
  }, [])

  async function readService(){

    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    if(!dataUser.user)
      return;

    const { data: dataServices, error } = await supabase
      .from('view_clients_by_professional')
      .select('*')
      .match({client_id: dataUser.user.id, status: "Concluído", star: 0});

    if(dataServices && dataServices.length > 0){
      setService(dataServices[0])    
      setShowRating(true)
    }

  }

  async function saveRating(){

    let currentService = service
    delete currentService.last_name;
    delete currentService.name;

    currentService.star = inputStars
    currentService.review = inputComment

    const { data, error } = await supabase
    .from('services')
    .update(currentService)
    .eq('id', currentService.id)

    setShowRating(false)

  }

  async function sair() {
    if (hasSession != null) {
      localStorage.removeItem('supaSession')
      const { data: dataUser, error: errorUser } = await supabase.auth.signOut();
      window.location.reload();
      nav("/home", { replace: true });
    }
  }

  

  return (
    <nav> {/* navegação */}
      {hasSession ? (
        <>  {/* tags vazia, equivale a uma DIV */}

          <div className="principal">
            <Link to="/home">Início</Link>
            <Link to="/profile">Perfil</Link>
          </div>
          <Link className="buttonSair" onClick={() => sair()}>Sair</Link>

          {
            showRating == true &&
              <div style={{width: 400, backgroundColor: "white", position: "absolute", margin: "auto", top: 100, left: 0, right: 0, padding: 50, textAlign: "center"}}>
                <h2>Avaliação</h2>
                <p>Você realizou o serviço recente.<br/>Como foi a sua experiência?</p>
                <button onClick={()=>setInputStars(1)}>1</button>
                <button onClick={()=>setInputStars(2)}>2</button>
                <button onClick={()=>setInputStars(3)}>3</button>
                <button onClick={()=>setInputStars(4)}>4</button>
                <button onClick={()=>setInputStars(5)}>5</button>

                <br/><br/>
                <p>Por favor, deixe um comentário:</p>
                <textarea onChange={e=>setInputComment(e.target.value)} ></textarea>
                <br/><br/>

                <button onClick={()=>saveRating()} >Salvar</button>

              </div>
          }

        </>
      ) : (
        <>  {/* tags vazia, equivale a uma DIV */}

          <Link to="/home">Início</Link>
          <Link to="/quemsomos">Quem Somos</Link>
          <Link to="/login">Entrar</Link>

        </>
      )

      }
    </nav>



  );
}



export default NavBar;






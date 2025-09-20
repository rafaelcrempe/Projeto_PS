import { data, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function NavBar({

}) {

  const nav = useNavigate();

  const [showRating, setShowRating] = useState(false);
  const [service, setService] = useState({})

  const [inputStars, setInputStars] = useState(0);
  const [inputComment, setInputComment] = useState("")

  const [userId, setUserId] = useState(null)

  useEffect(() => {
  const interval = setInterval(() => {
    readService();
  }, 30000); // verifica a cada 30 segundos

  readService(); // dispara também na primeira vez

  return () => clearInterval(interval);
}, []);


 const [uid, setUid] = useState(null);

  async function getId() {
    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();

    const userId = dataUser?.user?.id;

    setUid(userId)
  }

  useEffect(() => {
    getId()
  }, [])

  async function readService() {

    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    if (!dataUser.user)
      return;

    setUserId(dataUser.user.id);

    const { data: dataServices, error } = await supabase
      .from('services')
      .select('*')
      .match({ client_id: dataUser.user.id, status: "Concluído", star: 0 });

    if (dataServices && dataServices.length > 0) {
      setService(dataServices[0])
      setShowRating(true)
    }

  }

  async function saveRating() {

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
    if (uid != null) {
      const { data: dataUser, error: errorUser } = await supabase.auth.signOut();
           
      nav("/home", { replace: true });
      window.location.reload();
    }
  }



  return (
    <nav> {/* navegação */}
      {uid ? (
        <>  {/* tags vazia, equivale a uma DIV */}

          <div className="principal">
            <Link to="/home"><img className="logoNavBar" src="https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/logos/logo_completo.png" /></Link>
          </div>
          <div>
            <Link to={`/profile/${userId}`}>PERFIL <i class="fa-solid fa-user"></i></Link>
            <Link className="buttonSair" onClick={() => sair()}>SAIR <i class="fa-solid fa-person-walking-arrow-right"></i></Link>
          </div>


          {
            showRating &&
            <div style={{ width: 400, backgroundColor: "#112d4e", position: "absolute", margin: "auto", top: 100, left: 0, right: 0, padding: 50, textAlign: "center", color: "#dbe2ef", border: "#dbe2ef 2px solid", borderRadius: "25px" }}>
              <h2>Avaliação</h2>
              <p>Você realizou o serviço recente.<br />Como foi a sua experiência?</p>
              <button style={{ background: "#DBE2EF", border: "none", margin: "0 5px" }} onClick={() => setInputStars(1)}>★</button>
              <button style={{ background: "#DBE2EF", border: "none", margin: "0 5px" }} onClick={() => setInputStars(2)}>★</button>
              <button style={{ background: "#DBE2EF", border: "none", margin: "0 5px" }} onClick={() => setInputStars(3)}>★</button>
              <button style={{ background: "#DBE2EF", border: "none", margin: "0 5px" }} onClick={() => setInputStars(4)}>★</button>
              <button style={{ background: "#DBE2EF", border: "none", margin: "0 5px" }} onClick={() => setInputStars(5)}>★</button>
              <br /><br />
              <p>Por favor, deixe um comentário:</p>
              <textarea onChange={e => setInputComment(e.target.value)} ></textarea>
              <br /><br />

              <button className="buttonBase" onClick={() => saveRating()} >ENVIAR</button>

            </div>
          }

        </>
      ) : (
        <>  {/* tags vazia, equivale a uma DIV */}

          <div className="principal">
            <Link to="/home"><img className="logoNavBar" src="https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/logos/logo_completo.png" /></Link>
          </div>
          <div>
            <Link to="/quemsomos">QUEM SOMOS</Link>
            <Link to="/login">ENTRAR <i class="fa-solid fa-arrow-right-to-bracket"></i></Link>
          </div>


        </>
      )

      }
    </nav>



  );
}



export default NavBar;






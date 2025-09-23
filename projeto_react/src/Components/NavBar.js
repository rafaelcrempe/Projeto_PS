import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8";
const supabase = createClient(supabaseUrl, supabaseKey);

function NavBar() {
  const nav = useNavigate();

  const [showRating, setShowRating] = useState(false);
  const [service, setService] = useState({});
  const [inputStars, setInputStars] = useState(0);
  const [inputComment, setInputComment] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Pega sessão inicial
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUserId(data.user.id);
        readService(data.user.id);
      }
    });

    // Escuta login/logout em tempo real
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUserId(session.user.id);
          await readService(session.user.id);
        } else {
          setUserId(null);
          setShowRating(false);
        }
      }
    );

    // Intervalo para checar serviços
    const interval = setInterval(() => {
      if (userId) readService(userId);
    }, 30000);

    return () => {
      subscription.subscription.unsubscribe();
      clearInterval(interval);
    };
  }, [userId]);

  async function readService(uid) {
    if (!uid) return;

    const { data: dataServices } = await supabase
      .from("services")
      .select("*")
      .match({ client_id: uid, status: "Concluído", star: 0 });

    if (dataServices && dataServices.length > 0) {
      setService(dataServices[0]);
      setShowRating(true);
    }
  }

  async function saveRating() {
    let currentService = { ...service };
    delete currentService.last_name;
    delete currentService.name;

    currentService.star = inputStars;
    currentService.review = inputComment;

    await supabase
      .from("services")
      .update(currentService)
      .eq("id", currentService.id);

    setShowRating(false);
  }

  async function sair() {
    await supabase.auth.signOut();
    nav("/home", { replace: true });
  }

  return (
    <nav>
      {userId ? (
        <>
          <div className="principal">
            <Link to="/home">
              <img
                className="logoNavBar"
                src="https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/logos/logo_completo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <Link to={`/profile/${userId}`}>
              PERFIL <i className="fa-solid fa-user"></i>
            </Link>
            <button className="buttonSair" onClick={sair}>
              SAIR <i className="fa-solid fa-person-walking-arrow-right"></i>
            </button>
          </div>

          {showRating && (
            <div
              style={{
                width: 400,
                backgroundColor: "#112d4e",
                position: "absolute",
                margin: "auto",
                top: 100,
                left: 0,
                right: 0,
                padding: 50,
                textAlign: "center",
                color: "#dbe2ef",
                border: "#dbe2ef 2px solid",
                borderRadius: "25px",
              }}
            >
              <h2>Avaliação</h2>
              <p>
                Você realizou o serviço recente.
                <br />
                Como foi a sua experiência?
              </p>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  style={{ background: "#DBE2EF", border: "none", margin: "0 5px" }}
                  onClick={() => setInputStars(star)}
                >
                  ★
                </button>
              ))}
              <br />
              <br />
              <p>Por favor, deixe um comentário:</p>
              <textarea onChange={(e) => setInputComment(e.target.value)}></textarea>
              <br />
              <br />
              <button className="buttonBase" onClick={saveRating}>
                ENVIAR
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="principal">
            <Link to="/home">
              <img
                className="logoNavBar"
                src="https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/logos/logo_completo.png"
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <Link to="/quemsomos">QUEM SOMOS</Link>
            <Link to="/login">
              ENTRAR <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default NavBar;

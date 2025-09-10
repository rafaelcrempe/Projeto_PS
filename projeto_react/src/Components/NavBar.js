import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function NavBar({

}) {
  const hasSession = !!localStorage.getItem('supaSession');

  const nav = useNavigate();

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

        </>
      ) : (
        <>  {/* tags vazia, equivale a uma DIV */}

          <Link to="/home">Início</Link>
          <Link to="#">Quem Somos</Link>
          <Link to="/login">Entrar</Link>

        </>
      )

      }
    </nav>



  );
}

export default NavBar;






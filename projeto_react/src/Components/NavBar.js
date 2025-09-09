import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function NavBar({

}) {
  const hasSession = !!localStorage.getItem('supaSession');

  const nav = useNavigate();

  function sair() {
    if (hasSession != null) {
      localStorage.removeItem('supaSession')
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






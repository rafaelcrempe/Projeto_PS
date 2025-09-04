import { Link } from "react-router-dom";


function NavBar({
    
}){
    const hasSession = !! localStorage.getItem('supaSession');

    return (
        <nav> {/* navegação */}
        {hasSession? (
          <>  {/* tags vazia, equivale a uma DIV */}

            
            
            <Link to="/home">Inicio</Link>
            <Link to="/profile">Perfil</Link>
            <Link to="#">Sair</Link>
          </>
        ):(
          <>  {/* tags vazia, equivale a uma DIV */}

            <Link to="#">Quem Somos</Link>
            <Link to="/login">Entrar</Link>
            
          </>
        )

        }
      </nav>

                                         

    );
} 

export default NavBar;
    





import logo from './logo.svg';
import './App.css';

function App() { // aqui é JavaScript

  let email = ""

  function mudaEmail(valor){
    email = valor
  }

  let senha = ""

  function mudarSenha(valor){
    senha = valor
  }

  function enviar(){
    alert(`Email: ${email}\nSenha: ${senha}`)
  }

  let isLogin = true;

  return ( // Aqui é html
    <main className="App">
      
      <h1>Entrar</h1>

      <button onClick={() => {isLogin = !isLogin}} >
        {isLogin && ("Cadastrar-se")}
        {!isLogin && ("Voltar para o login")}
      </button>

      {!isLogin && (
      <form className="register" >
        
      </form>
      )}

      {isLogin && (
      <form className="login" >

        <label>
          Email: <input name="Email" type="email" placeholder="Digite o Email" onChange={(e) => mudaEmail(e.target.value)} /><br/>
        </label>

        <label>
          Senha: <input name="Senha" type="password" placeholder="Digite a senha" onChange={(e) => mudarSenha(e.target.value)} /><br/>
        </label>

      <button className="buttonSuccess" onClick={() => enviar()} >Login</button>

      <p>Não Tem cadastro? <a href="#">Clique aqui</a></p>

      </form>
      )}

    </main>
  );
}

export default App;

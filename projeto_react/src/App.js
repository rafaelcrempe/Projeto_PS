import logo from './logo.svg';
import './App.css';

function App() { // aqui é JavaScript

 let  email = ""
  function MudaEmail(valor){
    email = valor

  }

 let senha = ""
  function MudarSenha(valor){
    senha = valor

  }

  function enviar(){

    alert("Email:"+email+"senha: "+senha)

  }

  let islogin = true;

  return ( // Aqui é html
    <main className="App">

      <h1>Entrar</h1>

      <button onClick={ () => {islogin = !islogin}}>
        {islogin && ("cadastrar-se")}
        {!islogin && ("Voltar para o login")}


      </button>

      {!islogin && (
      <form className="Register"></form>
      )}

      {islogin && (
      <form className="Login">
          <label>
          Email: <input type="email" name= "email " placeholder="email@ exemplo.com" onChange={ (e) => MudaEmail(e.target.value) }/> <br/>
          </label>

          <label>
          Senha: <input type="password"  name= "senha" placeholder= "Digie a senha"onChange={(e) => MudarSenha(e.target.value)}/> <br/>

          </label>
          
          <button className="button-sucess" onClick={() => enviar()}>Login</button>

          <p>Não tem cadastro? <a Href= "#"> Clique aqui</a></p>

      </form>
      )}
    </main>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

function App() { // aqui é JavaScript

 let oi = "Olá Mundo!";

  // oi += " Renan";

  function soma(a,b){
    return a + b;
  }

  function divide(a, b){
    return a / b;

  }

  return ( // Aqui é html
    <main className="App">
     {soma(oi, "Meu chapa ")}<br/>
     {divide(36, 6)}
    </main>
  );
}

export default App;

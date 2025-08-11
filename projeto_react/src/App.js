import logo from './logo.svg';
import './App.css';

function App() { 

  let oi = "Olá,";
  oi += " Rafael";

  function soma(a, b){
    return a + b;
  }

  function divide(a,b){
    return a / b;
  }

  return (
    <main className="App">
      {soma(oi, " Crempe")} <br/>
      {divide(36,6)}
    </main>
  );
}

export default App;

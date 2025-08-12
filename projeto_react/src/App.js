import logo from './logo.svg';
import './App.css';

function App() { // aqui é JavaScript


  function calculadora (a, b, op){
    if(op == '+'){
      return a + b
    }
    else if(op == '-'){
      return a - b
    }
    else if(op == '*'){
      return a * b
    }
    else if(op == '/'){
      return a / b
    }
  
  }

  return ( // Aqui é html
    <main className="App">
    {(calculadora(8, 5, '/')).toFixed(1)}<br/>
    {calculadora(8, 5, '*')}<br/>
    {calculadora(8, 5, '-')}<br/>
    {calculadora(8, 5, '+')}
    {calculadora(8, calculadora(8, 5, '*'), '+')}
    
    </main>
  );
}

export default App;

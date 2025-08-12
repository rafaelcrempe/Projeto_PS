import logo from './logo.svg';
import './App.css';

function App() {  // aqui é java script
  
  function calculadora( a, b, op){
    switch(op){
    case '+' :
      return a+b
    case "-" :
      return a-b
    case '*' :
      return a*b
    case '/' :
      return a/b

    }
  } 

  return ( /* aqui é  html */
    <main className="App">
      {calculadora(8, calculadora(4, 5, "*"),  "/") }<br/>
      {calculadora( 12, 4, "/")}<br/>
      {calculadora( 36, 12, "*")}<br/>
    </main>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

function App() {

  function calculadora(a, b, op) {

    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
    }
  }


  return (
    <main className="App">
      {calculadora(2, 5, '+')} <br />
      {calculadora(10, 10, '-')} <br />
      {calculadora(10, 3, '*')} <br />
      {(calculadora(10, 3, '/').toFixed(1))} <br />
      {calculadora(5, calculadora(8, 7, '*'), '+')} <br />

    </main>
  );
}

export default App;

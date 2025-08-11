import logo from './logo.svg';
import './App.css';

function App() {  // aqui é java script
  let oi = "Ola mundo!";

   // oi +=  " marcos ";    (outra forma d fazer)

   function soma(a, b){  // parametros
    
    return  a  + b

   }

   function divide( a, b){

    return a/b

   }

  return ( /* aqui é  html */
    <main className="App">

      {soma(oi, "Marcos")} <br/>
      {divide(36, 6)}
    </main>
  );
}

export default App;

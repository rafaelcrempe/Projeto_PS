import logo from './logo.svg';
import './App.css';

function App() { // aqui é JavaScript

 // Faça um lista com todos os numeros mas exiba apenas o numeros 
 // impares

 let lista = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,]

 let impares = []

 for(let i= 0; i < lista.length; i++){
    if(i % 2 == 1){                   // i % 2 !=0
      impares.push(<p>{lista[i] } </p>);
    }

 }

  return ( // Aqui é html
    <main className="App">
   
   {impares.join(', ')}
    
    </main>
  );
}

export default App;

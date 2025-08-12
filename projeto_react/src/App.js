import logo from './logo.svg';
import './App.css';

function App() {

  let cesta = ['pão', 'suco', 'chocolate', 'pão de queijo', 'manteiga'];
  let desenha = [];

  for (let i = 0; i < 3; i++) {
    desenha.push(<p> {cesta[i]} </p>)
  }


  return (
    <main className="App">
      {desenha}
    </main>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import TournamentResults from './components/TournamentResults';

function App() {
  return (
    <div className="flexContainer">
      <TournamentResults tournamentID={177161}/>
    </div>
  );
}

export default App;

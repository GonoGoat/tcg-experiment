import 'assets/style/App.css';
import { Deck, Search, Lister, Statistics} from 'pages'
//import Options from './Components/Options'

const App = () => {
  return (
    <div className="Home">
      <Search/>
      <Lister/>
      <Deck/>
      <Statistics/>
    </div>
  );
  /*return (
    <div className="Home">
      <Search/>
      <Lister/>
      <Deck/>
      <Options/>
    </div>
  );*/
}

export default App;
import 'assets/style/App.css';
import { Deck, Search, Lister} from 'pages'
//import Options from './Components/Options'

const App = () => {
  return (
    <div className="Home">
      <Search/>
      <Lister/>
      <Deck/>
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
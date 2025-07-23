import 'assets/style/App.css';
import { Deck, Search, Lister, Bank} from 'pages'
//import Options from './Components/Options'

const App = () => {
  return (
    <div className="Home">
      <Search/>
      <Lister/>
      <Deck/>
      <Bank/>
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
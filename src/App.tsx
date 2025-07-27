import 'assets/style/App.css';
import { Deck, Search, Lister, Tabs} from 'pages'
//import Options from './Components/Options'

const App = () => {
  return (
    <div className="Home">
      <Search/>
      <Lister/>
      <Deck/>
      <Tabs/>
    </div>
  );
}

export default App;
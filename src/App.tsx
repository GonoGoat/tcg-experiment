// Component imports
import { Deck, MarkerDeck, Search, Lister, Tabs} from 'pages'

// Style imports
import 'assets/style/App.css';

// Enum/Interface/Type imports
import { MARKING_MODE } from 'types/global.enum'

// Context imports
import useStatStore from 'context/StatStore/store'

const App = () => {

  const markingMode = useStatStore(state => state.markingMode)


  return (
    <div className="Home">
      <Search/>
      <Lister/>
      {markingMode === MARKING_MODE.INACTIVE ? <Deck/> : <MarkerDeck/>}
      <Tabs/>
    </div>
  );
}

export default App;
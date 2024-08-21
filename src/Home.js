import React from 'react';
import './Home.css';
import Deck from './Components/Deck'
import Tabs from './Components/Tabs'
import Lister from './Components/Lister'
//import Options from './Components/Options'

// TODO: useEffect to initiate activeTab of Appstore

function Home() {
  return (
    <div className="Home">
      <Lister/>
      <Deck/>
      <Tabs/>
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

export default Home;

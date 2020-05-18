import React from 'react';
import './App.scss';

import Auth from '../components/Auth/Auth';
import MyNavBar from '../components/MyNavBar/MyNavBar';
import BoardContainer from '../components/BoardContainer/BoardContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>React Pinterest</h2>
        <MyNavBar />
        <Auth />
        <BoardContainer />
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.less';
import Background from './components/background/background';
import Search from './components/search/search';

function App() {
  return (
    <div className="app">
      <Background />
      <Search />
    </div>
  );
}

export default App;
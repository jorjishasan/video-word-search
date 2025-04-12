import React from 'react';
import UI from './components/UI';
import { SearchProvider } from './context/SearchContext';

const App = () => {
  return (
    <SearchProvider>
      <div style={{ 
        minHeight: '100vh',
        backgroundColor: '#1a1a1a'
      }}>
        <UI />
      </div>
    </SearchProvider>
  );
};

export default App; 
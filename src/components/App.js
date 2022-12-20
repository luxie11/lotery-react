import React from 'react';
import { BrowserRouter, Routes, Route } from  'react-router-dom';
import history from '../utils/history';
import Main from '../pages/Main';

const App = () => (
  <>
    <BrowserRouter history={history}>
      <div className="flex center full">
        <Routes>
          <Route path="/" exact element={<Main />}/>
        </Routes>
      </div>
    </BrowserRouter>
  </>
);


export default App;
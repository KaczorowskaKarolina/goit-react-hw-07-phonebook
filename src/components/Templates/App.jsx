import React from 'react';
import { Provider } from 'react-redux';
import store from '../Atoms/Store';
import AppContainer from '../Pages/AppContainer';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
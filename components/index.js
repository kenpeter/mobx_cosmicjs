// react
import React from 'react';
// the dom
import { render } from 'react-dom';
// react hot loader app container
// allows whatever inside hot reload
import { AppContainer } from 'react-hot-loader';

// app state, what is app state?
import AppState from './AppState';

// what is app
import App from './App';

// so app state is a class
const data = new AppState();

// web have app container
// app has app state
// inject it into root
render(
  <AppContainer>
    <App data={data} />
  </AppContainer>,
  document.getElementById('root')
);

// not prod mode and it is hot
if (process.env.NODE_ENV !== 'production' && module.hot) {
  // module hot
  // accept this app, ./App
  module.hot.accept('./App', () => {
    // what is next app, so another one?
    // require ./App default??????????/
    const NextApp = require('./App').default
    render(
      <AppContainer>
        <NextApp data={data} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}

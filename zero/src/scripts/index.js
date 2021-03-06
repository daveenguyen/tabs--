import React from 'react';
import { render } from 'react-dom';
import { Store } from 'react-chrome-redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/app/App';

injectTapEventPlugin();

const proxyStore = new Store({
  portName: 'example'
});

const unsubscribe = proxyStore.subscribe(() => {
  unsubscribe(); // make sure to only fire once

  render(
    <Provider store={proxyStore}>
      <App />
    </Provider>,
    document.getElementById('app')
  );
});

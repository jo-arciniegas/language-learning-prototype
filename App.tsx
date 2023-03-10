import {StatusBar} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/models/store';

export default function App() {

  React.useEffect(() => {
    loadRequireData();
  }, [])

  const loadRequireData = () => {
    store.dispatch.qa.getDataAsync();
    store.dispatch.course.getDataAsync();
  }

  return (
    <>
      <Provider store={store}>
        <Navigation />
        <StatusBar barStyle="default" />
      </Provider>
    </>
  );
}

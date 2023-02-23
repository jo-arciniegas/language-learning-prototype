import { StatusBar } from 'react-native';
import React from 'react';
import Navigation from './src/navigation';


export default function App() {
  
  return (
    <>
      <Navigation />
      <StatusBar barStyle="default" />
    </>
  );
}
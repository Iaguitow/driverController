import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from '../components/Drawer';

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Drawer/> 
    </NavigationContainer>
  );
}
import { StyleSheet } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home';
import SelectCampus from './SelectCampus';
import SelectClass from './SelectClass';

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Select Campus" component={SelectCampus} />
      <Drawer.Screen name="Select Class" component={SelectClass} />
      {/* Other screens */}
    </Drawer.Navigator>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({});

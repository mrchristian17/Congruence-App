import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CommittedActionsScreen from '../screens/CommittedActionsScreen';
import CongruenceScreen from '../screens/CongruenceScreen';

// const Stack = createNativeStackNavigator();

const MainTabNavigator = (props) => {
  const Tab = createBottomTabNavigator();
  return (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Committed Actions" component={CommittedActionsScreen}/>
      <Tab.Screen name="Congruence" component={CongruenceScreen }/>
    </Tab.Navigator>
  </NavigationContainer>
  
  );
};

export default MainTabNavigator;